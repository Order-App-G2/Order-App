from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

app = Flask(__name__)

app.config['SECRET_KEY'] = '0fed4204af728cc75af855673b710ce4'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///orders.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(50), nullable=False)
    admin = db.Column(db.Boolean)

    def __init__(self, public_id, email,  username, password, admin):
        self.public_id = public_id
        self.email = email
        self.username = username
        self.password = password
        self.admin = admin

    def __repr__(self):
        pass


# create non admin user
@app.route('/createUser', methods=['POST'])
def create_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    username = data['username']
    password = data['password']
    email = data['email']

    new_user = User(public_id=str(uuid.uuid4()),email=email, username=username, password=hashed_password, admin=False)

    if not username or not password:
        return jsonify({"message": "parameter must be filled"}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'username is already taken '}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'email is already taken '}), 400
    else:
        db.session.add(new_user)
        db.session.commit()

    return jsonify({'message': 'new user has been created'})


# create admin account
@app.route('/createAdmin', methods=['POST'])
def create_admin():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    username = data['username']
    password = data['password']
    email = data['email']

    new_user = User(public_id=str(uuid.uuid4()), email=email, username=username, password=hashed_password, admin=True)
    if not username or not password:
        return jsonify({"message": "parameter must be filled"}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'username is already taken '}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'email is already taken '}), 400
    else:
        db.session.add(new_user)
        db.session.commit()

    return jsonify({'message': 'new admin has been created'})


# get all users
@app.route('/user', methods=['GET'])
def get_all_users():

    users = User.query.all()
    output = []
    for user in users:
        user_data = {'public_id': user.public_id, 'name': user.username, 'password': user.password, 'admin': user.admin}
        output.append(user_data)

    return jsonify({'users': output})


@app.route('/user/<public_id>', methods=['GET'])
def get_one_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'no user found '})

    user_data = {'public_id': user.public_id, 'name': user.username, 'password': user.password, 'admin': user.admin}
    return jsonify({'user': user_data})


# delete user
@app.route('/user/<public_id>', methods=['DELETE'])
def delete_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'user has been deleted'})


# edit user info
@app.route('/user', methods=['PUT'])
def edit_user():
    pass


@app.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Not verified', 401, {'WWW-Authenticate': ' Basic realm="Login required!" '})

    user = User.query.filter_by(name=auth.username).first()

    if not user:
        return make_response('Not verified', 401, {'WWW-Authenticate': ' Basic realm="Login required!" '})

    if check_password_hash(user.password, auth.password):
        exp = datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
        token = jwt.encode({'public_id': user.public_id, 'exp': exp}, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'token': token})

    return make_response('Not verified', 401, {'WWW-Authenticate': ' Basic realm="Login required!" '})



if __name__ == '__main__':
    app.run(debug=True)
