"use client";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const blogs = [
  {
    id: 1,
    img: "/blogs/blog-1.jpg",
    date: "September 25, 2025",
    author: "Ahmed Al Rashid",
    title: "Forensic Audit in Dubai: Detecting Financial Fraud",
    excerpt:
      "Forensic audits play a critical role in identifying fraud, financial misconduct, and irregularities in UAE businesses. Learn how expert auditors uncover hidden risks and ensure legal compliance.",
    slug: "forensic-audit-dubai",
  },
  {
    id: 2,
    img: "/blogs/blog-2.jpg",
    date: "September 20, 2025",
    author: "Fatima Noor",
    title: "VAT Compliance in UAE: Avoid Penalties",
    excerpt:
      "Understanding VAT regulations is essential for businesses in Dubai. This guide explains registration, filing requirements, and how to avoid costly penalties through proper compliance.",
    slug: "vat-compliance-uae",
  },
  {
    id: 3,
    img: "/blogs/blog-3.jpg",
    date: "September 15, 2025",
    author: "Omar Hassan",
    title: "Internal Audit Best Practices for UAE Companies",
    excerpt:
      "A strong internal audit framework helps organizations reduce risks and improve efficiency. Discover best practices tailored for UAE businesses and regulatory standards.",
    slug: "internal-audit-best-practices",
  },
  {
    id: 4,
    img: "/blogs/blog-4.jpg",
    date: "September 10, 2025",
    author: "Ahmed Al Rashid",
    title: "Corporate Tax in UAE: What Businesses Must Know",
    excerpt:
      "With the introduction of corporate tax in the UAE, companies must adapt quickly. Learn about tax rates, exemptions, and compliance strategies for smooth operations.",
    slug: "corporate-tax-uae",
  },
  {
    id: 5,
    img: "/blogs/blog-5.jpg",
    date: "September 7, 2025",
    author: "Fatima Noor",
    title: "External Audit Requirements in Dubai",
    excerpt:
      "External audits are mandatory for many businesses in Dubai. Understand the requirements, reporting standards, and how audits enhance credibility with stakeholders.",
    slug: "external-audit-dubai",
  },
  {
    id: 6,
    img: "/blogs/blog-6.jpg",
    date: "September 3, 2025",
    author: "Omar Hassan",
    title: "Risk Management Strategies for Modern Businesses",
    excerpt:
      "Effective risk management is essential in today’s dynamic business environment. Learn how UAE companies can identify, assess, and mitigate financial and operational risks.",
    slug: "risk-management-strategies",
  },
  // {
  //   id: 7,
  //   img: "/blogs/blog-7.jpg",
  //   date: "August 30, 2025",
  //   author: "Ahmed Al Rashid",
  //   title: "IFRS Compliance in UAE: A Practical Guide",
  //   excerpt:
  //     "IFRS compliance ensures transparency and global standard reporting. This guide explains key IFRS principles and their impact on UAE businesses.",
  //   slug: "ifrs-compliance-uae",
  // },
  // {
  //   id: 8,
  //   img: "/blogs/blog-8.jpg",
  //   date: "August 25, 2025",
  //   author: "Fatima Noor",
  //   title: "Why Businesses in Dubai Need Professional Auditors",
  //   excerpt:
  //     "Hiring professional auditors enhances financial accuracy, compliance, and trust. Discover why expert audit services are essential for sustainable growth in Dubai.",
  //   slug: "professional-auditors-dubai",
  // },
];

export default function BlogPageSection() {
  return (
    <section className="py-20 bg-white relative">
      <div className="custom-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <Link href={`/blogs/${blog.slug}`}>
              <div
                key={blog.id}
                className="group rounded-xl overflow-hidden border"
              >
                <div className="relative w-full h-96 overflow-hidden">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    fill
                    className="object-cover rounded transform transition-all duration-1000 group-hover:scale-125"
                  />
                </div>
                <div className="mt-4 p-6">
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                    <span className="flex items-center gap-2">
                      <FaRegCalendarAlt className="text-primary" /> {blog.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaRegUser className="text-primary" /> By: {blog.author}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-secondary mb-2 hover:text-primary transition-colors duration-500">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm">{blog.excerpt}</p>
                  <div
                    href={`/blogs/${blog.slug}`}
                    className="relative mt-2 inline-flex items-center gap-1 text-primary text-sm font-semibold transition-all transform duration-500 group"
                  >
                    Read More <FiArrowRight />
                    <span className="hover-line absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
