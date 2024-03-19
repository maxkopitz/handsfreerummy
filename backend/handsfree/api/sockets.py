from flask import session
import sys
from handsfree import redis_client, socketio


@socketio.on('connect')
def handle_connect():
    """Handle socket connection."""
    print('connected: ', session.get('uuid'), file=sys.stderr)


@socketio.on('disconnect')
def handle_disconnect():
    print('disconnect: ', session.get('uuid'), file=sys.stderr)


@socketio.on('game-join')
def handle_join(data):
    result = redis_client.json().get('game:1')

    print('result: ', result, file=sys.stderr)
    socketio.emit('test')


@socketio.on('game-start')
def handle_start():
    print('starting')
