from handsfree import app
from handsfree.api.sockets import *
from handsfree.api.game import game_blueprint
from handsfree.api.index import index_blueprint


def initiate_app(app, **kwargs):
    app.register_blueprint(game_blueprint, url_prefix='/api/v1/games')
    app.register_blueprint(index_blueprint, url_prefix='/api/v1/')
