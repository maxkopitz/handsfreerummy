"""Game Move."""
from handsfree import socketio
import handsfree.game.utils as utils


def drawPickup(player: str, move: str, game: dict):
    """Player pickup from pickup pile."""
    result = {
        'status': 'success',
        "move": {
            "type": move,
            "data": {}
        },
        'turnState': game.get('turnState')
    }
    # TODO verify enough cards
    picked_card = game.get('deck', [])[0]
    game.get('deck', []).pop(0)
    game.get('players', {}).get(player).get('hand').append(picked_card)

    result['move']['data']['card'] = picked_card

    game['turnState']['stage'] = 'end'

    result['turnState'] = game['turnState']

    player_name = game.get('players').get(player).get('displayName')

    for key in game.get('players'):
        sid = game.get('players').get(key).get('sid')

        if key != player and sid is not None:
            message = {
                "move": {
                    "type": "pickup",
                    "data": {
                            "players":
                                utils.player_response_builder(
                                    key,
                                    game.get("players")),
                            "discard": {}
                    }
                },
                "turnState": game["turnState"],
                "message": {
                    "title": player_name,
                    "body": "drew from the pickup pile."
                }
            }

            if len(game.get("discardPile")) > 0:
                message["move"]["data"]['discard'] = game.get('discardPile')[
                    0]
            socketio.emit('played-move', message, to=sid)
    return result, game


def drawDiscard(player, move, game):
    result = {
        'status': 'success',
        "move": {
            "type": move,
            "data": {}
        },
        'turnState': game['turnState']
    }

    if len(game.get('discardPile')) > 0:
        picked_card = game.get('discardPile')[0]
        game.get('discardPile').pop(0)
        game.get('players').get(player).get('hand').append(picked_card)

        result['move']['data']['card'] = picked_card
        result['move']['data']["discard"] = {}

        if len(game.get('discardPile')) > 0:
            result['move']['data']['discard'] = game.get('discardPile')[0]

        game['turnState']['stage'] = 'end'
        result['turnState'] = game['turnState']

        player_name = game.get('players').get(player).get('displayName')

        for key in game.get('players'):
            sid = game.get('players').get(key).get('sid')

            if key != player and sid is not None:
                message = {
                    "move": {
                        "type": "pickup",
                        "data": {
                            "players":
                                utils.player_response_builder(
                                    key,
                                    game.get('players')),
                            "discard": result['move']['data']['discard']
                        }
                    },
                    "turnState": game['turnState'],
                    "message": {
                        "title": player_name,
                        "body": "drew from the discard pile."
                    }
                }
                socketio.emit('played-move', message, to=sid)
    return result, game


def make_meld(meld: list, move: str, player: str, game):
    """Make a meld."""
    result = {
        'status': 'success',
        "move": {
            "type": move,
            "data": {}
        },
        "turnState": game['turnState']
    }
    if not utils.is_valid_meld(meld):
        return {
            'status': "error",
            'error': {
                "message": "Invalid meld."
            }
        }, game
    game.get('melds').append(meld)
    for card in meld:
        game.get('players').get(player).get('hand').remove(card)

    result['move']['data']['melds'] = game.get('melds')
    result['move']['data']['hand'] = game.get(
        'players').get(player).get('hand', {})

    player_name = game.get('players').get(player).get('displayName')

    for key in game.get('players'):
        sid = game.get('players').get(key).get('sid')

        if key != player and sid is not None:
            message = {
                "move": {
                    "type": "meld",
                    "data": {
                        "players":
                            utils.player_response_builder(
                                key,
                                game.get('players')),
                        "melds": result['move']['data']['melds']
                    }
                },
                "turnState": game['turnState'],
                "message": {
                    "title": player_name,
                    "body": "played a meld."
                }
            }
            socketio.emit('played-move', message, to=sid)

    return result, game


def layoff(card: dict, player: str, meldId: int, move: str, game):
    """Layoff."""
    result = {
        'status': 'success',
        "move": {
            "type": move,
            "data": {}
        },
        "turnState": game['turnState'],
    }
    game.get('melds')[meldId].append(card)
    if not utils.is_valid_meld(game.get('melds')[meldId]):
        return {
            "status": "error",
            "error": {
                "message": "Invalid meld."
            }
        }, game
    game.get('players').get(player).get('hand').remove(card)

    result['move']['data']['melds'] = game.get('melds')
    result['move']['data']['hand'] = game.get(
        'players').get(player).get('hand', {})

    player_name = game.get('players').get(player).get('displayName')

    for key in game.get('players'):
        sid = game.get('players').get(key).get('sid')

        if key != player and sid is not None:
            message = {
                "move": {
                    "type": "meld",
                    "data": {
                        "players":
                            utils.player_response_builder(key,
                                                          game.get('players')),
                        "melds": result['move']['data']['melds']
                    }
                },
                "turnState": game['turnState'],
                "message": {
                    "title": player_name,
                    "body": "layed off a meld."
                }
            }
            socketio.emit('played-move', message, to=sid)
    return result, game


def discard(discardedCard: dict, player: str, move: str, game: dict):
    """Discard a card from player hand."""
    result = {
        'status': 'success',
        "move": {
            "type": move,
            "data": {}
        },
        'turnState': game['turnState']
    }
    # TODO Verify in hand
    game.get('players').get(
        player).get('hand').remove(discardedCard)
    game.get('discardPile').insert(0, discardedCard)

    turnCounter = game['turnState']['turnCounter'] + 1

    if turnCounter > len(game.get('players')):
        turnCounter = 1

    game['turnState']['turnCounter'] = turnCounter
    game['turnState']['stage'] = 'start'

    result['turnState'] = game['turnState']
    result['hand'] = game.get('players', {}).get(player).get('hand')
    result['move']['data']['discard'] = game.get('discardPile', [])[0]

    player_name = game.get('players').get(player).get('displayName')

    for key in game.get('players', []):
        sid = game.get('players').get(key).get('sid')
        if key != player and sid is not None:
            message = {
                'move': {
                    'type': "discard",
                    'data': {
                        'players': utils.player_response_builder(
                            key,
                            game.get('players')),
                        'discard': result['move']['data']["discard"]
                    }
                },
                'turnState': game['turnState'],
                "message": {
                    "title": player_name,
                    "body": "discarded a card. It is a new players turn."
                }
            }
            socketio.emit('played-move', message, to=sid)
    return result, game

def can_game_end(game: dict):
    points = {}
    pointList = game.get('points', [])
    for round in pointList:
        print(round)
        if round['player'] in points:
            points[round['player']] += round['points']
        else:
            points[round['player']] = round['points']
    for key in points:
        if points[key] > 200:
            return True, key
        
    return False, None
        
            

def can_round_end(player: str, game: dict):
    """Check if a game can end."""
    result = False
    if len(game.get('players').get(player).get('hand')) == 0:
        result = True
        game['points'].append({
            'player': player,
            'points': utils.winner_points(game.get("players"), player, game)
        })
        for key in game.get('players'):
            sid = game.get('players').get(key).get('sid')
            
            

            if sid is not None:
                displayName = game.get('players').get(
                    player).get('displayName')
                message = {
                    'move': {
                        'type': "roundEnd",
                        'data': {
                            'players': utils.player_response_builder(
                                key,
                                game.get('players')),
                            'winner': {
                                'displayName': displayName,
                                'isPlayer': key == player
                            },
                            'points': game.get('points'),
                            'redirect': '/'
                        }
                    },
                }
                socketio.emit('played-move', message, to=sid)
        gameEnd, winner = can_game_end(game)
        if not gameEnd:
            game = utils.manual_restart_game(game)
    return result, game
