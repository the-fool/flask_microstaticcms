from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask.ext.login import login_required, login_user, logout_user, current_user
from . import admin
from .forms import LoginForm, NewTireForm
from app.models import User, Tire
from app.database import db_session as sess

@admin.route('/', methods=['GET', 'POST'])
@login_required
def cpanel():
    form = NewTireForm()
    if form.validate_on_submit():
        print form.image.data
        tire = Tire(name = form.name.data,
                   price = form.price.data,
                   size = form.size.data,
                   image = form.image.data,
                   status = Tire.Status.available.name,
                   description = form.description.data)
        sess.add(tire)
        sess.commit()
        flash('Added {0}'.format(form.name.data))
        return redirect(url_for('.cpanel'))
    elif request.method == 'POST':
        flash(form.errors)
    return render_template('admin.html', form=form)


@admin.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        print user
        if user is not None and user.verify_password(form.password.data):
            login_user(user)
            return redirect(url_for('.cpanel'))
        flash('Invalid username or password. Or both.')
    return render_template('login.html', form=form)
 
    
@admin.route('/logout')
def logout():
    logout_user()
    flash('You have been logged out.')
    return redirect(url_for('main.index'))

