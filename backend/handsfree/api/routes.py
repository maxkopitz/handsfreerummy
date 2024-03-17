"""Handsfree Routes."""
from handsfree import app, redis_client
from handsfree.game import Game, GameEncoder, utils
from flask import session, request
from uuid import uuid4


@app.route('/', methods=['GET'])
def api():
    return {"response": session}


@app.route('/register/', methods=['GET'])
def register():
    if session.get('uuid') is None:
        session['uuid'] = uuid4()
    return {"uuid": session.get('uuid')}


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
        app.logger.info(session)
        print(result)
        return {"error": {"message": "Already in game"}}, 409

    game = utils.create_game()

    return game


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

    action = request.json.get('action')
    if action is None:
        return {"error": {"message": "Incorrect format"}}

    game_key = f"game:{game_id}"

    if not redis_client.exists(game_key):
        # Extra clean up
        if int(game_id) == session.get('game_id'):
            del session['game_id']
        return {"error": {"message": "Game does not exist"}}, 404

    if action == 'join':
        if session.get("in_game") and session.get('game_id') != game_id:
            return {"error": {"message": "Already in game"}}, 404

        result = utils.join_game(game_id)

        return result

    if action == 'leave':
        if session.get("in_game") is False and session.get('game_id') is None:
            return {"error": {"message": "Not in a game"}}, 404

        result = utils.leave_game(game_id)

        return result
    if action == 'start':
        result = utils.start_game(game_id)
        return result


@app.route('/users/', methods=['GET'])
def get_user():
    """Get user profile."""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}
    return {"uuid": session.get('uuid'), "game_id": session.get('game_id')}
