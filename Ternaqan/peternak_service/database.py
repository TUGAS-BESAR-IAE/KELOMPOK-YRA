import os
from databases import Database

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:HicYWJpHwSQIIpHxzgPTPZesqczOfwzp@postgres.railway.internal:5432/railway")

async def get_db_connection():
    database = Database(DATABASE_URL)
    await database.connect()
    return database

async def init_db():
    database = await get_db_connection()
    await database.execute("""
        CREATE TABLE IF NOT EXISTS peternaks (
            id SERIAL PRIMARY KEY,
            nama TEXT NOT NULL,
            alamat TEXT,
            nohp TEXT,
            username TEXT UNIQUE NOT NULL
        )
    """)
    print("Tabel peternaks berhasil dibuat.")
    await database.disconnect()