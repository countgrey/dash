from flask import Flask, request, jsonify
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)


with open("users.json", "r") as f:
    users = json.load(f)

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    user = next((user for user in users if user["username"] == username), None)

    if not user or user["password"] != password:
        return jsonify({"error": "Неверный логин или пароль"}), 401

    return jsonify({"success": True, "user": user}), 200


if __name__ == '__main__':
    app.run(debug=True)