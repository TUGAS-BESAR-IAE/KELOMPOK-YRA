import sqlite3

DATABASE_NAME = "peternak.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS peternaks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nama TEXT NOT NULL,
            alamat TEXT,
            nohp TEXT,
            username TEXT UNIQUE NOT NULL
        )
    """)
    conn.commit()
    conn.close()
    print("Tabel peternaks berhasil dibuat.")

if __name__ == "__main__":
    init_db()