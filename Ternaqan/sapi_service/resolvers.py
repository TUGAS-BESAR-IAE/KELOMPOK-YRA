from ariadne import QueryType, MutationType
from database import get_db_connection

query = QueryType()
mutation = MutationType()

# GET ALL SAPI
@query.field("sapis")
def resolve_sapis(_, info):
    conn = get_db_connection()
    sapis = conn.execute("SELECT * FROM sapi").fetchall()
    conn.close()
    return [dict(row) for row in sapis]

# UPDATE DATA SAPI
@mutation.field("updateSapi")
def resolve_update_sapi(_, info, id, umur=None, berat=None, stok=None, harga=None):
    conn = get_db_connection()
    cur = conn.cursor()
    sapi = cur.execute("SELECT * FROM sapi WHERE id = ?", (id,)).fetchone()
    if not sapi:
        conn.close()
        return None
    updated_umur = umur if umur is not None else sapi["umur"]
    updated_berat = berat if berat is not None else sapi["berat"]
    updated_stok = stok if stok is not None else sapi["stok"]
    updated_harga = harga if harga is not None else sapi["harga"]
    cur.execute(
        "UPDATE sapi SET umur=?, berat=?, stok=?, harga=? WHERE id=?",
        (updated_umur, updated_berat, updated_stok, updated_harga, id)
    )
    conn.commit()
    updated_sapi = cur.execute("SELECT * FROM sapi WHERE id = ?", (id,)).fetchone()
    conn.close()
    return dict(updated_sapi)

# GET SAPI BY ID
@query.field("sapi")
def resolve_sapi(_, info, id):
    conn = get_db_connection()
    sapi = conn.execute("SELECT * FROM sapi WHERE id = ?", (id,)).fetchone()
    conn.close()
    return dict(sapi) if sapi else None

# CREATE SAPI
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

# DELETE SAPI
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