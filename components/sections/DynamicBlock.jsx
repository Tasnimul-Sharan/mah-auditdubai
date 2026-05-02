import Image from "next/image";

export default function DynamicBlock({ section }) {
  const content = section?.content || {};
  const settings = section?.settings || {};

  const bgClass =
    settings.bg === "dark"
      ? "bg-secondary text-white"
      : settings.bg === "gray"
        ? "bg-slate-50 text-secondary"
        : "bg-white text-secondary";

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
          <div className="relative mb-10 h-[420px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
            <Image
              src={content.image}
              alt={content.title || "Section image"}
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
          </div>
        )}

        {/* Multiple Images Gallery */}
        {Array.isArray(content.images) && content.images.length > 0 && (
          <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.images.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className="group rounded-3xl border border-slate-100 bg-white p-2 shadow-[0_15px_45px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(15,23,42,0.14)]"
              >
                <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={img}
                    alt={`${content.title || "Gallery image"} ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
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
                  <div className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.title || "Item image"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                )}

                {item.title && (
                  <h3 className="mb-3 text-xl font-bold text-secondary">
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
