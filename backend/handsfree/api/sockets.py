from flask import request
import handsfree
from handsfree.game import Game

games = []
@handsfree.socketio.on('connect')
def handle_connect(data):
    game = {
        'id': '123',
        'players': 0,
        'state': 'waiting'
    }
    handsfree.socketio.emit('new-games', data=game, to=request.sid)

@handsfree.socketio.on('create-game')
def handle_create(data):
    game = Game(1, playerIDs=[request.sid])
    games.append(game)
    handsfree.socketio.emit('created-game', data=game, to=request.sid)
    #handsfree.socketio.emit('new-games', data=game)

@handsfree.socketio.on('join-game')
def handle_join(data):
    gameID = data['id']
    games[gameID].players += 1
    games[gameID].playerIDs.append(request.sid)
 
    handsfree.socketio.emit('joined-game', data=games[gameID], to=request.sid)

@handsfree.socketio.on('start-game')
def handle_start(data):
    gameID = data['id']
    games[gameID].runGame()

    # Also want to know who started and discard card
    for player in games[gameID].players:
        handsfree.socketio.emit('game-started', data=player.hand, to=player.id)

@handsfree.socketio.on('draw-card')
def handle_draw_card(data):
    gameID = data['id']
    drawType = data['drawType'] # discard or stock
    games[gameID].drawCard(request.sid, drawType)
    handsfree.socketio.emit('card-drawn', data=data)

@handsfree.socketio.on('discard')
def handle_draw_card(data):
    gameID = data['id']
    card = data['card']
    games[gameID].drawCard(request.sid, card)
    handsfree.socketio.emit('card-discarded', data=data)