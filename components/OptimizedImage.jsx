import Image from "next/image";

function isCloudinaryUrl(src) {
  return typeof src === "string" && src.includes("res.cloudinary.com");
}

function isBlobUrl(src) {
  return typeof src === "string" && src.startsWith("blob:");
}

function optimizeCloudinaryUrl(src, width = 900, quality, aspectRatio) {
  if (!src) return "";

  if (!isCloudinaryUrl(src)) {
    return src;
  }

  if (!src.includes("/image/upload/")) {
    return src;
  }

  const safeWidth = Math.max(80, Math.round(Number(width) || 900));
  const qualityTransform = quality ? `q_${quality}` : "q_auto:low";
  const ratioTransform =
    typeof aspectRatio === "string" && aspectRatio.trim()
      ? `c_fill,g_auto,ar_${aspectRatio.trim()},w_${safeWidth}`
      : `c_limit,w_${safeWidth}`;
  const [base, path = ""] = src.split("/image/upload/");

  const segments = path.split("/");
  const firstSegment = segments[0] || "";

  const hasCloudinaryTransform =
    firstSegment.includes(",") ||
    /^(f_|q_|c_|w_|h_|dpr_|ar_|g_|e_)/.test(firstSegment);

  const cleanPath = hasCloudinaryTransform ? segments.slice(1).join("/") : path;

  return `${base}/image/upload/f_auto,${qualityTransform},${ratioTransform}/${cleanPath}`;
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
  aspectRatio,
  unoptimized = false,
  ...props
}) {
  const optimizedSrc =
    isCloudinaryUrl(src) && unoptimized
      ? optimizeCloudinaryUrl(src, width, quality, aspectRatio)
      : src;

  if (!optimizedSrc) return null;

  const shouldUseCloudinaryLoader = isCloudinaryUrl(src) && !unoptimized;
  const shouldUnoptimize = unoptimized || isBlobUrl(src);
  const loader = shouldUseCloudinaryLoader
    ? ({ src: loaderSrc, width: loaderWidth }) =>
        optimizeCloudinaryUrl(loaderSrc, loaderWidth, quality, aspectRatio)
    : undefined;

  if (fill) {
    return (
      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        loader={loader}
        sizes={sizes || "100vw"}
        priority={priority}
        quality={quality}
        unoptimized={shouldUnoptimize}
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
      loader={loader}
      sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
      priority={priority}
      quality={quality}
      unoptimized={shouldUnoptimize}
      className={className}
      {...props}
    />
  );
}
