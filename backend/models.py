from database import get_connection


def get_all_users():
    conn = get_connection()
    users = conn.execute("SELECT * FROM users").fetchall()
    conn.close()
    return [dict(user) for user in users]


def get_user_by_id(user_id):
    conn = get_connection()
    user = conn.execute(
        "SELECT * FROM users WHERE id = ?",
        (user_id,)
    ).fetchone()
    conn.close()

    if user:
        return dict(user)
    return None


def create_user(data):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO users (name, email, role, bio, company, website)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        data["name"],
        data["email"],
        data["role"],
        data.get("bio", ""),
        data.get("company", ""),
        data.get("website", "")
    ))

    conn.commit()
    new_id = cursor.lastrowid
    conn.close()

    return get_user_by_id(new_id)


def update_user(user_id, data):
    conn = get_connection()

    conn.execute("""
        UPDATE users
        SET name = ?, email = ?, role = ?, bio = ?, company = ?, website = ?
        WHERE id = ?
    """, (
        data["name"],
        data["email"],
        data["role"],
        data.get("bio", ""),
        data.get("company", ""),
        data.get("website", ""),
        user_id
    ))

    conn.commit()
    conn.close()

    return get_user_by_id(user_id)


def delete_user(user_id):
    conn = get_connection()

    conn.execute(
        "DELETE FROM users WHERE id = ?",
        (user_id,)
    )

    conn.commit()
    conn.close()