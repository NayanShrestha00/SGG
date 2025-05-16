import { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminManagerSummaryApi } from '../../../features/common/AdminManagerSummaryApi';
import { useSelector } from 'react-redux';

const BuyerForms = () => {
  const [buyerForms, setBuyerForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchBuyerForms = async () => {
      try {
        const response = await axios.get(AdminManagerSummaryApi.BuyerForms.url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setBuyerForms(response.data.data);
      } catch (error) {
        console.error("Error fetching Buyer Forms:", error);
      }
    };
    fetchBuyerForms();
  }, [accessToken]);

  const handleShowData = async (postId) => {
    try {
      const response = await axios.get(AdminManagerSummaryApi.SingleBuyerData(postId).url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSelectedForm(response.data.data);
    } catch (error) {
      console.error("Error fetching Buyer Form data:", error);
    }
  };

  const handleBuyerState = async (buyerId, newState) => {
    try {
      await axios.patch(AdminManagerSummaryApi.ChangeBuyerState(buyerId).url, { state: newState }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const updatedForms = buyerForms.map((form) =>
        form._id === buyerId ? { ...form, state: newState } : form
      );
      setBuyerForms(updatedForms);
    } catch (error) {
      console.error("Error changing Buyer State:", error);
    }
  };

  const handleStateChange = (buyerId, event) => {
    const newState = event.target.value;
    handleBuyerState(buyerId, newState);
  };

  console.log(buyerForms);
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Buyer Forms</h1>

      {/* Buyer Forms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buyerForms.length > 0 ? (
          buyerForms.map((form) => (
            <div
              key={form._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer"
            >
              <div className="space-y-2"
                onClick={() => handleShowData(form.postId)}
              >
                <p className="text-lg font-semibold text-gray-800">{form.fullName}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">State:</span> {form.state}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Contact:</span> {form.mobileNumber}</p>
              </div>
              <select
                value={form.state}
                onChange={(event) => handleStateChange(form._id, event)}
                className="mt-3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No buyer forms available.</p>
        )}
      </div>

      {/* Modal for Selected Form Details */}
      {selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Buyer Form Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600"><span className="font-medium">Full Name:</span> {selectedForm.fullName}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Description:</span> {selectedForm.description}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Facilities:</span> {selectedForm.facilities.join(', ')}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Featured:</span> {selectedForm.featured ? 'Yes' : 'No'}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Negotiable:</span> {selectedForm.isNegotiable ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600"><span className="font-medium">Land Address:</span> {selectedForm.landAddress}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Land City:</span> {selectedForm.landCity}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Land Location:</span> {selectedForm.landLocation}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Land Type:</span> {selectedForm.landType}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Price:</span> रु {selectedForm.price.amount || 'N/A'} per {selectedForm.price.sizePerAmount || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600"><span className="font-medium">Property Title:</span> {selectedForm.propertyTitle}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Purpose:</span> {selectedForm.purpose}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Contact:</span> {selectedForm.sellerNumber}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">State:</span> {selectedForm.state}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Area:</span> {selectedForm.area.size || 'N/A'} {selectedForm.area.unit || 'N/A'}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedForm.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
            <button
              className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
              onClick={() => setSelectedForm(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerForms;