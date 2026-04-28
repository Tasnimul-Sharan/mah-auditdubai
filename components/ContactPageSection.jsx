// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaArrowRight,
//   FaAward,
//   FaBolt,
//   FaShieldAlt,
// } from "react-icons/fa";

// export default function ContactSection() {
//   return (
//     <section className="bg-[#F7F5FB] py-20">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
//         {/* LEFT SIDE */}
//         <div className="space-y-6">
//           {/* Card */}
//           <ContactCard
//             icon={<FaPhoneAlt />}
//             title="Make An Inquiry"
//             text="Speak with our experts directly."
//             value="0207 100 3610"
//           />

//           <ContactCard
//             icon={<FaEnvelope />}
//             title="Email Us"
//             text="Send us your inquiries."
//             value="enquiries@mah.uk.com"
//           />

//           <ContactCard
//             icon={<FaMapMarkerAlt />}
//             title="Our Office"
//             text="Visit our office location."
//             value="2nd Floor, 154 Bishopsgate, London, EC2M 4LN"
//           />
//         </div>

//         {/* RIGHT SIDE FORM */}
//         <div className="bg-white p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100">
//           <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
//           <p className="text-gray-600 mb-6">
//             Have a question or need a consultation? Fill out the form below.
//           </p>

//           <form className="space-y-5">
//             <Input label="Full Name" placeholder="Enter Your Name" />
//             <Input label="Email" placeholder="Enter Email Address" required />
//             <Input label="Subject" placeholder="Subject" />

//             <div>
//               <label className="text-sm font-medium">
//                 Your Message <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 rows="4"
//                 placeholder="Your Message"
//                 className="w-full mt-1 p-3 border border-gray-200 rounded-xl outline-none transition-all transform duration-500"
//               />
//             </div>

//             <button className="group flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary transition">
//               Submit Form
//               <FaArrowRight className="group-hover:translate-x-1 transition" />
//             </button>
//           </form>
//         </div>
//       </div>
//       {/* <section className="pt-12 custom-container mx-auto">
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
//       </section> */}

//       {/* ================= MAP SECTION ================= */}
//       {/* <section className="relative">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.790976670633!2d-0.0831630233793412!3d51.517050671815426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cb2f2edc5a7%3A0x3535268d3ce861b6!2s154%20Bishopsgate%2C%20London%20EC2M%204LN%2C%20UK!5e0!3m2!1sen!2sbd!4v1774501962827!5m2!1sen!2sbd"
//           className="w-full h-[500px] rounded"
//           style={{ border: 0 }}
//           allowFullScreen
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         />
//       </section> */}
//     </section>
//   );
// }

// /* Contact Card */
// function ContactCard({ icon, title, text, value }) {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
//       <div className="flex items-start gap-4">
//         <div
//           className="w-12 h-12 flex items-center justify-center rounded-xl
//           bg-primary/10 text-primary text-lg
//           group-hover:scale-110 transition"
//         >
//           {icon}
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <p className="text-gray-600 text-sm mb-1">{text}</p>
//           <p className="text-primary font-medium">{value}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* Input Field */
// function Input({ label, placeholder, required }) {
//   return (
//     <div>
//       <label className="text-sm font-medium">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type="text"
//         placeholder={placeholder}
//         className="w-full mt-1 p-3 border border-gray-200 rounded-xl outline-none transition-all transform duration-500"
//       />
//     </div>
//   );
// }

// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaArrowRight,
// } from "react-icons/fa";

// const icons = {
//   phone: <FaPhoneAlt />,
//   email: <FaEnvelope />,
//   location: <FaMapMarkerAlt />,
// };

// export default function ContactPageSection({ contactInfo }) {
//   const info = contactInfo || {};

//   const cards = info.cards || [
//     {
//       icon: "phone",
//       title: "Make An Inquiry",
//       text: "Speak with our experts directly.",
//       value: "0207 100 3610",
//     },
//     {
//       icon: "email",
//       title: "Email Us",
//       text: "Send us your inquiries.",
//       value: "enquiries@mah.uk.com",
//     },
//     {
//       icon: "location",
//       title: "Our Office",
//       text: "Visit our office location.",
//       value: "2nd Floor, 154 Bishopsgate, London, EC2M 4LN",
//     },
//   ];

//   return (
//     <section className="bg-[#F7F5FB] py-20">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">
//         <div className="space-y-6">
//           {cards.map((card, index) => (
//             <ContactCard
//               key={index}
//               icon={icons[card.icon] || <FaMapMarkerAlt />}
//               title={card.title}
//               text={card.text}
//               value={card.value}
//             />
//           ))}
//         </div>

