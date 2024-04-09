from flask import session, request
from redis.commands.json.path import Path
from handsfree import redis_client, socketio, app
from flask_socketio import disconnect


@socketio.on('connect')
def handle_connect(sid):
    """Handle socket connection."""
    app.logger.info('Socket Connection, SID: %s, UUID: %s',
                    request.sid, str(session.get('uuid')))

    if session.get('uuid') is None:
        # Prevent session from being created before calling /register
        disconnect(request.sid)
        return False

    session['sid'] = request.sid
    # Update player session with socket id
    if session.get('game_id'):
        game_id = session.get('game_id')
        game = redis_client.json().get("game:%d" % game_id)

        uuid = str(session.get('uuid'))
        game["players"][uuid]["sid"] = session.get("sid", None)
        redis_client.json().set("game:%d" % game_id, Path.root_path(), game)


@socketio.on('disconnect')
def handle_disconnect():
    """Handle socket disconnect."""
    app.logger.info('Socket Disconnected, SID: %s, UUID: %s',
                    request.sid, str(session.get('uuid')))
    if session.get('uuid') is not None:
        session['sid'] = None
