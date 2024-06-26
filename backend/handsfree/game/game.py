from handsfree import redis_client, socketio, app
from handsfree.game import utils
from handsfree.game import moves
from redis.commands.json.path import Path
from flask import session
from random import shuffle
import time

GAME_KEY_INDEX = 'games_index'
ACTIVE_GAMES = 'active_games'
suits = ["hearts", "diamonds", "clubs", "spades"]
values = ["A", "2", "3", "4", "5", "6", "7", "8",
          "9", "10", "J", "Q", "K"]
game_states = ['lobby', 'in-game', 'ended']
turn_states = ['start', 'end']


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
        "melds": [],
        "discardPile": [],
        "pickupCard": {},
        "gameState": "lobby",
        "deck": deck,
        "points": [],
        "turnState": {
            "turnCounter": 1,
            "stage": "start"  # "start", "end"
        }
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
    uuid = str(session.get('uuid'))

    if len(game.get('players')) == game.get('maxPlayers'):
        if game.get('players').get(uuid) is None:
            result = {
                "status": "error",
                "error": {
                    "message": "Unable to join game, max players.",
                    "redirect": "/"
                }
            }
            return result

    session["game_id"] = game_id

    if game["players"].get(uuid) is None:
        game["players"][uuid] = {
            "sid": session.get("sid", None),
            "hand": [],
            "displayName": display_name
        }
    else:
        # game["players"][uuid] = utils.player_join_builder(uuid, game['players'])
        game["players"][uuid]["sid"] = session.get("sid", None)
        game["players"][uuid]["displayName"] = display_name

    player_name = game['players'][uuid]['displayName']
    for player in game['players']:
        data = {
            "action": "player-joined",
            "data": {
                # "players": utils.player_join_builder(uuid, game['players']),
                # list(game.get('players'))
                "player": str(session.get('uuid')),
                "displayName": display_name,
                "players": utils.player_join_builder(player, game['players'])
            },
            "message": {
                "title": player_name,
                "body": "has joined the game."
            }

        }
        if game['players'][player]['sid'] is not None:
            socketio.emit('player-joined',
                          data,
                          to=game['players'][player]['sid'],
                          )

    result = {
        "status": "success",
        "result": {
            "message": f"Joined game {game_id}.",
            "game": {
                "gameId": game.get("gameId"),
                "hand": game.get("players").get(uuid).get('hand'),
                "discard": {},
                "gameState": game.get("gameState"),
                "players": utils.player_join_builder(uuid, game['players']),  # Changed if in-game
                "playerOrder": game["players"].get(uuid).get('playerOrder'),
                "turnState": game.get('turnState'),
                "isOwner": game.get('owner') == uuid,
                "melds": game.get('melds')
            }
        }
    }

    if game.get('gameState') == "in-game":
        if len(game.get('discardPile')) > 0:
            result['result']['game']['discard'] = game.get('discardPile')[0]
        result['result']['game']['players'] = utils.player_response_builder(
            uuid, game['players'])

    redis_client.json().set("game:%d" % game_id, Path.root_path(), game)

    return result


def leave_game(game_id):
    """Leave Rummy Game."""
    game_id = int(game_id)
    game = redis_client.json().get("game:%d" % game_id)
    uuid = str(session.get('uuid'))
    if (game.get('owner') == uuid):
        game['gameState'] = 'ended'
        redis_client.json().set("game:%d" % game_id, Path.root_path(), game)

    player_name = game['players'][uuid]['displayName']
    del session["game_id"]
    del game["players"][uuid]
    socket_data = {
            "action": "player-left",
            "data": {
                "player": str(session.get('uuid')),
                "gameEnded": False,
            },
            "message": {
                "title": player_name,
                "body": "has left the game."
            }
    }

    if game.get('owner') == uuid:
        socket_data['data']['gameEnded'] = True
    for player in game['players']:

        if game['players'][player]['sid'] is not None and player != uuid:
            socketio.emit('player-left', socket_data,
                          to=game['players'][player]['sid'])

    redis_client.json().set("game:%d" % game_id, Path.root_path(), game)
    return game


def start_game(game_id, restart = False):
    """Start Rummy Game."""
    game_id = int(game_id)
    game = redis_client.json().get("game:%d" % game_id)

    if restart:
        for player in game['players']:
            data = {
                "action": "restarted",
                "game": {
                    "hand": game["players"][player].get("hand"),
                    "discard": {},
                    "turnCounter": game['turnState']['turnCounter'],
                    "playerOrder": game["players"][player]["playerOrder"],
                    "players": utils.player_response_builder(player, game['players']),
                    "turnState": game["turnState"],
                }
            }
            if game['players'][player]['sid'] is not None:
                socketio.emit('game-restarted', data,
                            to=game['players'][player]['sid'])

        redis_client.json().set("game:%d" % game_id, Path.root_path(), game)
        return game



    if len(game.get('players')) < 2:
        result = {
            "status": "error",
            "error": {
                "message": "Not enough players!"
            }
        }
        return result

    handSize = 7 if len(game.get('players')) > 2 else 13

    order = 1
    for player in game["players"]:
        game["players"][player]["playerOrder"] = order
        order += 1
        for i in range(handSize):
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
                "players": utils.player_response_builder(player, game['players']),
                "turnState": game["turnState"],
            }
        }
        if game['players'][player]['sid'] is not None:
            socketio.emit('game-started', data,
                          to=game['players'][player]['sid'])

    redis_client.json().set("game:%d" % game_id, Path.root_path(), game)

    return game

def make_move(game_key: str, player: str, move: str, data):
    """Make Rummy Move."""
    game = redis_client.json().get(game_key)

    result = {
        'status': 'success',
        "move": {
            "type": move,
            "data": {}
        },
        "turnState": game['turnState']
    }

    if move == "drawPickup":
        result, game = moves.drawPickup(player, move, game)

    if move == "drawDiscard":
        result, game = moves.drawDiscard(player, move, game)
        if result.get('status') == 'error':
            return result

    if move == "meld":
        meld = data.get('cards')
        result, game = moves.make_meld(meld, move, player, game)
        if result.get('status') == 'error':
            return result

    if move == 'layoff':
        card = data.get('card')
        meldId = int(data.get('meldId'))

        result, game = moves.layoff(card, player, meldId, move, game)
        if result.get('status') == 'error':
            return result

    if move == "discard":
        card = data.get('card')
        result, game = moves.discard(card, player, move, game)
        if result.get('status' == 'error'):
            return result

    can_round_end, game = moves.can_round_end(player, game)
    redis_client.json().set(game_key, Path.root_path(), game)
    if can_round_end:
        can_game_end, winner = moves.can_game_end(game)
        if not can_game_end:
            start_game(game.get('gameId'), True)
        else:
            game["gameState"] = "ended"
            redis_client.json().set(game_key, Path.root_path(), game)

    return result
