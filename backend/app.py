from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    name: str
    email: str
    role: str
    bio: str
    company: str
    website: str

def load_users():
    with open("backend/users.json", "r") as file:
        return json.load(file)

def save_users(users):
    with open("backend/users.json", "w") as file:
        json.dump(users, file, indent=4)

@app.get("/users")
def get_users():
    return load_users()

@app.get("/users/{user_id}")
def get_user(user_id: int):
    users = load_users()

    user = next((u for u in users if u["id"] == user_id), None)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

@app.post("/users")
def add_user(user: User):
    users = load_users()

    new_user = {
        "id": len(users) + 1,
        **user.dict()
    }

    users.append(new_user)
    save_users(users)

    return new_user