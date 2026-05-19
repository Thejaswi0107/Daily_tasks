from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db
from models import (
    get_all_users,
    get_user_by_id,
    create_user,
    update_user,
    delete_user
)

app = Flask(__name__)
CORS(app)

init_db()


def validate_user(data):
    required_fields = ["name", "email", "role"]

    for field in required_fields:
        if field not in data or not data[field].strip():
            return f"{field} is required"

    return None


@app.route("/users", methods=["GET"])
def fetch_users():
    users = get_all_users()
    return jsonify(users), 200


@app.route("/users/<int:user_id>", methods=["GET"])
def fetch_user(user_id):
    user = get_user_by_id(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user), 200


@app.route("/users", methods=["POST"])
def add_user():
    try:
        data = request.json

        error = validate_user(data)
        if error:
            return jsonify({"error": error}), 400

        user = create_user(data)
        return jsonify(user), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/users/<int:user_id>", methods=["PUT"])
def edit_user(user_id):
    try:
        existing_user = get_user_by_id(user_id)

        if not existing_user:
            return jsonify({"error": "User not found"}), 404

        data = request.json

        error = validate_user(data)
        if error:
            return jsonify({"error": error}), 400

        updated_user = update_user(user_id, data)
        return jsonify(updated_user), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/users/<int:user_id>", methods=["DELETE"])
def remove_user(user_id):
    try:
        existing_user = get_user_by_id(user_id)

        if not existing_user:
            return jsonify({"error": "User not found"}), 404

        delete_user(user_id)

        return jsonify({
            "message": "User deleted successfully"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)