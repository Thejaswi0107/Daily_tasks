from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import json

app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Validation model
class User(BaseModel):
    name: str
    email: EmailStr
    role: str
    bio: str
    company: str
    website: str

# Load JSON data
def load_users():
    with open("backend/users.json", "r") as file:
        return json.load(file)

# Save JSON data
def save_users(users):
    with open("backend/users.json", "w") as file:
        json.dump(users, file, indent=4)

# GET all users
@app.get("/users")
def get_users(search: str = None, role: str = None):
    users = load_users()

    if search:
        users = [
            user for user in users
            if search.lower() in user["name"].lower()
        ]

    if role:
        users = [
            user for user in users
            if user["role"].lower() == role.lower()
        ]

    return users

# GET single user
@app.get("/users/{user_id}")
def get_user(user_id: int):
    users = load_users()

    user = next((u for u in users if u["id"] == user_id), None)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

# POST add user
@app.post("/users")
def add_user(user: User):
    users = load_users()

    new_user = {
        "id": len(users) + 1,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "bio": user.bio,
        "company": user.company,
        "website": user.website
    }

    users.append(new_user)
    save_users(users)

    return {
        "message": "User added successfully",
        "user": new_user
    }

# PUT update user
@app.put("/users/{user_id}")
def update_user(user_id: int, updated_user: User):
    users = load_users()

    for index, user in enumerate(users):
        if user["id"] == user_id:
            users[index] = {
                "id": user_id,
                "name": updated_user.name,
                "email": updated_user.email,
                "role": updated_user.role,
                "bio": updated_user.bio,
                "company": updated_user.company,
                "website": updated_user.website
            }

            save_users(users)

            return {
                "message": "User updated successfully",
                "user": users[index]
            }

    raise HTTPException(status_code=404, detail="User not found")

# DELETE user
@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    users = load_users()

    user = next((u for u in users if u["id"] == user_id), None)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    users = [u for u in users if u["id"] != user_id]

    save_users(users)

    return {"message": "User deleted successfully"}