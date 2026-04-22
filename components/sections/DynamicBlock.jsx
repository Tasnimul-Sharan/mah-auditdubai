export default function DynamicBlock({ section }) {
  const content = section.content || {};

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* ================= TITLE ================= */}
        {content.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            {content.title}
          </h2>
        )}

        {/* ================= IMAGE ================= */}
        {content.image && (
          <div className="mb-8 flex justify-center">
            <img
              src={content.image}
              className="rounded-xl shadow-lg max-h-[400px] object-cover"
            />
          </div>
        )}

        {/* ================= TEXT ================= */}
        {content.text && (
          <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mb-10">
            {content.text}
          </p>
        )}

        {/* ================= ITEMS (CARD GRID) ================= */}
        {Array.isArray(content.items) && content.items.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.items.map((item, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl hover:shadow-xl transition bg-white"
              >
                {item.image && (
                  <img
                    src={item.image}
                    className="mb-4 rounded-lg h-40 w-full object-cover"
                  />
                )}

                {item.title && (
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                )}

                {item.desc && (
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ================= RAW HTML (OPTIONAL) ================= */}
        {content.html && (
          <div
            className="prose max-w-none mt-10"
            dangerouslySetInnerHTML={{ __html: content.html }}
          />
        )}
      </div>
    </section>
  );
}
