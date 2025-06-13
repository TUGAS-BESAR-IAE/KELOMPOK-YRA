from ariadne import QueryType, MutationType
from database import get_db_connection

query = QueryType()
mutation = MutationType()

# GET ALL PETERNAKS
@query.field("peternaks")
async def resolve_peternaks(_, info):
    database = await get_db_connection()
    peternaks = await database.fetch_all("SELECT * FROM peternaks")
    await database.disconnect()
    return [dict(peternak) for peternak in peternaks]

# GET PETERNAK BY ID
@query.field("peternak")
async def resolve_peternak(_, info, id):
    database = await get_db_connection()
    peternak = await database.fetch_one("SELECT * FROM peternaks WHERE id = :id", {"id": id})
    await database.disconnect()
    return dict(peternak) if peternak else None

# CREATE PETERNAK
@mutation.field("createPeternak")
async def resolve_create_peternak(_, info, nama=None, alamat=None, nohp=None, username=None):
    database = await get_db_connection()
    peternak_id = await database.execute(
        "INSERT INTO peternaks (nama, alamat, nohp, username) VALUES (:nama, :alamat, :nohp, :username) RETURNING id",
        {"nama": nama, "alamat": alamat, "nohp": nohp, "username": username}
    )
    peternak = await database.fetch_one("SELECT * FROM peternaks WHERE id = :id", {"id": peternak_id})
    await database.disconnect()
    return dict(peternak)

# UPDATE PETERNAK
@mutation.field("updatePeternak")
async def resolve_update_peternak(_, info, id, nama=None, alamat=None, nohp=None, username=None):
    database = await get_db_connection()
    peternak = await database.fetch_one("SELECT * FROM peternaks WHERE id = :id", {"id": id})
    if not peternak:
        await database.disconnect()
        return None
    updated_nama = nama if nama is not None else peternak["nama"]
    updated_alamat = alamat if alamat is not None else peternak["alamat"]
    updated_nohp = nohp if nohp is not None else peternak["nohp"]
    updated_username = username if username is not None else peternak["username"]
    await database.execute(
        "UPDATE peternaks SET nama = :nama, alamat = :alamat, nohp = :nohp, username = :username WHERE id = :id",
        {
            "nama": updated_nama,
            "alamat": updated_alamat,
            "nohp": updated_nohp,
            "username": updated_username,
            "id": id
        }
    )
    updated_peternak = await database.fetch_one("SELECT * FROM peternaks WHERE id = :id", {"id": id})
    await database.disconnect()
    return dict(updated_peternak)

# DELETE PETERNAK
@mutation.field("deletePeternak")
async def resolve_delete_peternak(_, info, id):
    database = await get_db_connection()
    await database.execute("DELETE FROM peternaks WHERE id = :id", {"id": id})
    deleted = True
    await database.disconnect()
    return deleted

resolvers = [query, mutation]