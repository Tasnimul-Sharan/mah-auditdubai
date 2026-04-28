// export default function DynamicBlock({ section }) {
//   const content = section.content || {};

//   return (
//     <section className="py-20">
//       <div className="max-w-6xl mx-auto px-6">
//         {/* ================= TITLE ================= */}
//         {content.title && (
//           <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
//             {content.title}
//           </h2>
//         )}

//         {/* ================= IMAGE ================= */}
//         {content.image && (
//           <div className="mb-8 flex justify-center">
//             <img
//               src={content.image}
//               className="rounded-xl shadow-lg max-h-[400px] object-cover"
//             />
//           </div>
//         )}

//         {/* ================= TEXT ================= */}
//         {content.text && (
//           <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mb-10">
//             {content.text}
//           </p>
//         )}

//         {/* ================= ITEMS (CARD GRID) ================= */}
//         {Array.isArray(content.items) && content.items.length > 0 && (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {content.items.map((item, i) => (
//               <div
//                 key={i}
//                 className="p-6 border rounded-xl hover:shadow-xl transition bg-white"
//               >
//                 {item.image && (
//                   <img
//                     src={item.image}
//                     className="mb-4 rounded-lg h-40 w-full object-cover"
//                   />
//                 )}

//                 {item.title && (
//                   <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
//                 )}

//                 {item.desc && (
//                   <p className="text-gray-500 text-sm">{item.desc}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ================= RAW HTML (OPTIONAL) ================= */}
//         {content.html && (
//           <div
//             className="prose max-w-none mt-10"
//             dangerouslySetInnerHTML={{ __html: content.html }}
//           />
//         )}
//       </div>
//     </section>
//   );
// }

export default function DynamicBlock({ section }) {
  const content = section?.content || {};
  const settings = section?.settings || {};

  const bgClass =
    settings.bg === "dark"
      ? "bg-[#0B1C2D] text-white"
      : settings.bg === "gray"
        ? "bg-slate-50 text-[#0B1C2D]"
        : "bg-white text-[#0B1C2D]";

  const alignClass =
    settings.align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <section className={`relative overflow-hidden py-20 ${bgClass}`}>
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          className={`mb-12 max-w-3xl ${
            settings.align === "center" ? "mx-auto text-center" : ""
          }`}
        >
          {section?.types?.name && (
            <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {section.types.name}
            </p>
          )}

          {content.title && (
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              {content.title}
            </h2>
          )}

          {content.text && (
            <p
              className={`mt-6 text-base leading-8 ${
                settings.bg === "dark" ? "text-white/70" : "text-slate-600"
              } ${alignClass}`}
            >
              {content.text}
            </p>
          )}
        </div>

        {/* Single Image */}
        {content.image && (
          <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
            <img
              src={content.image}
              alt={content.title || "Section image"}
              className="h-[420px] w-full object-cover"
            />
          </div>
        )}

        {/* Multiple Images Gallery */}
        {Array.isArray(content.images) && content.images.length > 0 && (
          <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.images.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className="group overflow-hidden rounded-3xl border border-slate-100 bg-white p-2 shadow-[0_15px_45px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(15,23,42,0.14)]"
              >
                <img
                  src={img}
                  alt={`${content.title || "Gallery image"} ${index + 1}`}
                  className="h-64 w-full rounded-2xl object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        {/* Items Card Grid */}
        {Array.isArray(content.items) && content.items.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item, i) => (
              <div
                key={i}
                className="group rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,0.06)] transition duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_25px_70px_rgba(15,23,42,0.12)]"
              >
                {item.image && (
                  <div className="mb-5 overflow-hidden rounded-2xl">
                    <img
                      src={item.image}
                      alt={item.title || "Item image"}
                      className="h-44 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                )}

                {item.title && (
                  <h3 className="mb-3 text-xl font-bold text-[#0B1C2D]">
                    {item.title}
                  </h3>
                )}

                {item.desc && (
                  <p className="text-sm leading-7 text-slate-600">
                    {item.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Raw HTML */}
        {content.html && (
          <div
            className="prose mt-10 max-w-none rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
            dangerouslySetInnerHTML={{ __html: content.html }}
          />
        )}
      </div>
    </section>
  );
}