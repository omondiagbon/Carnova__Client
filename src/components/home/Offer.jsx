import React from "react";
import LOgo from '../../assets/logo.png';

const Offer = () => {
  return (
    <div className="mt-16 mb-20 px-6">
      {/* Section Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10 capitalize">
        Current Offers
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
    
        <div className="relative rounded-2xl overflow-hidden shadow-xl group">
          {/* Discount Badge */}
          <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full z-20">
            -20%
          </span>

          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&auto=format&fit=crop&q=60"
            className="w-full h-80 object-cover transform group-hover:scale-110 transition-all duration-500"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Sliding Text & Button */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <h2 className="text-2xl font-bold">Premium</h2>
            <p className="mt-2 text-sm leading-relaxed">
              At Carnova, we occasionally provide special discounts on top-rated
              vehicles. Keep an eye out for limited-time offers.
            </p>

            <button className="mt-4 bg-white text-black font-bold py-2 rounded-lg w-32 hover:bg-gray-200 transition">
              Shop Now
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl group">
          <span className="absolute top-4 left-4 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full z-20">
            -15%
          </span>

          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FyfGVufDB8fDB8fHww"
            className="w-full h-80 object-cover transform group-hover:scale-110 transition-all duration-500"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <h2 className="text-2xl font-bold">Friendly</h2>
            <p className="mt-2 text-sm leading-relaxed">
              We sometimes run discounts on selected cars — make sure to check
              back often!
            </p>

            <button className="mt-4 bg-white text-black font-bold py-2 rounded-lg w-32 hover:bg-gray-200 transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
