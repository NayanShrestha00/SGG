import React from "react";

const Card = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Real Estate In Nepal</h2>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Image */}
          <div className="relative">
            <img
              src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              alt="Property Image"
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              ✔
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-lg font-semibold text-gray-800">
              Rs. 3,50,00,000 Total Price
            </p>
            <h3 className="text-gray-600">Residential House On Sale</h3>
            <p className="text-sm text-gray-500">Dallu Aawas, Kathmandu, Nepal</p>

            {/* Features */}
            <div className="flex items-center text-gray-500 text-sm mt-2">
              <span className="flex items-center mr-4">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 10h16M4 6h16M4 14h16m-7 4h7"></path>
                </svg>
                2 Kitchen
              </span>
              <span className="flex items-center mr-4">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 10h16M4 6h16M4 14h16m-7 4h7"></path>
                </svg>
                5+ Bedroom
              </span>
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 10h16M4 6h16M4 14h16m-7 4h7"></path>
                </svg>
                2 Bathroom
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              <a href="#" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition">
                View Details
              </a>
              <a href="#" className="text-green-600 hover:text-green-800 transition">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 10h3v4H3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              alt="Property Image"
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              FEATURED
            </div>
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              ✔
            </div>
          </div>

          <div className="p-4">
            <p className="text-lg font-semibold text-gray-800">
              Rs. 63,00,000 Per Aana
            </p>
            <h3 className="text-gray-600">Land on Sale</h3>
            <p className="text-sm text-gray-500">Bhagwan Pau, Kathmandu</p>

            {/* Features */}
            <div className="flex items-center text-gray-500 text-sm mt-2">
              <span className="flex items-center mr-4">0 Kitchen</span>
              <span className="flex items-center mr-4">0 Bedroom</span>
              <span className="flex items-center">0 Bathroom</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              <a href="#" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition">
                View Details
              </a>
              <a href="#" className="text-green-600 hover:text-green-800 transition">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 10h3v4H3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* View All Link */}
      <div className="mt-6 text-right">
        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
          View All &rarr;
        </a>
      </div>
    </section>
  );
};

export default Card;
