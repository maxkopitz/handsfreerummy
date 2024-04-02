"""
API Routes for /api/v1/games/
"""
from handsfree import app, redis_client
from handsfree.game import game as game_manager
from flask import session, request, Blueprint
from redis.commands.json.path import Path


game_blueprint = Blueprint('game',  __name__)


@game_blueprint.route('/', methods=['GET'])
def get_games():
    """Returns all active games"""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}

    games = game_manager.get_active_games()
    return {"games": games}


@game_blueprint.route('/', methods=['POST'])
def create_game():
    """Create a rummy game."""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}

    if session.get('game_id'):
        result = redis_client.json().get('game:%d' % session.get('game_id'))
        if result.get('gameState') != 'ended':
            app.logger.info(session)
            return {"error": {"message": "Already in game"}}, 409

    game = game_manager.create_game()

    return {"game": game}


@game_blueprint.route('/<game_id>/', methods=['GET'])
def get_game(game_id):
    """Get a rummy game."""
    if session.get('uuid') is None:
        return {"error": {"message": "You are not logged in"}}

    game_key = f"game:{game_id}"
    app.logger.info('%d', game_key)

    if not redis_client.exists(game_key):
        return {"error": {"message": "Game does not exist"}}

    result = redis_client.json().get(game_key)
    return result


@game_blueprint.route('/<game_id>/', methods=['POST'])
def handle_game_action(game_id):
    game_id = int(game_id)
    """Handle action for a rummy game."""
    if session.get('uuid') is None:
        return {
            "status": "error",
            "error": {
                "message": "You are not logged in"
            }}

    json_body = request.json
    action = json_body.get('action')
    if action is None:
        return {
            "status": "error",
            "error": {
                "message": "Incorrect format"
            }}

    game_key = f"game:{game_id}"
    uuid = str(session.get('uuid'))

    if not redis_client.exists(game_key):
        # Extra clean up
        if int(game_id) == session.get('game_id'):
            del session['game_id']
        return {
            "status": "error",
            "error": {
                "message": "Game does not exist",
                "type": 404
            }}, 404

    game = redis_client.json().get(game_key)
    players = game.get('players')

    if action == 'join':
        if session.get("in_game") and session.get('game_id') != game_id:
            return {
                "status": "error",
                "error": {
                    "message": "Already in game"
                }}, 403

        if game.get('gameState') != 'lobby' and players.get(uuid) is None:
            return {
                "status": "error",
                "error": {
                    "message": "Game has started!"
                }}, 403

        result = game_manager.join_game(
            game_id,
            request.json.get('displayName', 'NA'))

        return result

    if action == 'leave':
        if session.get('game_id') is None:
            return {
                "status": "error",
                "error": {
                    "message": "Not in a game"
                }}, 404

        result = game_manager.leave_game(game_id)

        return result

    if action == 'start':
        if game.get('gameState') == 'in-game':
            return {
                'status': 'error',
                "error": {
                    "message": "Game has started"
                }}, 404
        if game.get('owner') != uuid:
            return {
                'status': 'error',
                "error": {
                    "message": "Not owner!"
                }}, 403

        result = game_manager.start_game(game_id)

        return result

    if action == 'move':
        if session.get('game_id') != game_id:
            return {
                "status": "error",
                "error": {
                    "message": "Not in game"
                }}
        players = list(game.get('players'))
        whos_turn = players[game.get('turnCounter') - 1]
        if whos_turn != uuid:
            return {
                "status": "error",
                "error": {
                    "message": "Not player turn"
                }}

        move = json_body.get('move', {})
        moves = ['drawPickup', 'drawDiscard', 'meld', 'layoff', 'discard']
        move_type = move.get('type')

        if move_type is None or move_type not in moves:
            return {
                "status": "error",
                "error": {
                    "message": "Invalid move"
                }}

        result = game_manager.make_move(
            game_key,
            uuid,
            move.get('type'),
            move.get('data', {}))

        return result

    if action == 'end-game':
        game = redis_client.json().get(game_key)
        if game.get('owner') != uuid:
            return {
                'status': 'error',
                "error": {
                    "message": "Not owner!"
                }}, 403
        game['gameState'] = 'ended'
        redis_client.json().set(game_key, Path.root_path(), game)
        return {'status': 'success',
                "game": "ended"}

    return {
        'status': 'error',
        "error": {
            "message": "Unknown action"
        }}, 404
