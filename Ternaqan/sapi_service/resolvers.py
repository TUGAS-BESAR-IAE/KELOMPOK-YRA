from ariadne import QueryType, MutationType
from database import get_db_connection

query = QueryType()
mutation = MutationType()

@query.field("sapis")
def resolve_sapis(_, info):
    conn = get_db_connection()
    sapis = conn.execute("SELECT * FROM sapi").fetchall()
    conn.close()
    return [dict(row) for row in sapis]

@query.field("sapi")
def resolve_sapi(_, info, id):
    conn = get_db_connection()
    sapi = conn.execute("SELECT * FROM sapi WHERE id = ?", (id,)).fetchone()
    conn.close()
    return dict(sapi) if sapi else None

@mutation.field("createSapi")
def resolve_create_sapi(_, info, umur=None, berat=None, stok=None, harga=None):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO sapi (umur, berat, stok, harga) VALUES (?, ?, ?, ?)",
        (umur, berat, stok, harga)
    )
    conn.commit()
    sapi_id = cur.lastrowid
    sapi = conn.execute("SELECT * FROM sapi WHERE id = ?", (sapi_id,)).fetchone()
    conn.close()
    return dict(sapi)

@mutation.field("deleteSapi")
def resolve_delete_sapi(_, info, id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM sapi WHERE id = ?", (id,))
    conn.commit()
    deleted = cur.rowcount > 0
    conn.close()
    return deleted

resolvers = [query, mutation]