// "use client";

// import { motion } from "framer-motion";
// import {
//   FaPhoneAlt,
//   FaWhatsapp,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaShieldAlt,
//   FaBolt,
//   FaAward,
// } from "react-icons/fa";

// function ContactItem({ icon, title, text }) {
//   return (
//     <div className="flex items-start gap-4">
//       <div className="text-xl text-primary mt-1">{icon}</div>
//       <div>
//         <h4 className="font-semibold text-lg">{title}</h4>
//         <p className="text-gray-600">{text}</p>
//       </div>
//     </div>
//   );
// }

// function InputField({ placeholder }) {
//   return (
//     <input
//       type="text"
//       placeholder={placeholder}
//       className="w-full border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary"
//     />
//   );
// }

// function TextareaField({ placeholder }) {
//   return (
//     <textarea
//       rows={5}
//       placeholder={placeholder}
//       className="w-full border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary"
//     />
//   );
// }

// function TrustCard({ icon, title, text }) {
//   return (
//     <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
//       <div className="text-3xl text-primary mb-4 flex justify-center">
//         {icon}
//       </div>
//       <h4 className="font-bold text-lg mb-2">{title}</h4>
//       <p className="text-gray-600">{text}</p>
//     </div>
//   );
// }

// export default function ContactPage() {
//   return (
//     <div className="bg-[#F9F7FC] text-[#1C1C1E] overflow-hidden">
//       {/* ================= HERO ================= */}
// <section className="relative py-28 text-white bg-gradient-to-r from-primary to-primary">
//   <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

//   <div className="relative custom-container text-center">
//     <h1 className="text-4xl md:text-6xl font-bold mb-6">
//       Let’s Start a Strategic Conversation
//     </h1>
//     <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-8">
//       We’re here to guide your business with clarity, compliance, and
//       confidence.
//     </p>

//     <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
//       <span>⭐ 40+ Years Experience</span>
//       <span>🌍 150+ Countries</span>
//       <span>🛡 Trusted by 30,000+ Clients</span>
//     </div>
//   </div>
// </section>

//       {/* ================= MAIN CONTACT SECTION ================= */}
//       <section className="py-24 custom-container grid lg:grid-cols-2 gap-16">
//         {/* ========= LEFT GLASS PANEL ========= */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border"
//         >
//           <h3 className="text-2xl font-bold mb-8">Direct Contact</h3>

//           <div className="space-y-4">
//             <ContactItem
//               icon={<FaPhoneAlt />}
//               title="London Office Phone"
//               text="0207 100 3610"
//               href="tel:02071003610"
//             />

//             <ContactItem
//               icon={<FaEnvelope />}
//               title="Corporate Enquiries"
//               text="enquiries@mah.uk.com"
//               href="mailto:enquiries@mah.uk.com"
//             />

//             <ContactItem
//               icon={<FaMapMarkerAlt />}
//               title="London Office"
//               text="2nd Floor, 154 Bishopsgate, London, EC2M 4LN"
//               href="https://maps.google.com"
//             />
//           </div>
//         </motion.div>

//         {/* ========= RIGHT FORM ========= */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-200"
//         >
//           <h3 className="text-2xl font-bold mb-8">Send Confidential Inquiry</h3>

//           <form className="space-y-6">
//             <InputField placeholder="Full Name" />
//             <InputField placeholder="Email Address" />
//             <InputField placeholder="Subject" />
//             <TextareaField placeholder="Your Message" />

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-primary to-primary text-white py-4 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300"
//             >
//               Send Confidential Inquiry →
//             </button>
//           </form>
//         </motion.div>
//       </section>

//       {/* ================= WHY CONTACT US ================= */}
//       <section className="pb-24 custom-container">
//         <div className="grid md:grid-cols-3 gap-8">
//           <TrustCard
//             icon={<FaShieldAlt />}
//             title="100% Confidential"
//             text="Your consultation remains strictly private."
//           />

//           <TrustCard
//             icon={<FaBolt />}
//             title="Fast Response"
//             text="We respond within 24 business hours."
//           />

//           <TrustCard
//             icon={<FaAward />}
//             title="Award Winning Experts"
//             text="Certified and experienced audit professionals."
//           />
//         </div>
//       </section>

//       {/* ================= MAP SECTION ================= */}
//       <section className="relative">
//         <div className="absolute top-8 left-8 bg-white p-6 rounded-2xl shadow-xl z-10">
//           <h4 className="font-bold text-lg mb-2">Visit Our Dubai Office</h4>
//           <button className="text-primary font-semibold">
//             Open in Google Maps →
//           </button>
//         </div>

