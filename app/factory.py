from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.bootstrap import Bootstrap
from flask.ext.login import LoginManager

from .helpers import register_blueprints

db = SQLAlchemy()
bs = Bootstrap()
lm = LoginManager()
lm.login_view = 'admin.login'

def create_app(package_name, package_path, settings_override=None,
               register_security_blueprint=True):

    app = Flask(package_name)

    app.config.from_object('app.settings')
    app.config.from_pyfile('settings.cfg', silent=True)
    app.config.from_object(settings_override)
    
    db.init_app(app)
    bs.init_app(app)
    lm.init_app(app)
    
    register_blueprints(app, package_name, package_path)
    
    return app
