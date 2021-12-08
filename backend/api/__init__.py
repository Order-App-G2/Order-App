from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = '0fed4204af728cc75af855673b710ce4'

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///orders.db' //for testing
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:11332255@localhost/Orders'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
cors = CORS(app, resource={
    r"/*": {
        "origins": "*"
    }
})
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from api import routes
