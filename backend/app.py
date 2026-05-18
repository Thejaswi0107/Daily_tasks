from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Load users from JSON file
def load_users():
    with open("backend/users.json", "r") as file:
        return json.load(file)

# Save users to JSON file
def save_users(users):
    with open("backend/users.json", "w") as file:
        json.dump(users, file, indent=4)

# GET all users
@app.route("/users", methods=["GET"])
def get_users():
    users = load_users()
    return jsonify(users)

# GET single user by ID
@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    users = load_users()

    user = next((u for u in users if u["id"] == user_id), None)

    if user:
        return jsonify(user)

    return jsonify({"error": "User not found"}), 404

# POST new user
@app.route("/users", methods=["POST"])
def add_user():
    data = request.get_json()

    required_fields = [
        "name",
        "email",
        "role",
        "bio",
        "company",
        "website"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    users = load_users()

    new_user = {
        "id": len(users) + 1,
        "name": data["name"],
        "email": data["email"],
        "role": data["role"],
        "bio": data["bio"],
        "company": data["company"],
        "website": data["website"]
    }

    users.append(new_user)
    save_users(users)

    return jsonify(new_user), 201

if __name__ == "__main__":
    app.run(debug=True)