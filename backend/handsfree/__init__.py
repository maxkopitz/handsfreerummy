"""Handsfree Rummy Backend"""
from flask import Flask
from flask_socketio import SocketIO
from flask_redis import FlaskRedis
from flask_session import Session
from flask_cors import CORS


app = Flask(__name__)

app.config.from_object('handsfree.config')
redis_client = FlaskRedis(app)

sess = Session()
sess.init_app(app)

CORS(app,
     supports_credentials=True,
     resources={r"/*": {"origins": app.config['CLIENT_URL']}})

socketio = SocketIO(
    app,
    manage_session=False,
    cors_allowed_origins=app.config['CLIENT_URL'])

# EXAMPLE:
# $ export HANDSFREE_SETTINGS=secret_key_config.py
# DEFINED IN COMPOSE FILE
app.config.from_envvar('HANDSFREE_SETTINGS', silent=True)

from handsfree.api import sockets  # noqa: E402  pylint: disable=wrong-import-position
from handsfree.api import routes  # noqa: E402  pylint: disable=wrong-import-position

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=4000)
