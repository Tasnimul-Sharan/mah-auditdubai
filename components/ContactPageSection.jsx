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

// "use client";
// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaArrowRight,
//   FaShieldAlt,
//   FaBolt,
//   FaAward,
// } from "react-icons/fa";

// /* ================= MAIN COMPONENT ================= */
// export default function ContactPage() {
//   return (
//     <div className="bg-[#F7F5FB]">
//       {/* ================= HERO ================= */}
//       <section className="text-center py-20 px-4">
//         <h1 className="text-4xl font-bold mb-4">
//           Let’s Talk About Your Project
//         </h1>
//         <p className="text-gray-600 max-w-xl mx-auto">
//           Have a question or need expert consultation? Reach out to us and we’ll
//           get back within 24 hours.
//         </p>
//       </section>

//       {/* ================= CONTACT CARDS ================= */}
//       <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4 mb-20">
//         <ContactCard
//           icon={<FaPhoneAlt />}
//           title="Call Us"
//           text="Speak directly with our team"
//           value="+44 0207 100 3610"
//         />
//         <ContactCard
//           icon={<FaEnvelope />}
//           title="Email Us"
//           text="Send your inquiry anytime"
//           value="enquiries@mah.uk.com"
//         />
//         <ContactCard
//           icon={<FaMapMarkerAlt />}
//           title="Visit Office"
//           text="Come meet us in person"
//           value="London, UK"
//         />
//       </section>

//       {/* ================= FORM ================= */}
//       <section className="max-w-3xl mx-auto px-4 mb-20">
//         <div className="bg-white p-10 rounded-3xl shadow-xl border">
//           <h2 className="text-2xl font-bold text-center mb-2">
//             Send Us a Message
//           </h2>

//           <p className="text-gray-600 text-center mb-6">
//             Fill out the form and we’ll get back to you shortly.
//           </p>

//           <form className="space-y-5">
//             <Input label="Full Name" placeholder="Your Name" />
//             <Input label="Email" placeholder="Your Email" required />
//             <Input label="Subject" placeholder="Subject" />

//             <select className="w-full p-3 border rounded-xl">
//               <option>Select Service</option>
//               <option>Audit</option>
//               <option>Accounting</option>
//               <option>Consulting</option>
//             </select>

//             <textarea
//               rows="4"
//               placeholder="Your Message"
//               className="w-full p-3 border rounded-xl"
//             />

//             <button className="mx-auto flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-purple-800 transition">
//               Submit Form
//               <FaArrowRight />
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* ================= TRUST ================= */}
//       <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4 mb-20">
//         <TrustCard
//           icon={<FaShieldAlt />}
//           title="100% Confidential"
//           text="Your data is fully secure"
//         />
//         <TrustCard
//           icon={<FaBolt />}
//           title="Fast Response"
//           text="Reply within 24 hours"
//         />
//         <TrustCard
//           icon={<FaAward />}
//           title="Expert Team"
//           text="Certified professionals"
//         />
//       </section>

//       {/* ================= FAQ ================= */}
//       <section className="max-w-4xl mx-auto px-4 mb-20">
//         <h2 className="text-2xl font-bold text-center mb-8">
//           Frequently Asked Questions
//         </h2>

//         <div className="space-y-4">
//           <Faq
//             q="How long does it take to respond?"
//             a="We usually respond within 24 business hours."
//           />
//           <Faq
//             q="Is consultation free?"
//             a="Yes, initial consultation is completely free."
//           />
//           <Faq
//             q="What services do you offer?"
//             a="We provide audit, accounting, and consulting services."
//           />
//         </div>
//       </section>

//       {/* ================= CTA ================= */}
//       <section className="text-center py-16 bg-white">
//         <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
//         <p className="text-gray-600 mb-6">
//           Book a free consultation with our experts.
//         </p>

//         <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-purple-800 transition">
//           Book a Call
//         </button>
//       </section>

//       {/* ================= MAP ================= */}
//       <section>
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18..."
//           className="w-full h-[400px]"
//           loading="lazy"
//         />
//       </section>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */

// function ContactCard({ icon, title, text, value }) {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
//       <div className="flex gap-4">
//         <div className="text-primary text-xl">{icon}</div>
//         <div>
//           <h4 className="font-semibold">{title}</h4>
//           <p className="text-sm text-gray-500">{text}</p>
//           <p className="text-primary">{value}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function TrustCard({ icon, title, text }) {
//   return (
//     <div className="bg-white p-6 rounded-2xl text-center shadow">
//       <div className="text-primary text-2xl mb-3">{icon}</div>
//       <h4 className="font-semibold">{title}</h4>
//       <p className="text-sm text-gray-500">{text}</p>
//     </div>
//   );
// }

// function Faq({ q, a }) {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow">
//       <h4 className="font-semibold">{q}</h4>
//       <p className="text-gray-600 text-sm mt-1">{a}</p>
//     </div>
//   );
// }

// function Input({ label, placeholder, required }) {
//   return (
//     <div>
//       <label className="text-sm font-medium">
//         {label} {required && "*"}
//       </label>
//       <input
//         type="text"
//         placeholder={placeholder}
//         className="w-full mt-1 p-3 border rounded-xl"
//       />
//     </div>
//   );
// }
