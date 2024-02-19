"""Handsfree Rummy Backend"""
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object('handsfree.config')
CORS(app, supports_credentials=True, resources={r"/*": {"origins": app.config['CLIENT_URL']}})

socketio = SocketIO(
        app,
        manage_session=False,
        cors_allowed_origins=app.config['CLIENT_URL'])
# Read settings from config module (handsfree/config.py)

# Overlay settings read from a Python file whose path is set in the environment
# variable INSTA485_SETTINGS. Setting this environment variable is optional.
# Docs: http://flask.pocoo.org/docs/latest/config/
#
# EXAMPLE:
# $ export HANDSFREE_SETTINGS=secret_key_config.py
app.config.from_envvar('HANDSFREE_SETTINGS', silent=True)

from handsfree.api import sockets # noqa: E402  pylint: disable=wrong-import-position
from handsfree.api import routes # noqa: E402  pylint: disable=wrong-import-position

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=4000)
