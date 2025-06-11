import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./dashboard.css"; // Import the CSS file for styling
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
    <div className="dashboard-root">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="dashboard-card-label">Total User</div>
          <div className="dashboard-card-value">{userCount}</div>
        </div>
      </div>
      <div className="dashboard-chart-container">
        <h3 className="dashboard-chart-title">
          Grafik User per Transaction ID
        </h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
