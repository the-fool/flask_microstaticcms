from flask_assets import Environment

def init_app(app):
    webassets = Environment(app)
    webassets.debug = app.debug
    