//         <iframe
//           src="https://www.google.com/maps/embed?..."
//           className="w-full h-[500px] rounded-t-[40px]"
//           loading="lazy"
//         />
//       </section>
//     </div>
//   );
// }

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaAward,
  FaBolt,
  FaShieldAlt,
} from "react-icons/fa";

function TrustCard({ icon, title, text }) {
  return (
    <div
      className="group relative bg-white p-8 rounded-3xl 
      border border-gray-100
      shadow-[0_10px_30px_rgba(0,0,0,0.06)]
      hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
      transition-all duration-500 hover:-translate-y-2 text-center overflow-hidden"
    >
      {/* subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-all transform duration-500" />

      {/* Icon */}
      <div
        className="relative z-10 w-16 h-16 mx-auto mb-5 flex items-center justify-center 
        rounded-2xl bg-gradient-to-br from-primary to-primary
        text-white text-2xl shadow-lg group-hover:scale-110 transition-all transform duration-500"
      >
        {icon}
      </div>

      {/* Title */}
      <h4 className="relative z-10 font-bold text-lg mb-2">{title}</h4>

      {/* Text */}
      <p className="relative z-10 text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl py-5 px-6 hover:bg-white/20 transition">
      <div className="text-2xl font-bold">{number}</div>
      <div className="text-sm opacity-80">{label}</div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section className="bg-[#F7F5FB] py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* Card */}
          <ContactCard
            icon={<FaPhoneAlt />}
            title="Make An Inquiry"
            text="Speak with our experts directly."
            value="0207 100 3610"
          />

          <ContactCard
            icon={<FaEnvelope />}
            title="Email Us"
            text="Send us your inquiries."
            value="enquiries@mah.uk.com"
          />

          <ContactCard
            icon={<FaMapMarkerAlt />}
            title="Our Office"
            text="Visit our office location."
            value="2nd Floor, 154 Bishopsgate, London, EC2M 4LN"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100">
          <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
          <p className="text-gray-600 mb-6">
            Have a question or need a consultation? Fill out the form below.
          </p>

          <form className="space-y-5">
            <Input label="Full Name" placeholder="Enter Your Name" />
            <Input label="Email" placeholder="Enter Email Address" required />
            <Input label="Subject" placeholder="Subject" />

            <div>
              <label className="text-sm font-medium">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 transition-all transform duration-500"
              />
            </div>

            <button className="group flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-purple-800 transition">
              Submit Form
              <FaArrowRight className="group-hover:translate-x-1 transition" />
            </button>
          </form>
        </div>
      </div>
      <section className="py-12 custom-container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <TrustCard
            icon={<FaShieldAlt />}
            title="100% Confidential"
            text="Your consultation remains strictly private."
          />

          <TrustCard
            icon={<FaBolt />}
            title="Fast Response"
            text="We respond within 24 business hours."
          />

          <TrustCard
            icon={<FaAward />}
            title="Award Winning Experts"
            text="Certified and experienced audit professionals."
          />
        </div>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="relative">
        {/* Map Info Card */}
        {/* <div className="absolute top-8 left-8 bg-white p-6 rounded-2xl shadow-xl z-10 max-w-xs">
          <h4 className="font-bold text-lg mb-2">Visit Our London Office</h4>
          <p className="text-sm text-gray-600 mb-3">
            2nd Floor, 154 Bishopsgate, London, EC2M 4LN
          </p>

          <a
            href="https://maps.google.com/?q=154 Bishopsgate London EC2M 4LN"
            target="_blank"
            className="text-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            Open in Google Maps →
          </a>
        </div> */}

        {/* Google Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.790976670633!2d-0.0831630233793412!3d51.517050671815426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cb2f2edc5a7%3A0x3535268d3ce861b6!2s154%20Bishopsgate%2C%20London%20EC2M%204LN%2C%20UK!5e0!3m2!1sen!2sbd!4v1774501962827!5m2!1sen!2sbd"
          className="w-full h-[500px] rounded-t-[40px]"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </section>
  );
}

/* Contact Card */
function ContactCard({ icon, title, text, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl
          bg-purple-100 text-primary text-lg
          group-hover:scale-110 transition"
        >
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm mb-1">{text}</p>
          <p className="text-primary font-medium">{value}</p>
        </div>
      </div>
    </div>
  );
}

/* Input Field */
function Input({ label, placeholder, required }) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full mt-1 p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 transition-all transform duration-500"
      />
    </div>
  );
}
