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
        "nextTurnState": "",
        "nextTurnCounter": game['turnCounter']
    }
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
                                utils.player_response_builder(
                                    key,
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
    return result, game


def drawDiscard(player, move, game):
    result = {
        'status': 'success',
        "move": {
            "type": move,
            "data": {}
        },
        "nextTurnState": "",
        "nextTurnCounter": game['turnCounter']
    }

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
                                utils.player_response_builder(
                                    key,
                                    game.get('players')),
                            "discard": result['move']['data']['discard']
                        }
                    },
                    "nextTurnState": game['currentTurnState']
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
        "nextTurnState": "",
        "nextTurnCounter": game['turnCounter']
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
                            utils.player_response_builder(
                                key,
                                game.get('players')),
                        "melds": result['move']['data']['melds']
                    }
                },
                "nextTurnState": game['currentTurnState']
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
        "nextTurnState": "",
        "nextTurnCounter": game['turnCounter']
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
                            utils.player_response_builder(key,
                                                          game.get('players')),
                        "melds": result['move']['data']['melds']
                    }
                },
                "nextTurnState": game['currentTurnState']
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
        "nextTurnState": "",
        "nextTurnCounter": game['turnCounter']
    }
    # TODO Verify in hand
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
                        'players': utils.player_response_builder(
                            key,
                            game.get('players')),
                        'discard': result['move']['data']["discard"]
                    }
                },
                'nextTurnState': game['currentTurnState'],
                'nextTurnCounter': game['turnCounter']
            }
            socketio.emit('played-move', message, to=sid)
    return result, game


def can_game_end(player: str, game: dict):
    """Check if a game can end."""
    result = False
    if len(game.get('players').get(player).get('hand')) == 0:
        result = True
        for key in game.get('players'):
            sid = game.get('players').get(key).get('sid')
            game['gameState'] = 'ended'
            game['points'].append((player, utils.winner_points(game.get("players"), player, game)))

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
                            'redirect': '/'
                        }
                    },
                }
                socketio.emit('played-move', message, to=sid)
    return result, game
