export const SITE_NAME = "MAH Audit Dubai";
export const SITE_URL = "https://mah-auditdubai.ae";
export const SITE_LOGO = `${SITE_URL}/logo.png`;

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function absoluteUrl(value, fallback = SITE_URL) {
  const url = cleanString(value);

  if (!url) return fallback;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function parseArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

export function firstNonEmpty(...values) {
  return values.find((value) => cleanString(value)) || "";
}

function getContactCards(contactPage) {
  const contactInfo = contactPage?.contact_info;

  if (Array.isArray(contactInfo)) return contactInfo;
  if (Array.isArray(contactInfo?.cards)) return contactInfo.cards;

  return parseArray(contactInfo?.cards || contactInfo);
}

function findContactValue(contactPage, type) {
  const card = getContactCards(contactPage).find((item) => {
    const haystack = `${item?.icon || ""} ${item?.title || ""}`.toLowerCase();
    return haystack.includes(type);
  });

  return firstNonEmpty(card?.value, card?.text);
}

export function createBreadcrumbSchema(items = []) {
  const itemListElement = items
    .filter((item) => item?.name && item?.url)
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    }));

  if (!itemListElement.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export function createAggregateRatingSchema(testimonials = []) {
  const ratings = testimonials
    .map((item) => Number(item?.rating))
    .filter((rating) => Number.isFinite(rating) && rating >= 1 && rating <= 5);

  if (!ratings.length) return null;

  const ratingValue =
    ratings.reduce((total, rating) => total + rating, 0) / ratings.length;

  return {
    "@type": "AggregateRating",
    ratingValue: Number(ratingValue.toFixed(1)),
    reviewCount: ratings.length,
    bestRating: 5,
    worstRating: 1,
  };
}

export function createReviewSchemas(testimonials = []) {
  return testimonials
    .filter((item) => item?.text && item?.name)
    .slice(0, 10)
    .map((item) => ({
      "@type": "Review",
      reviewBody: item.text,
      author: {
        "@type": "Person",
        name: item.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: Number(item.rating) || 5,
        bestRating: 5,
        worstRating: 1,
      },
    }));
}

export function createBusinessSchema({
  url = SITE_URL,
  image,
  description,
  contactPage,
  services = [],
  testimonials = [],
} = {}) {
  const telephone = findContactValue(contactPage, "phone");
  const email = findContactValue(contactPage, "email");
  const streetAddress = findContactValue(contactPage, "location");
  const aggregateRating = createAggregateRatingSchema(testimonials);
  const reviews = createReviewSchemas(testimonials);

  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: absoluteUrl(url),
    logo: SITE_LOGO,
    image: absoluteUrl(image, SITE_LOGO),
    description:
      cleanString(description) ||
      "Audit, accounting, VAT, tax and advisory services in Dubai, UAE.",
    telephone: telephone || undefined,
    email: email || undefined,
    priceRange: "$$",
    areaServed: {
      "@type": "Place",
      name: "Dubai, UAE",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: streetAddress || undefined,
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    serviceType: services
      .map((service) => service?.title)
      .filter(Boolean)
      .slice(0, 20),
    sameAs: [
      contactPage?.facebook,
      contactPage?.linkedin,
      contactPage?.instagram,
      contactPage?.youtube,
    ].filter(Boolean),
    aggregateRating: aggregateRating || undefined,
    review: reviews.length ? reviews : undefined,
  };
}

export function createFAQPageSchema(faqs = []) {
  const mainEntity = parseArray(faqs)
    .filter((faq) => faq?.question && faq?.answer)
    .map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }));

  if (!mainEntity.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

export function createWebPageSchema({ type = "WebPage", title, url, description }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    url: absoluteUrl(url),
    description,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@id": `${SITE_URL}/#business`,
    },
  };
}

export function createBlogPostingSchema({ blog, url }) {
  if (!blog) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: absoluteUrl(blog.image, SITE_LOGO),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(url),
    },
    author: {
      "@type": "Person",
      name: blog.author || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: SITE_LOGO,
      },
    },
    datePublished: blog.date || blog.created_at,
    dateModified: blog.updated_at || blog.date || blog.created_at,
    keywords: parseArray(blog.posttags).join(", ") || undefined,
  };
}

export function createServiceSchema({ service, url, image, description }) {
  if (!service) return null;

  const serviceDescription =
    description ||
    service.hero?.description1 ||
    service.description ||
    "Professional audit, accounting, tax and advisory service in Dubai, UAE.";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.hero?.title || service.title,
    url: absoluteUrl(url),
    image: absoluteUrl(image || service.image, SITE_LOGO),
    description: serviceDescription,
    provider: {
      "@id": `${SITE_URL}/#business`,
    },
    areaServed: {
      "@type": "Place",
      name: "Dubai, UAE",
    },
    serviceType: service.title,
  };
}
