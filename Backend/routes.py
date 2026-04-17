from flask import Blueprint, request, jsonify
from models import db, Category, Transaction

bp = Blueprint('bp', __name__ )

#GET/ categories
@bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{ 'id': c.id, 'name': c.name, 'type': c.type } for c in categories])

#POST/
@bp.route('/categories', methods = ['POST'])
def add_category():
    data = request.get_json()
    category = Category(name=data['name'], type=data['type'])
    db.session.add(category)
    db.session.commit()
    return jsonify({ 'id': category.id, 'name': category.name, 'type': category.type }), 

#DELETE
@bp.route('/categories/<int:id>', methods=['DELETE'])
def delete_category(id):    
    category = Category.query.get_or_404(id)
    db.session.delete(category)
    db.session.commit()
    return jsonify({'message': 'Deleted'}), 200
