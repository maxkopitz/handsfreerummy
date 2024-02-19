from handsfree import app
from flask import request, session

@app.before_request
def make_session_permanent():
    session.permanent = True

@app.route('/', methods=['GET'])
def api():
    session['username'] = 'test'
    return {"message": session}

@app.route('/games', methods=['GET'])
def get_games():
    return {"games": session}