//         <div className="bg-white p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100">
//           <h2 className="text-2xl font-bold mb-2">
//             {info.form_title || "Send Us a Message"}
//           </h2>

//           <p className="text-gray-600 mb-6">
//             {info.form_subtitle ||
//               "Have a question or need a consultation? Fill out the form below."}
//           </p>

//           <form className="space-y-5">
//             <Input label="Full Name" placeholder="Enter Your Name" />
//             <Input label="Email" placeholder="Enter Email Address" required />
//             <Input label="Subject" placeholder="Subject" />

//             <div>
//               <label className="text-sm font-medium">
//                 Your Message <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 rows="4"
//                 placeholder="Your Message"
//                 className="w-full mt-1 p-3 border border-gray-200 rounded-xl outline-none focus:border-primary transition-all duration-500"
//               />
//             </div>

//             <button className="group flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary transition-all duration-500">
//               {info.button_text || "Submit Form"}
//               <FaArrowRight className="group-hover:translate-x-1 transition" />
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ContactCard({ icon, title, text, value }) {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group">
//       <div className="flex items-start gap-4">
//         <div
//           className="w-12 h-12 flex items-center justify-center rounded-xl
//           bg-primary/10 text-primary text-lg
//           group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500"
//         >
//           {icon}
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <p className="text-gray-600 text-sm mb-1">{text}</p>
//           <p className="text-primary font-medium">{value}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Input({ label, placeholder, required }) {
//   return (
//     <div>
//       <label className="text-sm font-medium">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type="text"
//         placeholder={placeholder}
//         className="w-full mt-1 p-3 border border-gray-200 rounded-xl outline-none focus:border-primary transition-all duration-500"
//       />
//     </div>
//   );
// }

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const icons = {
  phone: <FaPhoneAlt />,
  email: <FaEnvelope />,
  location: <FaMapMarkerAlt />,
};

export default function ContactPageSection({ contactInfo }) {
  const info = contactInfo || {};

  const cards = info.cards || [
    {
      icon: "phone",
      title: "Make An Inquiry",
      text: "Speak with our experts directly.",
      value: "0207 100 3610",
    },
    {
      icon: "email",
      title: "Email Us",
      text: "Send us your inquiries.",
      value: "enquiries@mah.uk.com",
    },
    {
      icon: "location",
      title: "Our Office",
      text: "Visit our office location.",
      value: "2nd Floor, 154 Bishopsgate, London, EC2M 4LN",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F5FB] via-white to-[#F7F5FB] py-24">
      <div className="absolute -top-32 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[260px] w-[520px] rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
        <div className="space-y-5">
          {cards.map((card, index) => (
            <ContactCard
              key={index}
              icon={icons[card.icon] || <FaMapMarkerAlt />}
              title={card.title}
              text={card.text}
              value={card.value}
            />
          ))}
        </div>

        <div className="relative rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.09)] backdrop-blur-xl md:p-10">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

          <div className="relative">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Contact Form
            </span>

            <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
              {info.form_title || "Send Us a Message"}
            </h2>

            <p className="mb-8 leading-relaxed text-gray-600">
              {info.form_subtitle ||
                "Have a question or need a consultation? Fill out the form below."}
            </p>

            <form className="space-y-5">
              <Input label="Full Name" placeholder="Enter Your Name" />
              <Input label="Email" placeholder="Enter Email Address" required />
              <Input label="Subject" placeholder="Subject" />

              <div>
                <label className="text-sm font-semibold text-gray-800">
                  Your Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-white/80 p-4 outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]"
                />
              </div>

              <button
                type="submit"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-7 py-3.5 font-semibold text-white shadow-[0_14px_35px_rgba(0,0,0,0.18)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(0,0,0,0.25)]"
              >
                <span className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-r from-primary via-primary/80 to-secondary" />
                <span className="relative z-10">
                  {info.button_text || "Submit Form"}
                </span>
                <FaArrowRight className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, text, value }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_16px_45px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(0,0,0,0.11)]">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-primary/8 via-white to-secondary/8" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-lg text-primary transition-all duration-700 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg">
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="mb-2 text-sm text-gray-600">{text}</p>
          <p className="font-semibold text-primary">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Input({ label, placeholder, required }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-gray-200 bg-white/80 p-4 outline-none transition-all duration-500 focus:border-primary focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]"
      />
    </div>
  );
}