from ariadne.asgi import GraphQL
from ariadne import load_schema_from_path, make_executable_schema
from resolvers import resolvers
from database import init_db, get_db_connection
import uvicorn
from fastapi import FastAPI, HTTPException, Path, Body
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

init_db()

type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(type_defs, *resolvers)
graphql_app = GraphQL(schema)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.get("/admins")
# def get_admins():
#     conn = get_db_connection()
#     admins = conn.execute("SELECT * FROM admins").fetchall()
#     conn.close()
#     return JSONResponse([dict(row) for row in admins])

# # Tambahkan endpoint berikut sebelum app.mount("/", graphql_app)
# @app.patch("/admins/{admin_id}")
# def update_admin(
#     admin_id: int = Path(..., description="ID admin yang akan diupdate"),
#     nama: str = Body(None),
#     alamat: str = Body(None),
#     nohp: str = Body(None),
#     username: str = Body(None)
# ):
#     conn = get_db_connection()
#     cur = conn.cursor()
#     # Ambil data lama
#     admin = cur.execute("SELECT * FROM admins WHERE id = ?", (admin_id,)).fetchone()
#     if not admin:
#         conn.close()
#         raise HTTPException(status_code=404, detail="Admin not found")
#     # Update field jika ada input baru
#     updated_nama = nama if nama is not None else admin["nama"]
#     updated_alamat = alamat if alamat is not None else admin["alamat"]
#     updated_nohp = nohp if nohp is not None else admin["nohp"]
#     updated_username = username if username is not None else admin["username"]
#     cur.execute(
#         "UPDATE admins SET nama=?, alamat=?, nohp=?, username=? WHERE id=?",
#         (updated_nama, updated_alamat, updated_nohp, updated_username, admin_id)
#     )
#     conn.commit()
#     updated_admin = cur.execute("SELECT * FROM admins WHERE id = ?", (admin_id,)).fetchone()
#     conn.close()
#     return dict(updated_admin)

# @app.delete("/admins/{admin_id}")
# def delete_admin(admin_id: int = Path(..., description="ID admin yang akan dihapus")):
#     conn = get_db_connection()
#     cur = conn.cursor()
#     cur.execute("DELETE FROM admins WHERE id = ?", (admin_id,))
#     conn.commit()
#     deleted = cur.rowcount
#     conn.close()
#     if deleted:
#         return {"message": f"Admin dengan id {admin_id} berhasil dihapus."}
#     else:
#         raise HTTPException(status_code=404, detail="Admin not found")
    
    
# Mount GraphQL at root
app.mount("/", graphql_app)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)