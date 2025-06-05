import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
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

const API_URL = "http://localhost:8000/";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [userPerTransaction, setUserPerTransaction] = useState([]);

  useEffect(() => {
    fetch(API_URL, {
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
        const admins = result.data.admins;
        setUserCount(admins.length);

        // Hitung jumlah user per transaction_id
        const countMap = {};
        admins.forEach((admin) => {
          const trx = admin.transaction_id || "Tanpa Transaksi";
          countMap[trx] = (countMap[trx] || 0) + 1;
        });
        setUserPerTransaction(
          Object.entries(countMap).map(([trx, count]) => ({
            trx,
            count,
          }))
        );
      });
  }, []);

  const chartData = {
    labels: userPerTransaction.map((d) => d.trx),
    datasets: [
      {
        label: "Jumlah User",
        data: userPerTransaction.map((d) => d.count),
        backgroundColor: "#1976d2",
      },
    ],
  };

  return (
    <div style={{ marginLeft: 320, padding: 20 }}>
      <h2>Dashboard</h2>
      <div
        style={{
          display: "flex",
          gap: 32,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            background: "#1976d2",
            color: "#fff",
            borderRadius: 12,
            padding: "32px 48px",
            minWidth: 220,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 18, marginBottom: 8 }}>Total User</div>
          <div style={{ fontSize: 48, fontWeight: "bold" }}>{userCount}</div>
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          maxWidth: 600,
        }}
      >
        <h3 style={{ marginBottom: 24 }}>Grafik User per Transaction ID</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
