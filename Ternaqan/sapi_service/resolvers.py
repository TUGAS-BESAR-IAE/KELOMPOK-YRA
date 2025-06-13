from ariadne import QueryType, MutationType
from database import get_db_connection

query = QueryType()
mutation = MutationType()

# GET ALL SAPI
@query.field("sapis")
async def resolve_sapis(_, info):
    database = await get_db_connection()
    sapis = await database.fetch_all("SELECT * FROM sapi")
    await database.disconnect()
    return [dict(sapi) for sapi in sapis]

# UPDATE DATA SAPI
@mutation.field("updateSapi")
async def resolve_update_sapi(_, info, id, umur=None, berat=None, stok=None, harga=None):
    database = await get_db_connection()
    sapi = await database.fetch_one("SELECT * FROM sapi WHERE id = :id", {"id": id})
    if not sapi:
        await database.disconnect()
        return None
    updated_umur = umur if umur is not None else sapi["umur"]
    updated_berat = berat if berat is not None else sapi["berat"]
    updated_stok = stok if stok is not None else sapi["stok"]
    updated_harga = harga if harga is not None else sapi["harga"]
    await database.execute(
        "UPDATE sapi SET umur = :umur, berat = :berat, stok = :stok, harga = :harga WHERE id = :id",
        {"umur": updated_umur, "berat": updated_berat, "stok": updated_stok, "harga": updated_harga, "id": id}
    )
    updated_sapi = await database.fetch_one("SELECT * FROM sapi WHERE id = :id", {"id": id})
    await database.disconnect()
    return dict(updated_sapi)

# GET SAPI BY ID
@query.field("sapi")
async def resolve_sapi(_, info, id):
    database = await get_db_connection()
    sapi = await database.fetch_one("SELECT * FROM sapi WHERE id = :id", {"id": id})
    await database.disconnect()
    return dict(sapi) if sapi else None

# CREATE SAPI
@mutation.field("createSapi")
async def resolve_create_sapi(_, info, umur=None, berat=None, stok=None, harga=None):
    database = await get_db_connection()
    sapi_id = await database.execute(
        "INSERT INTO sapi (umur, berat, stok, harga) VALUES (:umur, :berat, :stok, :harga) RETURNING id",
        {"umur": umur, "berat": berat, "stok": stok, "harga": harga}
    )
    sapi = await database.fetch_one("SELECT * FROM sapi WHERE id = :id", {"id": sapi_id})
    await database.disconnect()
    return dict(sapi)

# DELETE SAPI
@mutation.field("deleteSapi")
async def resolve_delete_sapi(_, info, id):
    database = await get_db_connection()
    await database.execute("DELETE FROM sapi WHERE id = :id", {"id": id})
    deleted = True
    await database.disconnect()
    return deleted

resolvers = [query, mutation]