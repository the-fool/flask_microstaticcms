from flask import url_for
from flask.ext.script import Manager, Shell
from flask.ext.migrate import Migrate, MigrateCommand

from werkzeug.wsgi import DispatcherMiddleware
from werkzeug.serving import run_simple

from app.database import db_session as sess, Base
from app import api
from app.models import *

#app = DispatcherMiddleware(frontend.create_app(), {'/api': api.create_app()})

app = api.create_app()

migrate = Migrate(app, Base)
manager = Manager(app)

def make_shell_context():
    return dict(app=app,
                User=User,
                Tire=Tire,
                sess=sess)

manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

@manager.command
def list_routes():
    import urllib
    output = []
    for rule in app.url_map.iter_rules():

        options = {}
        for arg in rule.arguments:
            options[arg] = "[{0}]".format(arg)
            
        methods = ','.join(rule.methods)
        url = url_for(rule.endpoint, **options)
        line = urllib.unquote("{:50s} {:20s} {}".format(rule.endpoint, methods, url))
        output.append(line)

    for line in sorted(output):
        print line

@manager.command
def add_user():
    from app.settings import DEFAULT_USER
    u = User(**DEFAULT_USER)
    sess.add(u)
    sess.commit()
    
if __name__=='__main__':
    manager.run()






       
