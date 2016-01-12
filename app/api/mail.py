from flask import Blueprint, request, Response
from flask.ext.mail import Message

from app.factory import mail

bp = Blueprint('mail', __name__, url_prefix='/mail')

@bp.route('/contact_me', methods=['POST'])
def contact_me():
    d = {}
    for x in ['name','email','phone','message','email']:
        if not request.form[x]:
            return Response(400)
        d[x] = request.form[x]
        
    subject = 'Montana Tire: ' + d['name']
    body = 'You have a new message form MTW: \n\n'
    body += 'Name: {}\n'.format(d['name'])
    body += 'Email: {}\n'.format(d['email'])
    body += 'Phone: {}\n\n'.format(d['phone'])
    body += 'Message: {}\n'.format(d['message'])
    
    msg = Message(subject=subject, 
                  body=body,
                  sender="bob@montanatireandwheel.com", 
                  recipients=['sketchbang@gmail.com'])
    try:
        mail.send(msg)
    except:
        return Response(503)
    
    return Response(200)