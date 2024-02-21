"""Routes."""
from handsfree import app, games
from handsfree.game import Game, GameEncoder
from flask import session
from uuid import uuid4
import json
import time

@app.before_request
def make_session_permanent():
    session.permanent = True


@app.route('/', methods=['GET'])
def api():
    games.addPlayer(str(session.get('uuid')))
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

    return json.dumps(games, indent=4, cls=GameEncoder)


@app.route('/games', methods=['POST'])
def create_game():
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}
    games.append(Game(4, playerIDs=[session.get('uuid')]))
    time.sleep(1)
    return {"games": session.get('games')}
