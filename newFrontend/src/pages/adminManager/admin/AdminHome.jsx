import { useEffect, useState } from "react";
import { AdminManagerSummaryApi } from "../../../features/common/AdminManagerSummaryApi";
import axios from "axios";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import { PieChart } from "@mui/x-charts/PieChart";

const AdminHome = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalManagers: 0,
    totalCustomers: 0,
    totalBuy: 0,
  });

  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "",
    contact: "",
    role: "",
    userName: "",
  });

  const [pieChartData, setPieChartData] = useState([]);
  const [isChartLoading, setIsChartLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(AdminManagerSummaryApi.Stats.url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = response.data?.data || {};
        setStats({
          totalPosts: data.totalPosts || 0,
          totalManagers: data.totalManagers || 0,
          totalCustomers: data.totalUsers || 0,
          totalBuy: data.totalBuy || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(AdminManagerSummaryApi.AdminDetails.url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = response.data?.data || {};
        setAdminDetails({
          name: data.fullName || "N/A",
          email: data.email || "N/A",
          role: data.role || "N/A",
          userName: data.userName || "N/A",
        });
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    const fetchPieChartData = async () => {
      try {
        const response = await axios.get(AdminManagerSummaryApi.ChartData.url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = response.data?.data || {};

        setPieChartData([
          { id: 0, value: data.totalSellerForm || 0, label: "Seller Forms" },
          { id: 1, value: data.totalBuyerForm|| 0, label: "Buyer Forms" },
          { id: 2, value: data.totalEnqueryForm|| 0, label: "Enquiry Forms" },
          { id: 3, value: data.totalPost || 0, label: "Total Posts" },
        ]);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      } finally {
        setIsChartLoading(false);
      }
    };

    fetchStats();
    fetchAdminDetails();
    fetchPieChartData();
  }, [accessToken]);

  return (
    <main className="flex-col flex-wrap p-4 space-y-4 bg-[#f3f4f6] rounded-2xl shadow-md h-full overflow-y-scroll">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Home</h2>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>
        </div>
      </header>

      {/* Activity Section */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">My Activity</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-500 font-medium">TOTAL POST</p>
            <p className="text-lg font-semibold">
              <CountUp end={stats.totalPosts} duration={3} />
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-500 font-medium">TOTAL MANAGERS</p>
            <p className="text-lg font-semibold">
              <CountUp end={stats.totalManagers} duration={3} />
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-500 font-medium">TOTAL CUSTOMERS</p>
            <p className="text-lg font-semibold">
              <CountUp end={stats.totalCustomers} duration={3} />
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-500 font-medium">TOTAL BUY</p>
            <p className="text-lg font-semibold">
              <CountUp end={stats.totalBuy} duration={3} />
            </p>
          </div>
        </div>
      </section>

      {/* Admin Details */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Admin Details</h3>
        <div className="space-y-2">
          <p><strong>Name:</strong> {adminDetails.name}</p>
          <p><strong>Email:</strong> {adminDetails.email}</p>
          <p><strong>Role:</strong> {adminDetails.role}</p>
          <p><strong>User Name:</strong> {adminDetails.userName}</p>
        </div>
      </section>

      {/* Pie Chart */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Form Distribution</h3>
        <PieChart
          series={[
            {
              data: pieChartData,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" }
            }
          ]}
          height={300}
        />
      </section>
    </main>
  );
};

export default AdminHome;
