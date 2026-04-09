import AboutUsSection from "@/components/AboutUsSection";
import HeroSection from "@/components/HeroSection";
import Head from "next/head";
import FAQ from "@/components/FAQ";
import VisionMission from "@/components/VisionMission";
import OurPurposeSection from "@/components/OurPurposeSection";
import PremiumCTA from "@/components/PremiumCTA";
import WhyUs from "@/components/WhyUs";
import StatsSection from "@/components/StatsSection";
import ClientsSection from "@/components/home/ClientsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function AboutPage() {
  const meta = {
    title:
      "About | Bridge Pharmaceuticals Ltd. Leading Animal Health Company in Bangladesh",
    description:
      "Bridge Pharmaceuticals Ltd., established in 2010, is a leading Animal Health pharmaceutical manufacturer in Bangladesh specializing in Veterinary, Aquaculture, Nutritional Supplements, and Biosecurity solutions. Serving livestock, poultry, and fish farmers nationwide.",
    keywords:
      "Bridge Pharmaceuticals Ltd, animal health Bangladesh, veterinary medicine manufacturer Bangladesh, aquaculture pharmaceutical company, livestock medicine Bangladesh, poultry medicine company, biosecurity products Bangladesh, veterinary supplements Bangladesh",
    author: "Bridge Pharmaceuticals Ltd.",
    url: "https://bridgepharmabd.com/about",
    image: "https://bridgepharmabd.com/og-about.jpg",
  };

  const faqData = {
    title: "Frequently Asked Questions",
    faqs: [
      {
        question: "What audit services do you provide in Dubai?",
        answer:
          "We offer a full range of audit services including external audit, internal audit, VAT audit, forensic audit, and compliance advisory tailored to UAE regulations.",
      },
      {
        question: "Is audit mandatory for companies in Dubai?",
        answer:
          "Yes, many businesses in Dubai and the UAE are required to maintain audited financial statements depending on their license type, free zone regulations, and legal structure.",
      },
      {
        question: "What is VAT compliance in the UAE?",
        answer:
          "VAT compliance involves proper registration, accurate record keeping, timely filing of returns, and adherence to Federal Tax Authority (FTA) regulations to avoid penalties.",
      },
      {
        question: "How often should a company conduct an audit?",
        answer:
          "Most companies conduct audits annually, but internal audits and compliance checks can be performed quarterly or as needed for better financial control.",
      },
      {
        question: "What is the difference between internal and external audit?",
        answer:
          "Internal audits focus on improving internal processes and risk management, while external audits provide independent verification of financial statements for compliance and reporting.",
      },
      {
        question: "What is forensic audit and when is it needed?",
        answer:
          "A forensic audit is used to investigate financial fraud, misconduct, or irregularities. It is typically required in cases of disputes, legal investigations, or suspected fraud.",
      },
      {
        question: "How can audit services help my business?",
        answer:
          "Audit services improve financial transparency, ensure regulatory compliance, identify risks, and help businesses make informed strategic decisions.",
      },
      {
        question: "What documents are required for an audit?",
        answer:
          "Common documents include financial statements, invoices, bank statements, tax records, payroll data, and supporting business documents.",
      },
      {
        question: "Do you assist with VAT registration and filing?",
        answer:
          "Yes, we assist businesses with VAT registration, return filing, documentation, and ongoing compliance to ensure smooth operations.",
      },
      {
        question: "How long does an audit process take?",
        answer:
          "The duration depends on the size and complexity of the business, but typically audits take between 1 to 4 weeks.",
      },
      {
        question: "Are your audit services compliant with UAE regulations?",
        answer:
          "Yes, all our services follow UAE laws and are aligned with Federal Tax Authority (FTA) guidelines and international auditing standards.",
      },
      {
        question: "What industries do you serve?",
        answer:
          "We work with a wide range of industries including trading, manufacturing, real estate, technology, and professional services across the UAE.",
      },
      {
        question: "Can small businesses benefit from audit services?",
        answer:
          "Absolutely. Audit and compliance services help small businesses maintain accurate records, avoid penalties, and build credibility with stakeholders.",
      },
      {
        question: "How do you ensure data confidentiality?",
        answer:
          "We follow strict confidentiality protocols and use secure systems to protect all client data and financial information.",
      },
      {
        question: "How can I get started with your audit services?",
        answer:
          "You can contact us through our website, email, or phone to schedule a consultation and discuss your business requirements.",
      },
    ],
  };

  return (
    <div className="w-full relative">
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="author" content={meta.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.url} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:site_name" content="Bridge Pharmaceuticals Ltd." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="canonical" href={meta.url} />
      </Head>
      <HeroSection
        hero={{
          title: "About",
          backgroundImage: "/hero-bg.JPG",
        }}
      />
      <AboutUsSection />
      {/* <OurPurposeSection /> */}
      <VisionMission />
      <WhyUs />
      <StatsSection />
      <ClientsSection />
      <TestimonialsSection />
      <FAQ faqData={faqData} />
      <PremiumCTA />
    </div>
  );
}
