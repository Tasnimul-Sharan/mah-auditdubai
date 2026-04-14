import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const blogDetailsData = {

  blogDetails: [
    {
      slug: "forensic-audit-dubai",
      blogPost: {
        title: "Forensic Audit in Dubai: Detecting Fraud & Ensuring Compliance",
        image: "/blogs/dubai-audit/audit-1.jpg",
        author: "Ahmed Al Rashid",
        date: "18 AUGUST, 2025",
        description:
          "Forensic auditing is a specialized practice aimed at uncovering fraud, embezzlement, and financial discrepancies in organizations. In Dubai’s highly regulated financial and corporate environment, forensic audits help businesses maintain transparency, ensure regulatory compliance, and mitigate risks before they escalate.\n\nOur approach combines meticulous financial analysis, data-driven investigation, and adherence to UAE legal standards. From tracing suspicious transactions to assessing internal control weaknesses, forensic audits provide actionable insights that strengthen governance and protect stakeholder interests.",
        checklist: [
          "Comprehensive review of financial records and transactions.",
          "Identification of fraud, misappropriation, and irregularities.",
          "Application of advanced data analytics for pattern detection.",
          "Preparation of legally admissible audit reports.",
          "Evaluation of internal control systems for risk mitigation.",
        ],
        highlights: [
          "Prevents financial loss through early detection of fraud.",
          "Supports regulatory compliance and corporate governance.",
          "Provides management with actionable risk insights.",
          "Enhances investor confidence and corporate credibility.",
        ],
        subImages: [
          "/blogs/dubai-audit/audit-2.jpg",
          "/blogs/dubai-audit/audit-3.jpg",
        ],
        quote:
          "Forensic auditing is not just about finding fraud — it’s about protecting the future of your business.",
        postTags: [
          "Forensic Audit",
          "Fraud Detection",
          "Dubai Compliance",
          "Corporate Governance",
        ],
      },
      socialIcons: [
        {
          icon: FaFacebookF,
          link: (url) =>
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
          icon: FaXTwitter,
          link: (url, title) =>
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              url,
            )}&text=${encodeURIComponent(title)}`,
        },
        {
          icon: FaLinkedinIn,
          link: (url, title) =>
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              url,
            )}&title=${encodeURIComponent(title)}`,
        },
        {
          icon: FaInstagram,
          link: () => `https://www.instagram.com/yourcompany/`,
        },
      ],
    },
    {
      slug: "vat-compliance-uae",
      blogPost: {
        title: "VAT Compliance in UAE: Avoid Penalties & Stay Compliant",
        image: "/blogs/dubai-audit/vat-1.jpg",
        author: "Fatima Noor",
        date: "20 AUGUST, 2025",
        description:
          "VAT compliance is a critical requirement for businesses operating in the UAE. From proper registration to timely filing, companies must adhere to strict Federal Tax Authority (FTA) regulations. Non-compliance can lead to heavy penalties and reputational damage.\n\nOur VAT compliance services ensure accurate record-keeping, timely return filing, and adherence to UAE tax laws. We help businesses streamline their VAT processes, minimize risks, and maintain full regulatory compliance.",
        checklist: [
          "VAT registration and deregistration assistance.",
          "Accurate VAT return preparation and filing.",
          "Review of financial records for VAT compliance.",
          "Advisory on VAT exemptions and zero-rated supplies.",
          "FTA audit support and documentation preparation.",
        ],
        highlights: [
          "Avoid costly fines and penalties.",
          "Ensure full compliance with UAE VAT laws.",
          "Improve financial transparency and reporting.",
          "Gain expert guidance on tax planning strategies.",
        ],
        subImages: [
          "/blogs/dubai-audit/vat-2.jpg",
          "/blogs/dubai-audit/vat-3.jpg",
        ],
        quote:
          "VAT compliance is not optional — it’s essential for sustainable business growth in the UAE.",
        postTags: [
          "VAT UAE",
          "Tax Compliance",
          "FTA Regulations",
          "Dubai Business",
        ],
      },
      socialIcons: [],
    },
    {
      slug: "internal-audit-best-practices",
      blogPost: {
        title: "Internal Audit Best Practices for UAE Companies",
        image: "/blogs/dubai-audit/internal-1.jpg",
        author: "Omar Hassan",
        date: "15 AUGUST, 2025",
        description:
          "Internal audits play a vital role in strengthening corporate governance and improving operational efficiency. In the UAE, businesses must implement strong internal controls to identify risks and ensure compliance with regulatory standards.\n\nA well-structured internal audit framework helps organizations detect inefficiencies, prevent fraud, and optimize business processes. Our internal audit services are tailored to align with UAE regulations and international best practices.",
        checklist: [
          "Evaluation of internal control systems.",
          "Risk assessment and mitigation planning.",
          "Operational efficiency analysis.",
          "Compliance review with UAE regulations.",
          "Recommendations for process improvement.",
        ],
        highlights: [
          "Enhances business efficiency and performance.",
          "Reduces operational and financial risks.",
          "Strengthens internal control mechanisms.",
          "Ensures compliance with regulatory frameworks.",
        ],
        subImages: [
          "/blogs/dubai-audit/internal-2.jpg",
          "/blogs/dubai-audit/internal-3.jpg",
        ],
        quote:
          "Strong internal audits build the foundation of a resilient and compliant organization.",
        postTags: [
          "Internal Audit",
          "Risk Management",
          "UAE Compliance",
          "Business Efficiency",
        ],
      },
      socialIcons: [
        {
          icon: FaFacebookF,
          link: (url) =>
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
          icon: FaXTwitter,
          link: (url, title) =>
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              url,
            )}&text=${encodeURIComponent(title)}`,
        },
        {
          icon: FaLinkedinIn,
          link: (url, title) =>
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              url,
            )}&title=${encodeURIComponent(title)}`,
        },
        {
          icon: FaInstagram,
          link: () => `https://www.instagram.com/yourcompany/`,
        },
      ],
    },
    {
      slug: "corporate-tax-uae",
      blogPost: {
        title: "Corporate Tax in UAE: What Businesses Must Know",
        image: "/blogs/dubai-audit/tax-1.jpg",
        author: "Ahmed Al Rashid",
        date: "10 AUGUST, 2025",
        description:
          "The introduction of corporate tax in the UAE marks a significant shift in the business landscape. Companies must now understand tax obligations, exemptions, and compliance requirements to avoid penalties and ensure smooth operations.\n\nOur corporate tax advisory services help businesses navigate the complexities of UAE tax regulations, ensuring accurate reporting, strategic planning, and full compliance with the law.",
        checklist: [
          "Corporate tax registration and compliance.",
          "Tax planning and advisory services.",
          "Preparation of financial statements for tax filing.",
          "Assessment of tax exemptions and reliefs.",
          "Support during FTA audits and reviews.",
        ],
        highlights: [
          "Ensures compliance with UAE corporate tax laws.",
          "Minimizes tax liabilities through proper planning.",
          "Avoids penalties and legal complications.",
          "Supports sustainable financial growth.",
        ],
        subImages: [
          "/blogs/dubai-audit/tax-2.jpg",
          "/blogs/dubai-audit/tax-3.jpg",
        ],
        quote:
          "Understanding corporate tax today ensures business stability tomorrow.",
        postTags: [
          "Corporate Tax UAE",
          "Tax Planning",
          "FTA Compliance",
          "Business Strategy",
        ],
      },
      socialIcons: [
        {
          icon: FaFacebookF,
          link: (url) =>
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
          icon: FaXTwitter,
          link: (url, title) =>
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              url,
            )}&text=${encodeURIComponent(title)}`,
        },
        {
          icon: FaLinkedinIn,
          link: (url, title) =>
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              url,
            )}&title=${encodeURIComponent(title)}`,
        },
        {
          icon: FaInstagram,
          link: () => `https://www.instagram.com/yourcompany/`,
        },
      ],
    },
    {
      slug: "external-audit-dubai",
      blogPost: {
        title: "External Audit Requirements in Dubai",
        image: "/blogs/dubai-audit/external-1.jpg",
        author: "Fatima Noor",
        date: "07 AUGUST, 2025",
        description:
          "External audits are essential for ensuring financial transparency and compliance in Dubai. Many businesses are legally required to undergo annual audits to maintain credibility and meet regulatory standards.\n\nOur external audit services provide independent and objective evaluation of financial statements, ensuring accuracy, compliance, and trust among stakeholders.",
        checklist: [
          "Independent review of financial statements.",
          "Compliance with international auditing standards.",
          "Identification of financial discrepancies.",
          "Audit reporting and documentation.",
          "Regulatory compliance verification.",
        ],
        highlights: [
          "Enhances credibility with investors and stakeholders.",
          "Ensures compliance with legal requirements.",
          "Improves financial transparency.",
          "Builds trust in financial reporting.",
        ],
        subImages: [
          "/blogs/dubai-audit/external-2.jpg",
          "/blogs/dubai-audit/external-3.jpg",
        ],
        quote:
          "An external audit is a mark of trust and transparency in business.",
        postTags: [
          "External Audit",
          "Dubai Audit",
          "Financial Reporting",
          "Compliance",
        ],
      },
      socialIcons: [
        {
          icon: FaFacebookF,
          link: (url) =>
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
          icon: FaXTwitter,
          link: (url, title) =>
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              url,
            )}&text=${encodeURIComponent(title)}`,
        },
        {
          icon: FaLinkedinIn,
          link: (url, title) =>
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              url,
            )}&title=${encodeURIComponent(title)}`,
        },
        {
          icon: FaInstagram,
          link: () => `https://www.instagram.com/yourcompany/`,
        },
      ],
    },
    {
      slug: "risk-management-strategies",
      blogPost: {
        title: "Risk Management Strategies for Modern Businesses",
        image: "/blogs/dubai-audit/risk-1.jpg",
        author: "Omar Hassan",
        date: "03 AUGUST, 2025",
        description:
          "In today’s dynamic business environment, effective risk management is crucial for long-term success. UAE companies must identify, assess, and mitigate risks to protect their operations and financial stability.\n\nOur risk management strategies help businesses develop proactive frameworks, ensuring resilience against financial, operational, and regulatory risks.",
        checklist: [
          "Identification of key business risks.",
          "Risk assessment and impact analysis.",
          "Development of mitigation strategies.",
          "Implementation of risk control systems.",
          "Continuous monitoring and reporting.",
        ],
        highlights: [
          "Protects businesses from financial losses.",
          "Enhances decision-making capabilities.",
          "Improves operational resilience.",
          "Supports long-term business sustainability.",
        ],
        subImages: [
          "/blogs/dubai-audit/risk-2.jpg",
          "/blogs/dubai-audit/risk-3.jpg",
        ],
        quote:
          "Managing risks effectively is the key to sustainable business success.",
        postTags: [
          "Risk Management",
          "Business Strategy",
          "UAE Companies",
          "Compliance",
        ],
      },
      socialIcons: [
        {
          icon: FaFacebookF,
          link: (url) =>
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
          icon: FaXTwitter,
          link: (url, title) =>
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              url,
            )}&text=${encodeURIComponent(title)}`,
        },
        {
          icon: FaLinkedinIn,
          link: (url, title) =>
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              url,
            )}&title=${encodeURIComponent(title)}`,
        },
        {
          icon: FaInstagram,
          link: () => `https://www.instagram.com/yourcompany/`,
        },
      ],
    },
  ],
};
