from handsfree import redis_client, socketio
from redis.commands.json.path import Path
from flask import session
from random import shuffle

GAME_KEY_INDEX = 'games_index'
ACTIVE_GAMES = 'active_games'
suits = ["hearts", "diamonds", "clubs", "spades"]
values = ["A", "2", "3", "4", "5", "6", "7", "8",
          "9", "10", "J", "Q", "K"]


def get_game(game_id):
    """Get a Rummy game."""
    game_id = int(game_id)
    game = redis_client.json().get("game:%d" % game_id)
    return game


def get_active_games():
    game_ids = redis_client.smembers(ACTIVE_GAMES)

    # Fetch each game by its ID
    games = []
    for game_id in game_ids:
        game_data = redis_client.json().get(
            f"game:{game_id.decode('utf-8')}", Path.root_path())
        if game_data:
            games.append(game_data)
    return games


def create_game():
    """Create Rummy Game."""
    redis_client.incr(GAME_KEY_INDEX, 1)
    index = int(redis_client.get(GAME_KEY_INDEX).decode('utf-8'))

    deck = []
    for suit in suits:
        for value in values:
            deck.append({"value": value, "suite": suit})
    shuffle(deck)
    game = {
        "gameId": index,
        "owner": str(session.get('uuid')),
        "maxPlayers": 4,
        "players": {},
        "turnCounter": 0,
        "melds": [],
        "gameState": "lobby",
        "deck": deck,
    }

    redis_client.json().set("game:%d" % index, Path.root_path(), game)
    redis_client.sadd(ACTIVE_GAMES, index)

    return game


def join_game(game_id):
    """Join Rummy Game."""
    game_id = int(game_id)
    game = redis_client.json().get("game:%d" % game_id)

    # Calling method needs to ensure game_id is not being overwrote
    session["game_id"] = game_id

    uuid = str(session.get('uuid'))
    game["players"][uuid] = {
        "sid": session.get("sid", None),
        "hand": []
    }
    redis_client.json().set("game:%d" % game_id, Path.root_path(), game)
    return game


def leave_game(game_id):
    """Leave Rummy Game."""
    game_id = int(game_id)
    game = redis_client.json().get("game:%d" % game_id)
    uuid = str(session.get('uuid'))

    del session["game_id"]
    del game["players"][uuid]

    redis_client.json().set("game:%d" % game_id, Path.root_path(), game)
    return game


def start_game(game_id):
    """Start Rummy Game."""
    game_id = int(game_id)
    game = redis_client.json().get("game:%d" % game_id)

    for player in game["players"]:
        for i in range(7):
            game["players"][player]["hand"].append(game["deck"][0])
            game["deck"].pop(0)

    game['gameState'] = 'in-game'
    redis_client.json().set("game:%d" % game_id, Path.root_path(), game)

    for player in game["players"]:
        data = {
                "hand": game["players"][player]["hand"],
                "player_num": 0
                }
    return game
