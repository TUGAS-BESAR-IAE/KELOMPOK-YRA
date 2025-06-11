from database import get_db_connection, init_db

def seed():
    init_db()
    conn = get_db_connection()
    sapis = [
        (2, 350.5, 10, 25000000),
        (3, 400.0, 5, 30000000),
    ]
    for umur, berat, stok, harga in sapis:
        try:
            conn.execute(
                "INSERT INTO sapi (umur, berat, stok, harga) VALUES (?, ?, ?, ?)",
                (umur, berat, stok, harga)
            )
        except Exception:
            pass
    conn.commit()
    conn.close()
    print("Seeding selesai.")

if __name__ == "__main__":
    seed()