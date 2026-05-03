import Image from "next/image";

function optimizeCloudinaryUrl(src, width = 900) {
  if (!src) return "";

  if (!src.includes("res.cloudinary.com")) {
    return src;
  }

  if (!src.includes("/image/upload/")) {
    return src;
  }

  if (
    src.includes("/image/upload/f_auto") ||
    src.includes("/image/upload/q_auto")
  ) {
    return src;
  }

  return src.replace(
    "/image/upload/",
    `/image/upload/f_auto,q_auto,w_${width}/`,
  );
}

export default function OptimizedImage({
  src,
  alt = "Image",
  width = 900,
  height = 600,
  fill = false,
  sizes,
  className = "",
  priority = false,
  quality,
}) {
  const optimizedSrc = optimizeCloudinaryUrl(src, width);

  if (!optimizedSrc) return null;

  if (fill) {
    return (
      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        sizes={sizes || "100vw"}
        priority={priority}
        quality={quality}
        className={className}
      />
    );
  }

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
      priority={priority}
      quality={quality}
      className={className}
    />
  );
}