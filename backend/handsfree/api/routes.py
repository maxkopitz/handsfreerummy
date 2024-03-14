"""Handsfree Routes."""
from handsfree import app, redis_client
from handsfree.game import Game, GameEncoder, utils
from flask import session
from uuid import uuid4
import json


@app.route('/', methods=['GET'])
def api():
    return {"response": session}


@app.route('/register', methods=['GET'])
def register():
    if session.get('uuid') is None:
        session['uuid'] = uuid4()
    return {"uuid": session.get('uuid')}


@app.route('/games', methods=['GET'])
def get_games():
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}

    games = redis_client.json().get('game:1')
    return {"games": games}


@app.route('/games/', methods=['POST'])
def create_game():
    """Create a rummy game."""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}
    if session.get('game_id'):
        result = redis_client.json().get('game:%d' % session.get('game_id'))
        print(result)
        return {"error": {"message": "Already in game"}}, 409

    game = utils.create_game(session.get('uuid'))

    return game


@app.route('/games/<game_id>', methods=['GET'])
def get_game(game_id):
    """Get a rummy game."""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}

    game_key = f"game:{game_id}"

    if not redis_client.exists(game_key):
        return {"error": {"message": "Game does not exist"}}

    return {"game": "hi"}


@app.route('/games/<game_id>', methods=['POST'])
def join_game(game_id):
    """Join a rummy game"""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}

    game_key = f"game:{game_id}"

    if not redis_client.hexists(game_key, 'game'):
        return {"error": {"message": "Game does not exist"}}, 404

    if session.get("in_game") and session.get('game_id') != game_id:
        return {"error": {"message": "Already in game"}}, 404

    result = redis_client.hget(game_key, 'game').decode('utf-8')
    game = Game().from_json(result)

    if not session.get('game_id'):
        game.addPlayer(str(session.get('uuid')))
        json_game = json.dumps(game, cls=GameEncoder)
        redis_client.hset(game_key, mapping={"game": json_game})
        session['game_id'] = str(game.gameId)
        session['game_player_postion'] = len(game.players) - 1

    players = []
    for p in game.players:
        print(p)
        # players.append(p.get('id'))

    return {"game": {
        "gameId": game.gameId,
        "players": players,
        "gameState": game.gameState}}


@app.route('/users/', methods=['GET'])
def get_user():
    """Get user profile."""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}
    return {"uuid": session.get('uuid'), "game_id": session.get('game_id')}
