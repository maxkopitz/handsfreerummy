"""Handsfree Rummy Backend"""
from flask import Flask, request
from flask_socketio import SocketIO
from handsfree.game import Game

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

games = []
@socketio.on('connect')
def handle_message():
    game = {
        'id': '123',
        'players': 0,
        'state': 'waiting'
    }
    print(request.sid)
    socketio.emit('new-games', data=game)

@socketio.on('create-game')
def handle_create(data):
    game = Game(1, playerIDs=[request.sid])
    games.append(game)
    socketio.emit('created-game', data=game, to=request.sid)
    #socketio.emit('new-games', data=game)

@socketio.on('join-game')
def handle_join(data):
    gameID = data['id']
    games[gameID].players += 1
    games[gameID].playerIDs.append(request.sid)
 
    socketio.emit('joined-game', data=game)

@socketio.on('start-game')
def handle_start(data):
    gameID = data['id']
    games[gameID].runGame()

    socketio.emit('game-started', data=data)

@socketio.on('draw-card')
def handle_draw_card(data):
    gameID = data['id']
    drawType = data['drawType'] # discard or stock
    games[gameID].drawCard(request.sid, drawType)
    socketio.emit('card-drawn', data=data)

app.route('/')
def index():
    return "Hello, World!"
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=4000)
