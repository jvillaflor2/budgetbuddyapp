from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Where to put database file
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///budgetbuddy.db'


db = SQLAlchemy(app)

# Categorry table
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(10), nullable=False) 


# Transaction table
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    note = db.Column(db.String(200))


with app.app_context():
    db.create_all()

@app.route('/')
def hello():
    return 'Budget Buddy is alive!'

if __name__ == '__main__':
    app.run(debug=True)