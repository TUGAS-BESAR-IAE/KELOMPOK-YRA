import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ADMIN_API = "http://localhost:8000/";
const SAPI_API = "http://localhost:8001/";
const PET_API = "http://localhost:8002/";
const TRX_API = "http://localhost:8003/"; // Ganti jika ada service transaksi

const Dashboard = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [peternakCount, setPeternakCount] = useState(0);
  const [sapiCount, setSapiCount] = useState(0);
  const [trxCount, setTrxCount] = useState(0);

  const [adminPerTrx, setAdminPerTrx] = useState([]);
  const [sapiPerStok, setSapiPerStok] = useState([]);
  const [peternakPerUsername, setPeternakPerUsername] = useState([]);

  useEffect(() => {
    // Admin
    fetch(ADMIN_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            admins {
              id
              transaction_id
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const admins = result.data.admins || [];
        setAdminCount(admins.length);

        // Grafik: jumlah admin per transaction_id
        const countMap = {};
        admins.forEach((admin) => {
          const trx = admin.transaction_id || "Tanpa Transaksi";
          countMap[trx] = (countMap[trx] || 0) + 1;
        });
        setAdminPerTrx(
          Object.entries(countMap).map(([trx, count]) => ({
            trx,
            count,
          }))
        );
      });

    // Peternak
    fetch(PET_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            peternaks {
              id
              username
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const peternaks = result.data.peternaks || [];
        setPeternakCount(peternaks.length);

        // Grafik: jumlah peternak per username (contoh grouping)
        const countMap = {};
        peternaks.forEach((p) => {
          const uname = p.username || "Tanpa Username";
          countMap[uname] = (countMap[uname] || 0) + 1;
        });
        setPeternakPerUsername(
          Object.entries(countMap).map(([uname, count]) => ({
            uname,
            count,
          }))
        );
      });

    // Sapi
    fetch(SAPI_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            sapis {
              id
              stok
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const sapis = result.data.sapis || [];
        setSapiCount(sapis.length);

        // Grafik: jumlah sapi per stok (contoh grouping)
        const countMap = {};
        sapis.forEach((s) => {
          const stok = s.stok || 0;
          countMap[stok] = (countMap[stok] || 0) + 1;
        });
        setSapiPerStok(
          Object.entries(countMap).map(([stok, count]) => ({
            stok,
            count,
          }))
        );
      });

    // Transaksi (jika ada service transaksi)
    fetch(TRX_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            transactions {
              id
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const trxs = result.data.transactions || [];
        setTrxCount(trxs.length);
      })
      .catch(() => setTrxCount(0));
  }, []);

  // Grafik data
  const adminChartData = {
    labels: adminPerTrx.map((d) => d.trx),
    datasets: [
      {
        label: "Jumlah Admin per Transaction ID",
        data: adminPerTrx.map((d) => d.count),
        backgroundColor: "#1976d2",
      },
    ],
  };

  const sapiChartData = {
    labels: sapiPerStok.map((d) => d.stok),
    datasets: [
      {
        label: "Jumlah Sapi per Stok",
        data: sapiPerStok.map((d) => d.count),
        backgroundColor: "#16a085",
      },
    ],
  };

  const peternakChartData = {
    labels: peternakPerUsername.map((d) => d.uname),
    datasets: [
      {
        label: "Jumlah Peternak per Username",
        data: peternakPerUsername.map((d) => d.count),
        backgroundColor: "#f39c12",
      },
    ],
  };

  return (
    <div className="dashboard-root">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="dashboard-card-label">Total Admin</div>
          <div className="dashboard-card-value">{adminCount}</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-label">Total Peternak</div>
          <div className="dashboard-card-value">{peternakCount}</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-label">Total Sapi</div>
          <div className="dashboard-card-value">{sapiCount}</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-label">Total Transaksi</div>
          <div className="dashboard-card-value">{trxCount}</div>
        </div>
      </div>
      <div className="dashboard-charts-row">
        <div className="dashboard-chart-container">
          <h3 className="dashboard-chart-title">
            Grafik Admin per Transaction ID
          </h3>
          <Bar data={adminChartData} />
        </div>
        <div className="dashboard-chart-container">
          <h3 className="dashboard-chart-title">Grafik Sapi per Stok</h3>
          <Bar data={sapiChartData} />
        </div>
        <div className="dashboard-chart-container">
          <h3 className="dashboard-chart-title">
            Grafik Peternak per Username
          </h3>
          <Bar data={peternakChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
