from flask import session, request
from redis.commands.json.path import Path
import sys
from handsfree import redis_client, socketio
from flask_socketio import disconnect


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

    print('connected: ', session.get('uuid'), file=sys.stderr)


@socketio.on('disconnect')
def handle_disconnect():
    """Handle socket disconnect."""
    session['sid'] = None
    print('disconnect: ', session.get('uuid'), file=sys.stderr)