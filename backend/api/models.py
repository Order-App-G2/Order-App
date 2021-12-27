from api import db
from datetime import datetime


class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    phoneNumber = db.Column(db.String(255), nullable=False)

    order_id = db.relationship('Order', backref='order_customer', lazy=True)

    def __init__(self, public_id, email, username, password, address, phoneNumber):
        self.public_id = public_id
        self.email = email
        self.username = username
        self.password = password
        self.address = address
        self.phoneNumber = phoneNumber


class Partner(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(255), unique=True)
    username = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255), nullable=False)

    products = db.relationship('Product', backref='owner', lazy=True)

    def __init__(self, public_id, email, username, password):
        self.public_id = public_id
        self.email = email
        self.username = username
        self.password = password


class Courier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(255), unique=True)
    username = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255), nullable=False)
    available = db.Column(db.Boolean, default=True)

    order_num = db.relationship('Order', backref='owner', lazy=True)

    def __init__(self, public_id, email, username, password):
        self.public_id = public_id
        self.email = email
        self.username = username
        self.password = password


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)

    partner_id = db.Column(db.String(255), db.ForeignKey('partner.public_id'), nullable=False)
    product_category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    product_order_item = db.relationship('Order_products', backref='items', lazy=True)

    def __init__(self, title, content, price, user_id, product_category_id):
        self.title = title
        self.content = content
        self.price = price
        self.partner_id = user_id
        self.product_category_id = product_category_id


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    category_product = db.relationship('Product', backref='category', lazy=True)

    def __init__(self, name):
        self.name = name


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    Order_status = db.Column(db.Integer, db.ForeignKey('status.id'), nullable=False, default=1)
    Partner_id = db.Column(db.String(255), db.ForeignKey('partner.public_id'), nullable=False, default=1)
    customer_id = db.Column(db.String(255), db.ForeignKey('customer.public_id'), nullable=False)
    courier = db.Column(db.Integer, db.ForeignKey('courier.id'))

    order_products_item = db.relationship('Order_products', backref='orders', lazy=True)

    def __init__(self, partner_id, customer_id):
        self.Partner_id = partner_id
        self.customer_id = customer_id


class Order_products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    quantity = db.Column(db.Integer)

    item = db.relationship('Product')
    order = db.relationship('Order')

    def __init__(self, product_id, order_id, quantity):
        self.product_id = product_id
        self.order_id = order_id
        self.quantity = quantity


class Status(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_status = db.Column(db.String(255), nullable=False)

    status_order = db.relationship('Order', backref='order', lazy=True)
