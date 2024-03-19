from flask import session, request
from redis.commands.json.path import Path
import sys
from handsfree import redis_client, socketio


@socketio.on('connect')
def handle_connect(sid):
    """Handle socket connection."""
    session['sid'] = request.sid
    # Update player session with socket id
    if session.get('game_id'):
        game_id = session.get('game_id')
        game = redis_client.json().get("game:%d" % game_id)


        uuid = str(session.get('uuid'))
        game["players"][uuid]["sid"] = session.get("sid", None)
        redis_client.json().set("game:%d" % game_id, Path.root_path(), game)
        print('sid: ', request.sid, file=sys.stderr)

    print('connected: ', session.get('uuid'), file=sys.stderr)


@socketio.on('disconnect')
def handle_disconnect():
    """Handle socket disconnect."""
    del session['sid']
    print('disconnect: ', session.get('uuid'), file=sys.stderr)


@socketio.on('game-join')
def handle_join(data):
    result = redis_client.json().get('game:1')

    print('result: ', result, file=sys.stderr)
    socketio.emit('test')


@socketio.on('game-start')
def handle_start():
    print('starting')
