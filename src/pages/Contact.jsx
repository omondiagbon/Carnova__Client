import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import {
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
  }, [userId]);



  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_qwew78l",
        "template_cs0vuxy",
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "GL8ZwdFiB0p8HBvXP"
      )
      .then(
        () => {
          alert("Message sent successfully");
          setForm({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          alert("Something went wrong ");
          console.error(error);
        }
      );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Get In Touch{" "}
          </h1>
          <span className="text-xl text-blue-500">
            have qustion about a car, finacing or seling your vehicle{" "}
          </span>

          {/* CONTACT LINKS */}
          <div className="space-y-5 max-w-md">
            <a
              href="mailto:omondiagbonjoshuabobby@gmail.com"
              className="block p-3 rounded-xl bg-white/5 border border-black/20 hover:border-blue-500/40 hover:bg-blue-500/5 transition"
            >
              <ContactItem
                icon={<FaEnvelope />}
                label="Email"
                value="omondiagbonjoshuabobby@gmail.com"
              />
            </a>

            <a
              href="https://instagram.com/joshua__bobby"
              target="_blank"
              rel="noreferrer"
              className="block p-3 rounded-xl bg-white/5 border border-black/20 hover:border-blue-500/40 hover:bg-blue-500/5 transition"
            >
              <ContactItem
                icon={<FaInstagram />}
                label="Instagram"
                value="@joshua__bobby"
              />
            </a>

            <a
              href="https://facebook.com/joshua.omondiagbon.5"
              target="_blank"
              rel="noreferrer"
              className="block p-3 rounded-xl bg-white/5 border border-black/20 hover:border-blue-500/40 hover:bg-blue-500/5 transition"
            >
              <ContactItem
                icon={<FaFacebook />}
                label="Facebook"
                value="Let’s connect"
              />
            </a>

            <a
              href="https://wa.me/2347040788537"
              target="_blank"
              rel="noreferrer"
              className="block p-3 rounded-xl bg-white/5 border border-black/20 hover:border-blue-500/40 hover:bg-blue-500/5 transition"
            >
              <ContactItem
                icon={<FaWhatsapp />}
                label="WhatsApp"
                value="Chat with me"
              />
            </a>
          </div>

          <div className="mt-5 ">
            <h1 className="font-bold  text-2xl">visit our showroom</h1>
            <p className="text-xl">24A deji aworo street alapere ketu lagos</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Send me a message
          </h2>
          <p className="text-gray-900 mb-8 text-sm">
            Got a project in mind? Fill out the form and I’ll get back to you
            within 24 hours.
          </p>

          <form onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="contact-input"
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              className="contact-input"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="contact-input"
            />

            <textarea
              name="message"
              placeholder="Tell me about your project"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="contact-input resize-none"
            />

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition font-medium text-gray-900"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">{icon}</div>
    <div>
      <p className="text-xs text-gray-900 uppercase tracking-wide">{label}</p>
      <p className="text-black font-medium">{value}</p>
    </div>
  </div>
);

export default Contact;
