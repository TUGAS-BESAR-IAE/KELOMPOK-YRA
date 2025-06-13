from database import get_db_connection, init_db

def seed():
    init_db()
    conn = get_db_connection()
    admins = [
        (1, "Admin Satu", "Jl. Mawar 1", "081234567890", "admin1"),
        (2, "Admin Dua", "Jl. Melati 2", "081234567891", "admin2"),
    ]
    for transaction_id, nama, alamat, nohp, username in admins:
        try:
            conn.execute(
                "INSERT INTO admins (transaction_id, nama, alamat, nohp, username) VALUES (?, ?, ?, ?, ?)",
                (transaction_id, nama, alamat, nohp, username)
            )
        except Exception:
            pass
    conn.commit()
    conn.close()
    print("Seeding selesai.")

if __name__ == "__main__":
    seed()