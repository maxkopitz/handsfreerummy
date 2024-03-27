from handsfree import redis_client, socketio
from redis.commands.json.path import Path
from flask import session
from random import shuffle
import sys

GAME_KEY_INDEX = 'games_index'
ACTIVE_GAMES = 'active_games'
suits = ["hearts", "diamonds", "clubs", "spades"]
values = ["A", "2", "3", "4", "5", "6", "7", "8",
          "9", "10", "J", "Q", "K"]


def get_game(game_id):
    """Get a Rummy game."""
    game_id = int(game_id)
    game = redis_client.json().get("game:%d" % game_id)
    return game


def get_active_games():
    game_ids = redis_client.smembers(ACTIVE_GAMES)

    # Fetch each game by its ID
    games = []
    for game_id in game_ids:
        game_data = redis_client.json().get(
            f"game:{game_id.decode('utf-8')}", Path.root_path())
        if game_data:
            games.append(game_data)
    return games


def create_game():
    """Create Rummy Game."""
    redis_client.incr(GAME_KEY_INDEX, 1)
    index = int(redis_client.get(GAME_KEY_INDEX).decode('utf-8'))

    deck = []
    for suit in suits:
        for value in values:
            deck.append({"value": value, "suit": suit})
    shuffle(deck)
    game = {
        "gameId": index,
        "owner": str(session.get('uuid')),
        "maxPlayers": 4,
        "players": {},
        "turnCounter": 1,
        "melds": [],
        "discardPile": [],
        "pickupCard": {},
        "gameState": "lobby",
        "deck": deck,
        "currentTurnState": "pickup"
    }
    # currentTurnState: "pickup", "meld", "discard"

    redis_client.json().set("game:%d" % index, Path.root_path(), game)
    redis_client.sadd(ACTIVE_GAMES, index)

    return game


def join_game(game_id, display_name):
    """Join Rummy Game."""
    game_id = int(game_id)
    game = redis_client.json().get("game:%d" % game_id)

    # Calling method needs to ensure game_id is not being overwrote
    session["game_id"] = game_id

    uuid = str(session.get('uuid'))

    if game["players"].get(uuid) is None:
        game["players"][uuid] = {
            "sid": session.get("sid", None),
            "hand": [],
            "playerOrder": len(game["players"]) + 1,
            "displayName": display_name
        }
    else:
        game["players"][uuid]["sid"] = session.get("sid", None)
        game["players"][uuid]["displayName"] = display_name

    for player in game['players']:
        if player != str(session.get('uuid')):
            data = {
                "action": "player-joined",
                "data": {
                    "player": str(session.get('uuid')),
                    "displayName": display_name,
                }
            }
            if game['players'][player]['sid'] is not None:
                socketio.emit('player-joined',
                              data,
                              to=game['players'][player]['sid'],
                              )

    result = {
        "gameId": game.get("gameId"),
        "hand": game.get("players").get(uuid).get('hand'),
        "discard": {},
        "gameState": game.get("gameState"),
        "players": {},
        "playerOrder": game["players"].get(uuid).get('playerOrder'),
        "turnCounter": game.get('turnCounter'),
        "turnState": game['currentTurnState'],
        "isOwner": game.get('owner') == uuid,
        "melds": game.get('melds')
    }

    if game.get('gameState') == "in-game":
        if len(game.get('discardPile')) > 0:
            result['discard'] = game.get('discardPile')[0]
        result['players'] = player_response_builder(uuid, game['players'])

    redis_client.json().set("game:%d" % game_id, Path.root_path(), game)

    return result


def leave_game(game_id):
    """Leave Rummy Game."""
    game_id = int(game_id)
    game = redis_client.json().get("game:%d" % game_id)
    uuid = str(session.get('uuid'))

    del session["game_id"]
    del game["players"][uuid]

    redis_client.json().set("game:%d" % game_id, Path.root_path(), game)
    return game


def start_game(game_id):
    """Start Rummy Game."""
    game_id = int(game_id)
    game = redis_client.json().get("game:%d" % game_id)

    for player in game["players"]:
        for i in range(7):
            game["players"][player]["hand"].append(game["deck"][0])
            game["deck"].pop(0)

    game['pickupCard'] = game['deck'][0]
    game['deck'].pop(0)

    game['gameState'] = 'in-game'

    for player in game['players']:
        data = {
            "action": "started",
            "game": {
                "hand": game["players"][player].get("hand"),
                "discard": {},
                "turnCounter": 1,
                "playerOrder": game["players"][player]["playerOrder"],
                "players": player_response_builder(player, game['players']),
                "turnState": game["currentTurnState"],
            }
        }
        if game['players'][player]['sid'] is not None:
            socketio.emit('game-started', data,
                          to=game['players'][player]['sid'])

    redis_client.json().set("game:%d" % game_id, Path.root_path(), game)

    return game


