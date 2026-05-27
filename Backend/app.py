from flask import Flask
from models import db
from routes import bp
from flask_cors import CORS

app = Flask(__name__)

# Where to put database file
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///budgetbuddy.db'

db.init_app(app)
CORS(app, origins=['https://budgetbuddyapp-jv2.netlify.app', 'http://localhost:5173'])

app.register_blueprint(bp)

with app.app_context():
    db.create_all()

@app.route('/')
def hello():
    return 'Budget Buddy is alive!'

if __name__ == '__main__':
    app.run(debug=True)