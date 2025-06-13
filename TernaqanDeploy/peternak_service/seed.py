from database import get_db_connection, init_db

def seed():
    init_db()
    conn = get_db_connection()
    peternaks = [
        ("Budi", "Jl. Sapi 1", "081234567890", "budi"),
        ("Siti", "Jl. Kambing 2", "081234567891", "siti"),
    ]
    for nama, alamat, nohp, username in peternaks:
        try:
            conn.execute(
                "INSERT INTO peternaks (nama, alamat, nohp, username) VALUES (?, ?, ?, ?)",
                (nama, alamat, nohp, username)
            )
        except Exception:
            pass
    conn.commit()
    conn.close()
    print("Seeding selesai.")

if __name__ == "__main__":
    seed()