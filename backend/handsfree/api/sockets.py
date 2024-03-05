from flask import request, session
from handsfree import app, redis_client, socketio
from handsfree.game import Game, GameEncoder
from flask_socketio import ConnectionRefusedError
import json


@socketio.on('connect')
def handle_connect(data):

    game_key = f"game:{session.get('game_id')}"
    if not redis_client.hexists(game_key, 'game'):
        raise ConnectionRefusedError('Not in game')

    result = redis_client.hget(game_key, 'game').decode('utf-8')
    game = Game().from_json(result)
    print(game)


@socketio.on('disconnect')
def handle_disconnect():
    print('disconnect')


@socketio.on('game-start')
def handle_start():
    print(session.get('uuid'), 'requested to start game', session.get('game_id'))
    game_key = f"game:{session.get('game_id')}"
    result = redis_client.hget(game_key, 'game').decode('utf-8')
    game = Game().from_json(result)
    print(game.gameId)
