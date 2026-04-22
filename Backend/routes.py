from flask import Blueprint, request, jsonify
from models import db, Category, Transaction

bp = Blueprint('bp', __name__ )

#GET/ categories
@bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{ 'id': c.id, 'name': c.name, 'type': c.type } for c in categories])

#POST/ categories
@bp.route('/categories', methods = ['POST'])
def add_category():
    data = request.get_json()
    category = Category(name=data['name'], type=data['type'])
    db.session.add(category)
    db.session.commit()
    return jsonify({ 'id': category.id, 'name': category.name, 'type': category.type }) 

#DELETE/ categories
@bp.route('/categories/<int:id>', methods=['DELETE'])
def delete_category(id):    
    category = Category.query.get_or_404(id)
    db.session.delete(category)
    db.session.commit()
    return jsonify({'message': 'Deleted'}), 200

#GET /transactions
@bp.route('/transactions', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.all()
    return jsonify([{
        'id': t.id,
        'amount': t.amount,
        'category_id': t.category_id,
        'date': t.date,
        'note': t.note
    } for t in transactions])

#POST /transactions
@bp.route('/transactions', methods=['POST'])
def add_transaction():
    data = request.get_json()
    transaction = Transaction(
        amount=data['amount'],
        category_id=data['category_id'],
        date=data['date'],
        note=data.get('note', '')
    )
    db.session.add(transaction)
    db.session.commit()
    return jsonify({
        'id': transaction.id,
        'amount': transaction.amount,
        'category_id': transaction.category_id,
        'date': transaction.date,
        'note': transaction.note
    }), 201

#DELETE /transactions
@bp.route('/transactions/<int:id>', methods=['DELETE'])
def delete_transaction(id):
    transaction = Transaction.query.get_or_404(id)
    db.session.delete(transaction)
    db.session.commit()
    return jsonify({'message': 'Deleted'}), 200