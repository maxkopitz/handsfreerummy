"""Root index routes."""
from handsfree import redis_client, app
from flask import session, Blueprint
from uuid import uuid4


index_blueprint = Blueprint('index',  __name__)


@index_blueprint.route('/', methods=['GET'])
def index():
    return {"version": "v1.0.0-omega"}


@index_blueprint.route('/register/', methods=['GET'])
def register():
    """Register a user and direct them."""
    app.logger.info("User requesting to register, UUID: %s",
                    session.get('uuid'))
    response = {
        "status": "success",
        "redirect": "/"
    }
    if session.get('uuid') is None:
        session['uuid'] = uuid4()
        app.logger.info("User assigned UUID: %s",
                        str(session.get('uuid')))
        return response

    if session.get('game_id') is not None:
        game_id = session.get('game_id')
        game_key = f"game:{game_id}"
        game = redis_client.json().get(game_key)
        if game.get('gameState') != 'ended':
            response["redirect"] = f"games/{game_id}/"
    return response
