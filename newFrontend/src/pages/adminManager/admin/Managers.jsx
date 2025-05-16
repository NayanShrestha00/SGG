import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { AdminManagerSummaryApi } from "../../../features/common/AdminManagerSummaryApi";
import { handleError, handleSuccess } from "../../../utils/Toast";
import { SingleManagerDetails } from '../../../pages'
import { IoMdClose } from "react-icons/io";

const Managers = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null); // Track which manager is being deleted
  const [selectedManager, setSelectedManager] = useState(null); // Track selected manager for modal

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get(AdminManagerSummaryApi.ManagerList.url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setManagers(response.data.data.managers || []);
      } catch (error) {
        handleError(error.response?.data?.message || "Failed to fetch managers!");
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, [accessToken]);

  const deleteManager = async (managerId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this manager?");
    if (!confirmDelete) return;

    setDeleting(managerId); // Set loading state for the specific manager
    console.log(AdminManagerSummaryApi.DeleteManagerById(managerId).url);
    
    try {
      const response = await axios.delete(AdminManagerSummaryApi.DeleteManagerById(managerId).url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setManagers(managers.filter((manager) => manager._id !== managerId));
      handleSuccess(response.data.message);
    } catch (error) {
      handleError(error.response?.data?.message || "Failed to delete manager!");
    } finally {
      setDeleting(null); // Reset loading state
    }
  };

  const openModal = (manager) => {
    setSelectedManager(manager);
  };

  const closeModal = () => {
    setSelectedManager(null);
  };

  return (
    <div className="container mx-auto p-6 w-full bg-[#f3f4f6] shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Manager List</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading managers...</p>
      ) : managers.length === 0 ? (
        <p className="text-center text-gray-500">No managers found.</p>
      ) : (
        <div className="space-y-4">
          {managers.map((manager) => (
            <div
              key={manager._id}
              className="flex items-center justify-between border p-4 rounded-md shadow-sm cursor-pointer"
              onClick={() => openModal(manager)}
            >
              <div className="flex items-center">
                <img
                  src={manager.avatar || "/default-avatar.png"}
                  alt={manager.fullName}
                  className="w-12 h-12  object-cover mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">{manager.fullName}</h2>
                  <p className="text-sm text-gray-600">Email: {manager.email}</p>
                  <p className="text-sm text-gray-600">Mobile: {manager.mobileNumber}</p>
                  <p className="text-sm text-gray-600">Address: {manager.address}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteManager(manager._id);
                }}
                disabled={deleting === manager._id}
                className={`px-4 py-2 text-white rounded-md transition ${
                  deleting === manager._id ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {deleting === manager._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedManager && (
        <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 pr-10 ">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              <IoMdClose />
            </button>
            <SingleManagerDetails managerId={selectedManager._id} managerName={selectedManager.fullName} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Managers;
