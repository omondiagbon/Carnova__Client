import React from "react";

const AboutValue = () => {
  return (
    <div>
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h1>
            <p className="text-lg text-gray-600">
              Transparency, customer focus, quality, innovation, and integrity
              guide everything we do—ensuring a smarter, safer, and more
              reliable car-buying experience.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="bg-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <h2 className="text-xl text-center font-semibold text-gray-900 mb-3">
                🚘 Transparency
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We believe trust starts with honesty. From clear pricing to
                accurate vehicle information, we ensure there are no hidden
                fees, surprises, or unclear processes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <h2 className="text-xl text-center font-semibold text-gray-900 mb-3">
                ⚙️ Innovation
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We embrace technology to improve the car-buying experience. By
                constantly evolving and innovating, we make purchasing a car
                faster, smarter, and more convenient.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <h2 className="text-xl text-center font-semibold text-gray-900 mb-3">
                🛡️ Integrity
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We do the right thing—always. Our business is built on ethical
                practices, accountability, and long-term relationships with our
                customers and partners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutValue;
