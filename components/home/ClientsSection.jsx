import { FaHandshake } from "react-icons/fa";
import SectionBadge from "../SectionBadge";
// import SectionBadge from "./SectionBadge";

export default function ClientsSection() {
  const clients = [
    "/clients/client1.png",
    "/clients/client2.png",
    "/clients/client3.png",
    "/clients/client4.png",
    "/clients/client5.png",
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/10 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <SectionBadge
              icon={FaHandshake}
              className="mb-0 flex items-center gap-2"
            >
              Our Clients
            </SectionBadge>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C2D]">
            Trusted by Leading Organizations
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We proudly partner with businesses across the UAE and globally,
            delivering trusted audit, compliance, and advisory solutions.
          </p>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {clients.map((logo, i) => (
            <div
              key={i}
              className="group bg-white/70 backdrop-blur-md border border-gray-100 
              p-6 rounded-2xl flex items-center justify-center
              shadow-sm hover:shadow-xl transition-all duration-300
              hover:-translate-y-1"
            >
              <img
                src={logo}
                alt="Client Logo"
                className="max-h-12 opacity-60 group-hover:opacity-100 
                transition duration-300 grayscale group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
