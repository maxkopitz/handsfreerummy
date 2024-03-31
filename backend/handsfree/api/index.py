"""Root index routes."""
from handsfree import redis_client
from flask import session, Blueprint
from uuid import uuid4


index_blueprint = Blueprint('index',  __name__)


@index_blueprint.route('/', methods=['GET'])
def index():
    return {"version": "v1.0.0-beta"}


@index_blueprint.route('/register/', methods=['GET'])
def register():
    """Register a user and direct them."""
    response = {
        "status": "success",
        "redirect": "/"
    }
    if session.get('uuid') is None:
        session['uuid'] = uuid4()
        return response

    if session.get('game_id') is not None:
        game_id = session.get('game_id')
        game_key = f"game:{game_id}"
        game = redis_client.json().get(game_key)
        if game.get('gameState') != 'ended':
            response["redirect"] = f"games/{game_id}/"
    return response
