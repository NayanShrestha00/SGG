import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { AdminManagerSummaryApi } from "../../../features/common/AdminManagerSummaryApi";
import { useNavigate } from "react-router-dom";

const AdminAccountSetting = () => {
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const changepassword = () => {
        setShowPasswordChange(!showPasswordChange);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const oldPassword = e.target.oldPassword.value;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }
        const role = user.role;
        const id = user._id;
        console.log(role,id);
        
        console.log(AdminManagerSummaryApi.ChangePassword(role,id).url);
        

        try {
            const response = await axios.patch(
                AdminManagerSummaryApi.ChangePassword(role,id).url,
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
        } catch (error) {
            console.error("Error changing password", error);
        }
        
    };

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${showPasswordChange ? 'blur-background' : ''}`}>
            <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-2xl text-white mb-4">Account Setting</h1>
                <div className="flex flex-col">
                    <div className="flex items-center mb-4">
                        <div className="w-1/2">
                            <label htmlFor="fullName" className="text-white">Full Name</label>
                            <input type="text" id="fullName" className="input-box" value={user.fullName} disabled />
                        </div>
                        <div className="w-1/2 ml-4">
                            <label htmlFor="email" className="text-white">Email</label>
                            <input type="email" id="email" className="input-box" value={user.email} disabled />
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="w-1/2">
                            <label htmlFor="role" className="text-white">Role</label>
                            <input type="text" id="role" className="input-box" value={user.role} disabled />
                        </div>
                        <div className="w-1/2 ml-4">
                            <label htmlFor="userName" className="text-white">Username</label>
                            <input type="text" id="userName" className="input-box" value={user.userName} disabled />
                        </div>
                    </div>
                    <button className="bg-red-400 text-white py-2 px-4 rounded" onClick={changepassword}>Change Password</button>
                </div>
            </div>
            {showPasswordChange && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                        <form className="flex flex-col" onSubmit={handlePasswordChange}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="oldPassword" className="text-white">Current Password</label>
                                    <input type="password" id="oldPassword" name="oldPassword" className="input-box" required />
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="text-white">New Password</label>
                                    <input type="password" id="newPassword" name="newPassword" className="input-box" required />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="text-white">Confirm Password</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" className="input-box" required />
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" className="bg-red-400 text-white py-2 px-4 rounded" onClick={changepassword}>Back</button>
                                    <button type="submit" className="bg-green-400 text-white py-2 px-4 rounded">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAccountSetting;
