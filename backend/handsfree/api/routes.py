"""Routes."""
from handsfree import app, redis_client
from handsfree.game import Game, GameEncoder
from flask import session, request
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

    res = [] 
    return {"games": res}

@app.route('/games/join', methods=['POST'])
def join_game():
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}
    
    if request.json.get('game_id') is None:
        return {"error": {"message": "No game specified"}}

    game = redis_client.hget('game:1', 'game') 
    #TODO Check if game actually exists
    session['game_id'] = request.json.get('game_id')
    print(game)

    return {"game": "game"}

@app.route('/games/', methods=['POST'])
def create_game():
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}
    game = json.dumps(Game(2, [str(session.get('uuid'))]), cls=GameEncoder)
    redis_client.hset('game:1', mapping={
        "game": game})
    return json.dumps({"game": game})


@app.route('/games/<game_id>', methods=['GET'])
def get_game(game_id):
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}
    game = redis_client.hget('game:1', 'game').decode('utf-8')
    return {"game": json.dumps(game)}


@app.route('/users/', methods=['GET'])
def get_user():
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}
    return {"uuid": session.get('uuid'), "game_id": session.get('game_id')}