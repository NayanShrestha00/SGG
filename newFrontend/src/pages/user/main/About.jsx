import { FaHouseChimney } from "react-icons/fa6";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      {/* Top Part */}
      <div className="h-[55vh] bg-cover bg-center relative" style={{ backgroundImage: `url("/posts.jpg")` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-x-0 top-0 bottom-10 flex items-end text-white">
          <div className="w-full md:w-[67%] mx-auto flex flex-col gap-4 md:gap-6 px-4 md:px-0">
            <h2 className="text-3xl md:text-5xl font-bold capitalize">About Us</h2>
            <div className="flex items-center gap-2">
              <Link to="/">
                <FaHouseChimney className="h-4 w-4 hover:text-[#519fff]" />
              </Link>
              <span>/</span>
              <p>Know More</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="h-auto md:h-screen flex items-center justify-center">
        <div className="relative w-full h-auto md:h-screen bg-cover bg-bottom bg-fixed" style={{ backgroundImage: "url('/aboutus4.jpg')" }}>
          <div className="h-auto md:h-[70%] bg-white flex justify-center items-center px-4 md:px-10 py-10 md:py-0">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="w-full md:w-1/2">
                <img className="rounded-lg w-full h-auto" src="/aboutus0.jpg" alt="House" />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h5 className="text-[#519fff] font-semibold text-lg">About Us</h5>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">We Provide Smart and Hassle-Free Real Estate Solutions</h2>
                <p className="text-gray-600 mt-4 text-sm md:text-base">
                  Our commitment to excellence, combined with a strong digital presence and expert guidance, makes property transactions effortless and efficient. At Shulav Ghar Gharadi, we strive to redefine real estate with trust, transparency, and convenience.
                </p>
                <Link to="/buy">
                  <button className="mt-4 bg-[#519fff] text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                    Browse Listings
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="h-auto md:h-[30%] bg-black bg-opacity-50 flex justify-center items-center text-white px-4 py-10 md:py-0">
            <div className="text-white py-12 px-6 text-center space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold">Explore Real Estate in Nepal with Shulav Ghar Gharadi</h2>
              <p className="mt-2 text-base md:text-lg max-w-2xl mx-auto">
                Find the perfect apartment, house, or commercial property in Nepal. Buy, sell, or rent with ease on Shulav Ghar Gharadi!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 md:px-6 py-16 space-y-16">
        <div className="flex flex-col lg:flex-row items-center bg-[#e5e7eb]">
          <div className="lg:w-1/2 space-y-4 text-left px-4 md:px-10 py-10 md:py-0">
            <h3 className="text-2xl md:text-3xl font-bold">Why Shulab Ghar Ghadari</h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              Shulav Ghar Gharadi is a technology-driven real estate startup committed to helping home seekers, investors, and sellers navigate the property market with ease. With a passion for empowering consumers and simplifying real estate transactions, we combine technology, a strong digital presence, and experienced field agents to provide seamless solutions and professional guidance.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Shulav Ghar Gharadi, as a leading real estate platform, offers a diverse range of digital services, enhancing the property search experience with speed, convenience, and efficiency. Our platform is designed to cater to the needs of home seekers, investors, and sellers, providing a seamless and user-friendly experience for all.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <img src="/aboutus1.jpg" alt="Aerial view of real estate" className="shadow-lg w-full object-cover" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 space-y-16">
        <div className="flex flex-col lg:flex-row-reverse items-center bg-[#e5e7eb]">
          <div className="lg:w-1/2 space-y-4 text-left px-4 md:px-10 py-10 md:py-0">
            <h3 className="text-2xl md:text-3xl font-bold">Building a Better Real Estate Future for All</h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              At Shulav Ghar Gharadi, we are committed to transforming the real estate industry with innovative solutions that simplify property transactions. Beyond providing a seamless digital platform, we actively advocate for a more accessible, affordable, and transparent real estate market. By leveraging technology, expert insights, and industry research, we strive to empower home seekers, investors, and sellers with the best possible experience.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <img src="/aboutus2.jpg" alt="Aerial view of real estate" className="shadow-lg w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;