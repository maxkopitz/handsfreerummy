"""Handsfree Rummy Backend"""
from flask import Flask
from flask_socketio import SocketIO
from flask_redis import FlaskRedis
from flask_session import Session
from flask_cors import CORS
import os

app = Flask(__name__)

env_flask_config_name = os.getenv('APP_SETTINGS')
app.config.from_object(env_flask_config_name)
redis_client = FlaskRedis(app)

sess = Session()
sess.init_app(app)

CORS(app,
     supports_credentials=True,
     resources={r"/*": {"origins": app.config['CLIENT_URL']}})

socketio = SocketIO(
    app,
    message_queue=app.config.get("REDIS"),
    manage_session=False,
    cors_allowed_origins=app.config['CLIENT_URL'])


from handsfree.api import sockets  # noqa: E402  pylint: disable=wrong-import-position
from handsfree.api import initiate_app  # noqa: E402 pylint: disable=wrong-import-position
initiate_app(app)

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=4000)
