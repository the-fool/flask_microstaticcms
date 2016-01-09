from flask import Blueprint, render_template, flash, redirect, url_for
from flask.ext.login import login_required, login_user, logout_user, current_user
from . import admin
from .forms import LoginForm
from app.models import User

@admin.route('/')
@login_required
def cpanel():
    return render_template('admin.html')


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

