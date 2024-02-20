"""Routes."""
from handsfree import app
from flask import session
from uuid import uuid4
import time

@app.before_request
def make_session_permanent():
    session.permanent = True


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
    return {"games": session.get('games')}


@app.route('/games', methods=['POST'])
def create_game():
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}
    time.sleep(5)
    return {"games": session.get('games')}
