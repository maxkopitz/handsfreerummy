"""Backend configuration"""
import os
import redis

# Root of this application, useful if it doesn't occupy an entire domain


class BaseConfig:
    APPLICATION_ROOT = '/'
    SESSION_COOKIE_NAME = 'login-session'
    CLIENT_URL = 'http://localhost:3000'
    REDIS_URL = os.getenv('REDIS_URL')
    SESSION_TYPE = 'redis'
    SESSION_REDIS = redis.from_url(REDIS_URL)
    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
    SECRET_KEY = os.environ.get('SECRET_KEY')


class DevelopmentConfig(BaseConfig):
    SESSION_SERIALIZATION_FORMAT = 'json'


class TestingConfig(BaseConfig):
    SESSION_SERIALIZATION_FORMAT = 'json'


class ProductionConfig(BaseConfig):
    SESSION_SERIALIZATION_FORMAT = 'msgspec'
