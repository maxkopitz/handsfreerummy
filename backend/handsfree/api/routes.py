"""Handsfree Routes."""
from handsfree import app, redis_client, socketio
from handsfree.game import utils
from flask import session, request
from uuid import uuid4
from redis.commands.json.path import Path
import sys


@app.route('/', methods=['GET'])
def api():
    return {"response": session}


@app.route('/register/', methods=['GET'])
def register():
    """Register a user and direct them."""
    response = {
        "status": "success",
        "redirect": "/"
    }
    if session.get('uuid') is None:
        session['uuid'] = uuid4()
        return response

    if session.get('game_id') is not None:
        game_id = session.get('game_id')
        game_key = f"game:{game_id}"
        game = redis_client.json().get(game_key)
        if game.get('gameState') != 'ended':
            response["redirect"] = f"games/{game_id}/"
    return response


@app.route('/games/', methods=['GET'])
def get_games():
    """Returns all active games"""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}

    games = utils.get_active_games()
    return {"games": games}


@app.route('/games/', methods=['POST'])
def create_game():
    """Create a rummy game."""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}

    if session.get('game_id'):
        result = redis_client.json().get('game:%d' % session.get('game_id'))
        if result.get('gameState') != 'ended':
            app.logger.info(session)
            return {"error": {"message": "Already in game"}}, 409

    game = utils.create_game()

    return {"game": game}


@app.route('/games/<game_id>/', methods=['GET'])
def get_game(game_id):
    """Get a rummy game."""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}

    game_key = f"game:{game_id}"
    app.logger.info('%d', game_key)

    if not redis_client.exists(game_key):
        return {"error": {"message": "Game does not exist"}}

    result = redis_client.json().get(game_key)
    return result


@app.route('/games/<game_id>/', methods=['POST'])
def handle_game_action(game_id):
    """Handle action for a rummy game."""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}

    json_body = request.json
    action = json_body.get('action')
    game_key = f"game:{game_id}"
    uuid = str(session.get('uuid'))

    if action is None:
        return {"error": {"message": "Incorrect format"}}

    if not redis_client.exists(game_key):
        # Extra clean up
        if int(game_id) == session.get('game_id'):
            del session['game_id']
        return {"error": {"message": "Game does not exist"}}, 404

    if action == 'join':
        if session.get("in_game") and session.get('game_id') != game_id:
            return {"error": {"message": "Already in game"}}, 403

        game = redis_client.json().get(game_key)
        players = game.get('players')
        if game.get('gameState') != 'lobby' and players.get(uuid) is None:
            return {
                "error": {
                    "message": "Game has started!"
                }}, 403

        result = utils.join_game(
            game_id,
            request.json.get('displayName', 'NA'))

        return {"game": result}

    if action == 'leave':
        # TODO FIX
        if session.get("in_game") is False and session.get('game_id') is None:
            return {"error": {"message": "Not in a game"}}, 404

        result = utils.leave_game(game_id)

        return result

    if action == 'start':
        if redis_client.json().get(game_key).get('gameState') == 'in-game':
            return {"error": {"message": "Game has started"}}, 404
        result = utils.start_game(game_id)

        return result

    if action == 'move':
        move = json_body.get('move', {})
        if move.get('type') is None:
            return {"error": {"message": "No move specified"}}, 404

        result = utils.make_move(
            game_key,
            uuid,
            move.get('type'),
            move.get('data', {}))

        return result

    if action == 'end-game':
        game = redis_client.json().get(game_key)
        if game.get('owner') != uuid:
            return {"error": {"message": "Not owner!"}}, 403
        game['gameState'] = 'ended'
        redis_client.json().set(game_key, Path.root_path(), game)
        return {"game": "ended"}

    return {"error": {"message": "Unknown action."}}, 404


@app.route('/users/', methods=['GET'])
def get_user():
    """Get user profile."""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}
    return {"uuid": session.get('uuid'), "game_id": session.get('game_id')}
