from ariadne import QueryType, MutationType
from database import get_db_connection

query = QueryType()
mutation = MutationType()

@query.field("admins")
def resolve_admins(_, info):
    conn = get_db_connection()
    admins = conn.execute("SELECT * FROM admins").fetchall()
    conn.close()
    return [dict(row) for row in admins]

@query.field("admin")
def resolve_admin(_, info, id):
    conn = get_db_connection()
    admin = conn.execute("SELECT * FROM admins WHERE id = ?", (id,)).fetchone()
    conn.close()
    return dict(admin) if admin else None

@mutation.field("createAdmin")
def resolve_create_admin(_, info, transaction_id=None, nama=None, alamat=None, nohp=None, username=None):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO admins (transaction_id, nama, alamat, nohp, username) VALUES (?, ?, ?, ?, ?)",
        (transaction_id, nama, alamat, nohp, username)
    )
    conn.commit()
    admin_id = cur.lastrowid
    admin = conn.execute("SELECT * FROM admins WHERE id = ?", (admin_id,)).fetchone()
    conn.close()
    return dict(admin)

@mutation.field("deleteAdmin")
def resolve_delete_admin(_, info, id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM admins WHERE id = ?", (id,))
    conn.commit()
    deleted = cur.rowcount > 0
    conn.close()
    return deleted

resolvers = [query, mutation]