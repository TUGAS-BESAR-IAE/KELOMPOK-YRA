from ariadne import QueryType, MutationType
from database import get_db_connection

query = QueryType()
mutation = MutationType()

# GET ALL ADMINS
@query.field("admins")
async def resolve_admins(_, info):
    database = await get_db_connection()
    admins = await database.fetch_all("SELECT * FROM admins")
    await database.disconnect()
    return [dict(admin) for admin in admins]

# GET ADMIN BY ID
@query.field("admin")
async def resolve_admin(_, info, id):
    database = await get_db_connection()
    admin = await database.fetch_one("SELECT * FROM admins WHERE id = :id", {"id": id})
    await database.disconnect()
    return dict(admin) if admin else None

# CREATE ADMIN
@mutation.field("createAdmin")
async def resolve_create_admin(_, info, transaction_id=None, nama=None, alamat=None, nohp=None, username=None):
    database = await get_db_connection()
    admin_id = await database.execute(
        "INSERT INTO admins (transaction_id, nama, alamat, nohp, username) VALUES (:transaction_id, :nama, :alamat, :nohp, :username) RETURNING id",
        {"transaction_id": transaction_id, "nama": nama, "alamat": alamat, "nohp": nohp, "username": username}
    )
    admin = await database.fetch_one("SELECT * FROM admins WHERE id = :id", {"id": admin_id})
    await database.disconnect()
    return dict(admin)

# UPDATE ADMIN
@mutation.field("updateAdmin")
async def resolve_update_admin(_, info, id, transaction_id=None, nama=None, alamat=None, nohp=None, username=None):
    database = await get_db_connection()
    admin = await database.fetch_one("SELECT * FROM admins WHERE id = :id", {"id": id})
    if not admin:
        await database.disconnect()
        return None
    updated_transaction_id = transaction_id if transaction_id is not None else admin["transaction_id"]
    updated_nama = nama if nama is not None else admin["nama"]
    updated_alamat = alamat if alamat is not None else admin["alamat"]
    updated_nohp = nohp if nohp is not None else admin["nohp"]
    updated_username = username if username is not None else admin["username"]
    await database.execute(
        "UPDATE admins SET transaction_id = :transaction_id, nama = :nama, alamat = :alamat, nohp = :nohp, username = :username WHERE id = :id",
        {
            "transaction_id": updated_transaction_id,
            "nama": updated_nama,
            "alamat": updated_alamat,
            "nohp": updated_nohp,
            "username": updated_username,
            "id": id
        }
    )
    updated_admin = await database.fetch_one("SELECT * FROM admins WHERE id = :id", {"id": id})
    await database.disconnect()
    return dict(updated_admin)

# DELETE ADMIN
@mutation.field("deleteAdmin")
async def resolve_delete_admin(_, info, id):
    database = await get_db_connection()
    await database.execute("DELETE FROM admins WHERE id = :id", {"id": id})
    deleted = True
    await database.disconnect()
    return deleted

resolvers = [query, mutation]