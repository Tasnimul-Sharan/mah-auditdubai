import Image from "next/image";

function isCloudinaryUrl(src) {
  return typeof src === "string" && src.includes("res.cloudinary.com");
}

function optimizeCloudinaryUrl(src, width = 900) {
  if (!src) return "";

  if (!isCloudinaryUrl(src)) {
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
    `/image/upload/f_auto,q_auto,c_limit,w_${width}/`,
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
  ...props
}) {
  const optimizedSrc = optimizeCloudinaryUrl(src, width);
  const isCloudinary = isCloudinaryUrl(optimizedSrc);

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
        unoptimized={isCloudinary}
        className={className}
        {...props}
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
      unoptimized={isCloudinary}
      className={className}
      {...props}
    />
  );
}
