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
        print('sid: ', request.sid, file=sys.stderr)

    print('connected: ', session.get('uuid'), file=sys.stderr)


@socketio.on('disconnect')
def handle_disconnect():
    """Handle socket disconnect."""
    del session['sid']
    print('disconnect: ', session.get('uuid'), file=sys.stderr)


@socketio.on('player-joined')
def handle_join(json):
    data = {
            "action": "player-joined",
            "data": {
                "player": str(session.get('uuid')),
                "displayName": json.get('displayName')
                }
            }
    socketio.emit('player-join', data)


@socketio.on('game-start')
def handle_start(json):
    # Check if game exists
    # Check if game has started
    # Check if user who sent is in the game
    # LATER Check if user who sent is the game owner
    # LATER Check if game has enough players (2 for now)
    # Send game-started to all players with individuals hands  

    print(json, file=sys.stderr)
