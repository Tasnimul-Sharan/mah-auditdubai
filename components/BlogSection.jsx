"use client";
import Image from "next/image";
import {
  FaArrowRight,
  FaBookOpen,
  FaRegCalendarAlt,
  FaRegUser,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "./Button";
import SectionBadge from "./SectionBadge";
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
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BlogSection() {
  return (
    <section className="py-24 bg-secondary/5 relative">
      <div className="custom-container mx-auto">
        {/* ================= Header ================= */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="mb-4">
              <SectionBadge icon={FaBookOpen} className="mb-0">
                Insights & Resources
              </SectionBadge>
            </div>

            <h2 className="md:text-4xl text-3xl font-bold text-gray-900 mt-3 leading-tight">
              Audit & Compliance Insights in Dubai
            </h2>

            <p className="text-gray-600 mt-3 max-w-xl">
              Expert insights on auditing, VAT, and compliance to help your
              business stay secure, compliant, and growth-ready in the UAE.
            </p>
          </div>

          <Link href="/blogs">
            <Button variant="primary" size="md">
              View All Insights
            </Button>
          </Link>
        </div>

        {/* ================= Blog Cards ================= */}
                <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {blogs.slice(0, 3).map((blog) => (
            <motion.article key={blog.id} variants={cardVariants}>
              <Link
                href={`/blogs/${blog.slug}`}
                className="block group rounded-xl bg-white overflow-hidden border
        hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={blog.img}
                  alt={blog.title}
                  fill
                  className="object-cover rounded transform transition-all duration-1000 group-hover:scale-125"
                />
              </div>
              <div className="mt-4 p-6">
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                  {/* DATE */}
                  <span className="flex items-center gap-2 font-medium">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      <FaRegCalendarAlt />
                    </span>
                    {blog.date}
                  </span>

                  {/* AUTHOR */}
                  <span className="flex items-center gap-2 font-medium">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      <FaRegUser />
                    </span>
                    By: {blog.author}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-500">
                  {blog.title}
                </h3>

                <p className="text-gray-600 text-sm">{blog.excerpt}</p>
                {/* <div
                                href={`/blogs/${blog.slug}`}
                                className="relative mt-2 inline-flex items-center gap-1 text-primary group-hover:text-secondary text-sm font-semibold transition-all transform duration-500 group"
                              >
                                Read More <FiArrowRight className="group-hover:translate-x-2" />
                                <span className="hover-line absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
                              </div> */}
                <div className="relative mt-2 inline-flex items-center gap-2 text-secondary text-sm font-semibold transition-all duration-300 group">
                  {/* TEXT */}
                  <span className="relative transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
                    Read More
                  </span>

                  {/* ARROW */}
                  <FiArrowRight className="transition-all duration-500 group-hover:translate-x-2 group-hover:text-primary" />

                  {/* UNDERLINE (smooth reveal) */}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>

                  {/* GLOW EFFECT (extra premium) */}
                  <span className="absolute inset-0 rounded-md bg-primary/10 opacity-0 blur-md transition duration-300 group-hover:opacity-100"></span>
                </div>
                </div>
                </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// <motion.article
//   key={blog.id}
//   variants={cardVariants}
//   className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
// >
//     <motion.div
//       whileHover={{ scale: 1.08 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="relative w-full h-full"
//     >
//       <Image
//         src={blog.img}
//         alt={blog.title}
//         fill
//         className="object-cover"
//       />
//     </motion.div>
//   </div>

//   {/* Content */}
//   <div className="p-7">
//     <div className="flex items-center gap-4 mb-4">
//       <span className="inline-flex items-center text-xs font-semibold tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
//         {blog.date}
//       </span>

//       <div className="flex items-center gap-2 text-gray-500 text-xs">
//         <FaRegUser />
//         <span>{blog.author}</span>
//       </div>
//     </div>

//     <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-5">
//       {blog.title}
//     </h3>

//     <Link href={`/blogs/${blog.slug}`}>
//       <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
//         Read Article <FaArrowRight />
//       </span>
//     </Link>
//   </div>
// </motion.article>
