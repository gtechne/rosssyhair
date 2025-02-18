import React, { useEffect, useState } from "react";
import { FaNairaSign } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { Bar } from "react-chartjs-2";

// Chart.js Core and Elements
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import SummaryApi from "../common";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Icons
const earningIcon = <FaNairaSign size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;
const usersIcon = <FaUsers size={30} color="green" />;

const AdminHome = () => {
  const [stats, setStats] = useState({
    earnings: 0,
    products: 0,
    users: 0,
    orders: 0,
    orderStatus: { "Order Placed": 0, shipped: 0, processing: 0, Delivered: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(SummaryApi.stats.url, {
        method: SummaryApi.stats.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.statusText}`);
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state only after fetching
  if (loading) {
    return (
      <div className="text-center text-xl font-semibold">
        Loading admin stats...
      </div>
    );
  }

  // Chart data for bar chart
  const chartData = {
    labels: ["Order Placed", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Order Status",
        data: [
          stats.orderStatus?.OrderPlaced || 0,
          stats.orderStatus?.processing || 0,
          stats.orderStatus?.shipped || 0,
          stats.orderStatus?.Delivered || 0,
        ],
        backgroundColor: ["#043e4a", "#ff5733", "#47c455", "#4caf50"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard icon={earningIcon} title="Total Earnings" value={`₦${stats.earnings}`} />
        <StatCard icon={productIcon} title="Total Products" value={stats.products} />
        <StatCard icon={usersIcon} title="Total Users" value={stats.users} />
        <StatCard icon={ordersIcon} title="Total Orders" value={stats.orders} />
      </div>

      {/* Order Status Bar Chart */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Order Status Overview</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="flex items-center bg-white p-4 shadow-lg rounded-lg">
    <div className="mr-4">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default AdminHome;
