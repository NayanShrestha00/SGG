import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { AdminManagerSummaryApi } from "../../../features/common/AdminManagerSummaryApi";
import { handleError } from "../../../utils/Toast";

const Users = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(AdminManagerSummaryApi.UserList.url, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                console.log(response.data.data);
                
                setUsers(response.data.data || []);
            } catch (error) {
                handleError(error.response?.data?.message || "Failed to fetch users!");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [accessToken]);
    console.log(users);
    

    return (
        <div className="container mx-auto p-6 max-w-2xl bg-white shadow-md rounded-lg">
            
            <h1 className="text-2xl font-bold mb-4">User List</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading users...</p>
            ) : users.length === 0 ? (
                <p className="text-center text-gray-500">No users found.</p>
            ) : (
                <div className="space-y-4">
                    {users.map((user) => (
                        <div key={user._id} className="flex items-center justify-between border p-4 rounded-md shadow-sm">
                            <div className="flex items-center flex-col">
                                    <h2 className="text-lg font-semibold">{user.fullName}</h2>
                                    <p className="text-sm text-gray-600">Email: {user.email}</p>
                                    <p className="text-sm text-gray-600">Mobile: {user.mobileNumber}</p>
                                    <p className="text-sm text-gray-600">Address: {user.currentAddress}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Users;
