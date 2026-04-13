from flask import Flask
from Backend.models import db

app = Flask(__name__)

# Where to put database file
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///budgetbuddy.db'



db.init_app(app)


with app.app_context():
    db.create_all()

@app.route('/')
def hello():
    return 'Budget Buddy is alive!'

if __name__ == '__main__':
    app.run(debug=True)