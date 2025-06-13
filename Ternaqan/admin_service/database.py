import os
from databases import Database

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:muUWVeMidjwfukLtYCQnFIdIDxiRgJTx@postgres.railway.internal:5432/railway")

async def get_db_connection():
    database = Database(DATABASE_URL)
    await database.connect()
    return database

async def init_db():
    database = await get_db_connection()
    await database.execute("""
        CREATE TABLE IF NOT EXISTS admins (
            id SERIAL PRIMARY KEY,
            transaction_id INTEGER,
            nama TEXT NOT NULL,
            alamat TEXT,
            nohp TEXT,
            username TEXT UNIQUE NOT NULL
        )
    """)
    print("Tabel admins berhasil dibuat.")
    await database.disconnect()