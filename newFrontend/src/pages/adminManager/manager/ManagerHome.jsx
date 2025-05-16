import { useEffect, useState } from "react";
import { AdminManagerSummaryApi } from "../../../features/common/AdminManagerSummaryApi";
import axios from "axios";
import { useSelector } from "react-redux";
import CountUp from "react-countup";

const ManagerHome = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const manager = useSelector((state) => state.auth.user);
    


    const [stats, setStats] = useState({
        totalPostByManager: 0,
        totalSellerForms: 0,
        totalBuyerForms: 0,
        totalEnqueryForms: 0,
    });


    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(AdminManagerSummaryApi.ManagerStats(manager._id).url, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                const data = response.data?.data || {};
                
                setStats({
                    totalPostByManager: data.totalPostByManager || 0,
                    totalSellerForms: data.totalSellerForms || 0,
                    totalBuyerForms: data.totalBuyerForms || 0,
                    totalEnqueryForms: data.totalEnqueryForms || 0,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, [accessToken]);

    return (
        <div className="flex-col flex-wrap p-4 space-y-4 bg-[#f3f4f6] rounded-2xl shadow-md h-full overflow-y-scroll">
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
                            <CountUp end={stats.totalPostByManager} duration={3} />
                        </p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-gray-500 font-medium">TOTAL MANAGERS</p>
                        <p className="text-lg font-semibold">
                            <CountUp end={stats.totalSellerForms} duration={3} />
                        </p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-gray-500 font-medium">TOTAL CUSTOMERS</p>
                        <p className="text-lg font-semibold">
                            <CountUp end={stats.totalBuyerForms} duration={3} />
                        </p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-gray-500 font-medium">TOTAL BUY</p>
                        <p className="text-lg font-semibold">
                            <CountUp end={stats.totalEnqueryForms} duration={3} />
                        </p>
                    </div>
                </div>
            </section>

            {/* Manager Details */}
            <section className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Manager Details</h3>
                <div className="space-y-2 flex justify-between">
                    <div className="space-y-1">
                        <p><strong>Name:</strong> {manager.fullName}</p>
                        <p><strong>Email:</strong> {manager.email}</p>
                        <p><strong>Role:</strong> {manager.role}</p>
                        <p><strong>Contact:</strong> {manager.mobileNumber}</p>
                    </div>
                    <img src={manager.avatar} alt={manager.fullName}
                        className="h-24 w-24 rounded-lg"
                    />
                </div>
            </section>
        </div>
    );
};

export default ManagerHome;