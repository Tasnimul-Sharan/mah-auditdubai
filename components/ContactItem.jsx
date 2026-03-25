function ContactItem({ icon, title, text, href }) {
  return (
    <a
      href={href}
      className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300 hover:shadow-lg"
    >
      <div
        className="w-12 h-12 flex items-center justify-center rounded-xl 
        bg-gradient-to-br from-[#5E1B89]/20 to-[#8F2DA8]/20
        text-[#8F2DA8] text-lg
        group-hover:scale-110 transition"
      >
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-lg text-[#1C1C1E]">{title}</h4>
        <p className="text-gray-600 group-hover:text-black transition">
          {text}
        </p>
      </div>
    </a>
  );
}
