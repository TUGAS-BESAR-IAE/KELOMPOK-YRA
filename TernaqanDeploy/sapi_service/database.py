# import sqlite3

# DATABASE_NAME = "sapi.db"

# def get_db_connection():
#     conn = sqlite3.connect(DATABASE_NAME)
#     conn.row_factory = sqlite3.Row
#     return conn

# def init_db():
#     conn = get_db_connection()
#     c = conn.cursor()
#     c.execute("""
#         CREATE TABLE IF NOT EXISTS sapi (
#             id INTEGER PRIMARY KEY AUTOINCREMENT,
#             umur INTEGER,
#             berat FLOAT NOT NULL,
#             stok INTEGER NOT NULL,
#             harga FLOAT NOT NULL
#         )
#     """)
#     conn.commit()
#     conn.close()
#     print("Tabel sapi berhasil dibuat.")

# if __name__ == "__main__":
#     init_db()

import os
from databases import Database

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:LoikOiOTZOSFkxLbQRotqOCIUEMYkiza@postgres.railway.internal:5432/railway")

async def get_db_connection():
    database = Database(DATABASE_URL)
    await database.connect()
    return database

async def init_db():
    database = await get_db_connection()
    await database.execute("""
        CREATE TABLE IF NOT EXISTS sapi (
            id SERIAL PRIMARY KEY,
            umur INTEGER,
            berat FLOAT NOT NULL,
            stok INTEGER NOT NULL,
            harga FLOAT NOT NULL
        )
    """)
    print("Tabel sapi berhasil dibuat.")
    await database.disconnect()