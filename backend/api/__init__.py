from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_mail import Mail, Message

app = Flask(__name__)
app.config['SECRET_KEY'] = '0fed4204af728cc75af855673b710ce4'

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///orders.db' //for testing
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ilagbidkhtth@localhost/Orders'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
cors = CORS(app, resource={
    r"/*": {
        "origins": "*"
    }
})
db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.config['RECAPTCHA_ENABLED'] = True
app.config['RECAPTCHA_SITE_KEY'] = '6LcHrMwdAAAAAFKVQ5pBwMZx28GPNN7oJue2i05s'
app.config['RECAPTCHA_SECRET_KEY'] = '6LcHrMwdAAAAADkawlzMYvgM0WyhbmOVmmUO9CCI'

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'order.app12@gmail.com'
app.config['MAIL_PASSWORD'] = 'ytfzmtgtscmqzdbv'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

RECAPTCHA_SECRET_KEY = '6LcHrMwdAAAAADkawlzMYvgM0WyhbmOVmmUO9CCI'

from api import routes
