"""Backend configuration"""
import os
import redis
import sys


class BaseConfig:
    """Base Config."""
    APPLICATION_ROOT = '/'
    SESSION_COOKIE_NAME = 'login-session'
    CLIENT_URL = 'http://localhost:3000'
    REDIS_URL = os.getenv('REDIS_URL')
    SESSION_SERIALIZATION_FORMAT = 'json'
    REDIS_URL = os.getenv('REDIS_URL')
    SESSION_TYPE = 'redis'
    SESSION_REDIS = redis.from_url(REDIS_URL)
    SECRET_KEY = os.environ.get('SECRET_KEY')


class DevelopmentConfig(BaseConfig):
    """Development Config."""
    SESSION_SERIALIZATION_FORMAT = 'json'
    REDIS_URL = os.getenv('REDIS_URL')
    SESSION_SERIALIZATION_FORMAT = 'json'
    REDIS_URL = os.getenv('REDIS_URL')
    SESSION_TYPE = 'redis'
    SESSION_REDIS = redis.from_url(REDIS_URL)
    SECRET_KEY = os.environ.get('SECRET_KEY')


class TestingConfig(BaseConfig):
    """Testing Config."""
    SESSION_SERIALIZATION_FORMAT = 'json'


class ProductionConfig(BaseConfig):
    """Production Config"""
    SESSION_SERIALIZATION_FORMAT = 'msgspec'
