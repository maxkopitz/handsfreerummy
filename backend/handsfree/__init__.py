"""Handsfree Rummy Backend"""
from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

from handsfree.api import sockets # noqa: E402  pylint: disable=wrong-import-position
from handsfree.api import routes # noqa: E402  pylint: disable=wrong-import-position

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=4000)
