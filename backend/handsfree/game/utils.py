from handsfree import redis_client
from redis.commands.json.path import Path
from redis.commands.search.field import TextField, NumericField, TagField
from redis.commands.search.indexDefinition import IndexDefinition, IndexType
from redis.commands.search.query import NumericFilter, Query
from flask import session

KEY_INDEX = 'games_index'


def create_game():
    """Create Rummy Game."""
    redis_client.incr(KEY_INDEX, 1)
    index = int(redis_client.get(KEY_INDEX).decode('utf-8'))

    game = {
        "game": {
            "game_id": index,
            "owner": str(session.get('uuid')),
            "max_players": 4,
            "players": [],
            "turn_counter": 0,
            "melds": [],
            "game_state": "lobby"
        }
    }

    # Update user session, assuming this is handled
    session["game_id"] = index
    redis_client.json().set("game:%d" % index, Path.root_path(), game)
    return game


def join_game(game_id):
    """Join Rummy Game."""
    game = redis_client.json().get("game:%d" % game_id)
    game["players"].append({
        "uuid": "",
        "sid": "",
        "hand": []
    })
    redis_client.json().set("game:%d" % game_id, Path.root_path(), game)
    return game


def redis_schema():
    """Init redis schema."""
    schema = (TextField("$.user.name", as_name="name"), TagField(
        "$.user.city", as_name="city"), NumericField("$.user.age", as_name="age"))
    redis_client.ft().create_index(schema, definition=IndexDefinition(
        prefix=["user:"], index_type=IndexType.JSON))
