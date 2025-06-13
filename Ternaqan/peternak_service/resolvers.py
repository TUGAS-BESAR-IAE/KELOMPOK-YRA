from ariadne import QueryType, MutationType
from database import get_db_connection

query = QueryType()
mutation = MutationType()

@query.field("peternaks")
def resolve_peternaks(_, info):
    conn = get_db_connection()
    peternaks = conn.execute("SELECT * FROM peternaks").fetchall()
    conn.close()
    return [dict(row) for row in peternaks]

@query.field("peternak")
def resolve_peternak(_, info, id):
    conn = get_db_connection()
    peternak = conn.execute("SELECT * FROM peternaks WHERE id = ?", (id,)).fetchone()
    conn.close()
    return dict(peternak) if peternak else None

@mutation.field("createPeternak")
def resolve_create_peternak(_, info, nama=None, alamat=None, nohp=None, username=None):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO peternaks (nama, alamat, nohp, username) VALUES (?, ?, ?, ?)",
        (nama, alamat, nohp, username)
    )
    conn.commit()
    peternak_id = cur.lastrowid
    peternak = conn.execute("SELECT * FROM peternaks WHERE id = ?", (peternak_id,)).fetchone()
    conn.close()
    return dict(peternak)

@mutation.field("updatePeternak")
def resolve_update_peternak(_, info, id, nama=None, alamat=None, nohp=None, username=None):
    conn = get_db_connection()
    cur = conn.cursor()
    peternak = cur.execute("SELECT * FROM peternaks WHERE id = ?", (id,)).fetchone()
    if not peternak:
        conn.close()
        return None
    updated_nama = nama if nama is not None else peternak["nama"]
    updated_alamat = alamat if alamat is not None else peternak["alamat"]
    updated_nohp = nohp if nohp is not None else peternak["nohp"]
    updated_username = username if username is not None else peternak["username"]
    cur.execute(
        "UPDATE peternaks SET nama=?, alamat=?, nohp=?, username=? WHERE id=?",
        (updated_nama, updated_alamat, updated_nohp, updated_username, id)
    )
    conn.commit()
    updated_peternak = cur.execute("SELECT * FROM peternaks WHERE id = ?", (id,)).fetchone()
    conn.close()
    return dict(updated_peternak)

@mutation.field("deletePeternak")
def resolve_delete_peternak(_, info, id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM peternaks WHERE id = ?", (id,))
    conn.commit()
    deleted = cur.rowcount > 0
    conn.close()
    return deleted

resolvers = [query, mutation]