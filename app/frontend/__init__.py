"""
Frontend package
"""

from flask import render_template
from flask.ext.login import login_required

#from index import index
#from import admin

from . import assets
from .. import factory


def create_app(settings_override=None):
    app = factory.create_app(__name__, __path__, settings_override)
    assets.init_app(app)
    return app