def make_move(game_key, player, move, data):
    """Make Rummy Move."""
    game = redis_client.json().get(game_key)

    print(data, file=sys.stderr)
    result = {
        "move": {
            "type": move,
            "data": {}
        },
        "nextTurnState": "",
        "nextTurnCounter": game['turnCounter'] 
    }

    if move == "drawPickup":
        # TODO verify enough cards
        picked_card = game.get('deck')[0]
        game.get('deck').pop(0)
        game.get('players').get(player).get('hand').append(picked_card)

        result['move']['data']['card'] = picked_card
        result["nextTurnState"] = "meld"

        game['currentTurnState'] = 'meld'
        for key in game.get('players'):
            sid = game.get('players').get(key).get('sid')

            if key != player and sid is not None:
                message = {
                    "move": {
                        "type": "pickup",
                        "data": {
                            "players":
                                player_response_builder(key,
                                                        game.get('players')),
                            "discard": {}

                        }
                    },
                    "nextTurnState": game['currentTurnState']

                }

                if len(game.get('discardPile')) > 0:
                    message['move']['data']['discard'] = game.get('discardPile')[
                        0]
                socketio.emit('played-move', message, to=sid)

    if move == "drawDiscard":
        if len(game.get('discardPile')) > 0:
            picked_card = game.get('discardPile')[0]
            game.get('discardPile').pop(0)
            game.get('players').get(player).get('hand').append(picked_card)

            result['move']['data']['card'] = picked_card
            result["nextTurnState"] = "meld"
            result['move']['data']["discard"] = {}

            if len(game.get('discardPile')) > 0:
                result['move']['data']['discard'] = game.get('discardPile')[0]

            game['currentTurnState'] = 'meld'

            for key in game.get('players'):
                sid = game.get('players').get(key).get('sid')

                if key != player and sid is not None:
                    message = {
                        "move": {
                            "type": "pickup",
                            "data": {
                                "players":
                                    player_response_builder(key,
                                                            game.get('players')),
                                "discard": result['move']['data']['discard']
                            }
                        },
                        "nextTurnState": game['currentTurnState']
                    }
                    socketio.emit('played-move', message, to=sid)

    if move == "meld":
        meld = data.get('cards')
        game.get('melds').append(meld)
        for card in meld:
            game.get('players').get(player).get('hand').remove(card)

        result['move']['data']['melds'] = game.get('melds') 
        result['move']['data']['hand'] = game.get('players').get(player).get('hand', {})
        result["nextTurnState"] = "meld"

        game['currentTurnState'] = 'meld'
        for key in game.get('players'):
            sid = game.get('players').get(key).get('sid')

            if key != player and sid is not None:
                message = {
                    "move": {
                        "type": "meld",
                        "data": {
                            "players":
                                player_response_builder(key,
                                                        game.get('players')),
                            "melds": result['move']['data']['melds']
                        }
                    },
                    "nextTurnState": game['currentTurnState']
                }
                socketio.emit('played-move', message, to=sid)

    if move == "layOff":
        meld = data.get('cards')
        game.get('melds').append(meld)
        for card in meld:
            game.get('players').get(player).get('hand').remove(card)

        result['move']['data']['melds'] = game.get('melds') 
        result['move']['data']['hand'] = game.get('players').get(player).get('hand', {})
        result["nextTurnState"] = "meld"

        game['currentTurnState'] = 'meld'
        for key in game.get('players'):
            sid = game.get('players').get(key).get('sid')

            if key != player and sid is not None:
                message = {
                    "move": {
                        "type": "meld",
                        "data": {
                            "players":
                                player_response_builder(key,
                                                        game.get('players')),
                            "melds": result['move']['data']['melds']
                        }
                    },
                    "nextTurnState": game['currentTurnState']
                }
                socketio.emit('played-move', message, to=sid)

    if move == "discard":
        discardedCard = data.get('card')
        game.get('players').get(
            player).get('hand').remove(discardedCard)
        game.get('discardPile').insert(0, discardedCard)
        turnCounter = game['turnCounter'] + 1
        if turnCounter > len(game.get('players')):
            turnCounter = 1

        game['currentTurnState'] = "pickup"
        game['turnCounter'] = turnCounter

        result["nextTurnState"] = "pickup"
        result["nextTurnCounter"] = turnCounter
        result["hand"] = game.get('players').get(player).get('hand')
        result['move']['data']["discard"] = game.get('discardPile')[0]

        for key in game.get('players'):
            sid = game.get('players').get(key).get('sid')
            if key != player and sid is not None:
                message = {
                    'move': {
                        'type': "discard",
                        'data': {
                            'players': player_response_builder(key, game.get('players')),
                            'discard': result['move']['data']["discard"]
                        } 
                    },
                    'nextTurnState': game['currentTurnState'],
                    'nextTurnCounter': game['turnCounter']
                }
                socketio.emit('played-move', message, to=sid)

    if len(game.get('players').get(player).get('hand')) == 0:
        for key in game.get('players'):
            sid = game.get('players').get(key).get('sid')
            game['gameState'] = 'ended'

            if sid is not None:
                message = {
                    'move': {
                        'type': "roundEnd",
                        'data': {
                            'players': player_response_builder(key, game.get('players')),
                            'winner': {
                                'displayName': game.get('players').get(player).get('displayName'),
                                'isPlayer': key == player
                            },
                            'redirect': '/'
                        } 
                    },
                }
                socketio.emit('played-move', message, to=sid)
        
    redis_client.json().set(game_key, Path.root_path(), game)

    return result



def player_response_builder(current, player_dic):
    """"Build player response."""
    players = []
    for key in player_dic:
        if key != current:
            players.append(
                {
                    'displayName': player_dic[key]['displayName'],
                    'cardCount': len(player_dic[key]['hand']),
                    'playerOrder': player_dic[key].get('playerOrder', 0)
                })
    if players[-1].get('playerOrder') > player_dic[current].get('playerOrder'):
        while players[0].get('playerOrder') < player_dic[current].get('playerOrder'):
            players.append(players.pop(0))
    return players


def winner_points(player_dic, winner, game):  # winner = player uuid
    """Returns points of winner"""
    sum = 0
    for player in player_dic:
        if player != winner:
            for card in game["players"][player]["hand"]:
                if card.get('value') == 'A':
                    sum += 1
                elif card.get('value') in ['J', 'Q', 'K']:
                    sum += 10
                else:
                    sum += int(card.get('value'))
    return sum

"""def is_valid_meld(meld):
    if len(meld) < 3:
        return false
    meld.sort(key=lambda x: x.value)
    
"""