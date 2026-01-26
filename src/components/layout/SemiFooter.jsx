import React from "react";

const SemiFooter = () => {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize">
            Ready to Find Your Dream Ride?
          </h1>
          <p className="text-lg text-gray-300">
            Browse our extensive selection of inspected, high-quality vehicles
            and experience the future of car buying today.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <a
            href="/cars"
            className="px-7 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Browse Inventory
          </a>

          <a
            href="/contact"
            className="px-7 py-3 rounded-xl border border-white text-white font-semibold hover:bg-white hover:text-black transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default SemiFooter;
