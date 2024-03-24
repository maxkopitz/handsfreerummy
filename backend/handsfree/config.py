"""Backend configuration"""
import os
import redis

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'
SESSION_COOKIE_NAME = 'login-session'
CLIENT_URL = 'http://localhost:3000'
SESSION_SERIALIZATION_FORMAT = 'json'
REDIS_URL = os.getenv('REDIS_URL')
SESSION_TYPE = 'redis'
SESSION_REDIS = redis.from_url(REDIS_URL)
