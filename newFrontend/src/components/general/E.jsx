import React from "react";

const Enquiry = () => {
  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          
          {/* Left Section (Text) */}
          <div className="md:w-3/4 p-6">
            <h3 className="text-xl font-bold text-gray-800">
              Enquiry for Properties
            </h3>
            <p className="text-gray-600 mt-2">
              Find the best property that suits your needs. Get in touch with us for inquiries.
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
              Enquire Now
            </button>
          </div>

          {/* Right Section (Image) */}
          <div className="md:w-1/4 flex justify-center p-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              alt="Property"
              className="w-32 h-32 object-cover rounded-md shadow"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
