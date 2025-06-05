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

# # Get all sapi
# @app.get("/sapis")
# def get_sapis():
#     conn = get_db_connection()
#     sapis = conn.execute("SELECT * FROM sapi").fetchall()
#     conn.close()
#     return JSONResponse([dict(row) for row in sapis])

# # Get Sapi by ID
# @app.get("/sapis/{sapi_id}")
# def get_sapi_by_id(sapi_id: int = Path(..., description="ID sapi yang ingin diambil")):
#     conn = get_db_connection()
#     sapi = conn.execute("SELECT * FROM sapi WHERE id = ?", (sapi_id,)).fetchone()
#     conn.close()
#     if sapi:
#         return dict(sapi)
#     else:
#         raise HTTPException(status_code=404, detail="Sapi not found")

# # Edit Sapi
# @app.patch("/sapis/{sapi_id}")
# def update_sapi(
#     sapi_id: int = Path(..., description="ID sapi yang akan diupdate"),
#     umur: int = Body(None),
#     berat: float = Body(None),
#     stok: int = Body(None),
#     harga: float = Body(None)
# ):
#     conn = get_db_connection()
#     cur = conn.cursor()
#     sapi = cur.execute("SELECT * FROM sapi WHERE id = ?", (sapi_id,)).fetchone()
#     if not sapi:
#         conn.close()
#         raise HTTPException(status_code=404, detail="Sapi not found")
#     updated_umur = umur if umur is not None else sapi["umur"]
#     updated_berat = berat if berat is not None else sapi["berat"]
#     updated_stok = stok if stok is not None else sapi["stok"]
#     updated_harga = harga if harga is not None else sapi["harga"]
#     cur.execute(
#         "UPDATE sapi SET umur=?, berat=?, stok=?, harga=? WHERE id=?",
#         (updated_umur, updated_berat, updated_stok, updated_harga, sapi_id)
#     )
#     conn.commit()
#     updated_sapi = cur.execute("SELECT * FROM sapi WHERE id = ?", (sapi_id,)).fetchone()
#     conn.close()
#     return dict(updated_sapi)

# # Delete Sapi
# @app.delete("/sapis/{sapi_id}")
# def delete_sapi(sapi_id: int = Path(..., description="ID sapi yang akan dihapus")):
#     conn = get_db_connection()
#     cur = conn.cursor()
#     cur.execute("DELETE FROM sapi WHERE id = ?", (sapi_id,))
#     conn.commit()
#     deleted = cur.rowcount
#     conn.close()
#     if deleted:
#         return {"message": f"Sapi dengan id {sapi_id} berhasil dihapus."}
#     else:
#         raise HTTPException(status_code=404, detail="Sapi not found")

app.mount("/", graphql_app)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001)