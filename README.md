# 🐄 TernaQan - Sistem Manajemen Peternakan

Aplikasi web untuk mengelola data peternakan, terdiri dari backend services (GraphQL + FastAPI) dan frontend React.

---

## 📁 Struktur Project

```
Ternaqan/
├── admin_service/         # Service untuk mengelola admin
├── peternak_service/      # Service untuk mengelola peternak
├── sapi_service/          # Service untuk mengelola data sapi
├── frontend/              # React frontend application
└── docker-compose.yml     # Konfigurasi Docker
```

---

## 🛠 Teknologi yang Digunakan

### 🔙 Backend

- **Python 3.10**
- **FastAPI** – Web framework
- **Ariadne** – GraphQL library
- **SQLite / PostgreSQL** – Database
- **Docker** – Containerization

### 🔜 Frontend

- **React.js** – Frontend framework
- **React Router** – Navigation
- **Chart.js** – Data visualization
- **SweetAlert2** – Modal notifications

---

## ✅ Prasyarat

Pastikan sudah terinstal:

- **Node.js** (v14 atau lebih baru)
- **Python 3.10**
- **Docker & Docker Compose** (opsional namun direkomendasikan)
- **Git**

---

## ⚙️ Setup dan Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/KELOMPOK-YRA.git
cd KELOMPOK-YRA/Ternaqan
```

### 2. Setup Backend Services

#### 🔹 Opsi A: Menggunakan Docker (Rekomendasi)

```bash
# Jalankan semua backend services
docker-compose up --build

# Atau jalankan di background
docker-compose up -d --build
```

#### 🔹 Opsi B: Manual Setup per Service

**Admin Service**

```bash
cd admin_service
pip install -r requirements.txt
python main.py
```

**Peternak Service**

```bash
cd ../peternak_service
pip install -r requirements.txt
python main.py
```

**Sapi Service**

```bash
cd ../sapi_service
pip install -r requirements.txt
python main.py
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🚀 Menjalankan Aplikasi

### 🔧 Development Mode

- **Backend**: Jalankan `docker-compose up` atau manual per service
- **Frontend**: Jalankan `npm start` di folder `frontend`
- **Akses aplikasi**: [http://localhost:3000](http://localhost:3000)

---

## 🔌 API Endpoints

| Service          | Port | GraphQL Endpoint       | Status |
| ---------------- | ---- | ---------------------- | ------ |
| Admin Service    | 8000 | http://localhost:8000/ | ✅     |
| Sapi Service     | 8001 | http://localhost:8001/ | ✅     |
| Peternak Service | 8002 | http://localhost:8002/ | ✅     |
| Frontend         | 3000 | http://localhost:3000  | ✅     |

---

## ✨ Fitur Aplikasi

### 📊 Dashboard

- Statistik admin, peternak, dan sapi
- Grafik visualisasi data
- Tabel data terbaru

### 👤 Manajemen Admin

- ✅ CRUD (Create, Read, Update, Delete)
- ✅ Form validation
- ✅ Search dan filter

### 🧑‍🌾 Manajemen Peternak

- ✅ CRUD data peternak
- ✅ Data alamat dan kontak
- ✅ Manajemen username

### 🐄 Manajemen Sapi

- ✅ CRUD data sapi
- ✅ Data umur, berat, stok, harga
- ✅ Inventory tracking

### 💡 UI/UX Features

- ✅ Responsive design
- ✅ Sidebar navigasi modern
- ✅ Form dengan animasi
- ✅ Loading states
- ✅ Notifikasi sukses/gagal

---

## 🗃 Database Schema

### Admin Table

- `id`, `transaction_id`, `nama`, `alamat`, `nohp`, `username`

### Peternak Table

- `id`, `nama`, `alamat`, `nohp`, `username`

### Sapi Table

- `id`, `umur`, `berat`, `stok`, `harga`

---

## 🧯 Troubleshooting

### ❌ Error Connection Refused

```bash
# Cek apakah semua services berjalan
docker-compose ps

# Restart jika perlu
docker-compose restart
```

### ❌ Frontend tidak bisa fetch data

- Cek environment variables di `.env`
- Pastikan backend services online
- Cek pengaturan CORS di backend

### ❌ Port Sudah Digunakan

```bash
# Cek port yang sedang digunakan
netstat -ano | findstr :8000

# Kill proses
taskkill /PID <PID> /F
```

---

## 🚢 Deployment ke Production

### 🔧 Backend (Railway)

- Deploy setiap service ke Railway secara terpisah
- Set environment variables untuk database
- Update CORS settings untuk domain production

### 🌐 Frontend (Vercel)

```bash
npm run build
```

- Deploy hasil build ke Vercel
- Update environment variables dengan URL backend production

#### 📁 Contoh `.env` untuk Production

```env
REACT_APP_ADMIN_API=https://adminservice-production.up.railway.app/
REACT_APP_SAPI_API=https://sapiservice-production.up.railway.app/
REACT_APP_PET_API=https://peternakservice-production.up.railway.app/
```

---

## 🤝 Contributing

1. Fork repository
2. Buat branch baru:

```bash
git checkout -b feature/nama-fitur
```

3. Commit perubahan:

```bash
git commit -am "Add nama fitur"
```

4. Push ke remote:

```bash
git push origin feature/nama-fitur
```

5. Buat Pull Request di GitHub

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Team - KELOMPOK YRA

- YAP
- Ridwan
- Anin

> Tech Stack: React.js, FastAPI, GraphQL, Docker, PostgreSQL
