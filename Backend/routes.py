from flask import Blueprint, request, jsonify
from models import db, Category

bp = Blueprint('bp', __name__ )

#GET/ categories
@bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{ 'id': c.id, 'name': c.name, 'type': c.type } for c in categories])
