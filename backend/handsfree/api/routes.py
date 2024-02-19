from handsfree import app
from flask import request, session

@app.before_request
def make_session_permanent():
    session.permanent = True
@app.route('/', methods=['GET'])
def api():
    username = request.cookies.get('username')
    return {
            'message': username
            }
