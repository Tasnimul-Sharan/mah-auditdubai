"use client";

import { FaRegCalendarAlt, FaRegUser, FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "./Button";
import SectionBadge from "./SectionBadge";
import { FiArrowRight } from "react-icons/fi";
import OptimizedImage from "@/components/OptimizedImage";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const defaultSectionData = {
  badge: "Insights & Resources",
  title: "Audit & Compliance Insights in Dubai",
  subtitle:
    "Expert insights on auditing, VAT, and compliance to help your business stay secure, compliant, and growth-ready in the UAE.",
  buttonText: "View All Insights",
};

export default function BlogSection({
  blogs = [],
  sectionData = defaultSectionData,
}) {
  const section = {
    ...defaultSectionData,
    ...(sectionData || {}),
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="relative bg-secondary/5 py-24">
      <div className="custom-container mx-auto">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4">
              <SectionBadge icon={FaBookOpen}>{section.badge}</SectionBadge>
            </div>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              {section.title}
            </h2>

            <p className="mt-3 max-w-xl text-gray-600">{section.subtitle}</p>
          </div>

          <Link href="/blogs">
            <Button variant="primary">{section.buttonText}</Button>
          </Link>
        </div>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {blogs.slice(0, 3).map((blog) => (
              <motion.article key={blog.id} variants={cardVariants}>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="group/card block overflow-hidden rounded-xl border bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <OptimizedImage
                      src={blog.image || "/placeholder.jpg"}
                      alt={blog.title || "Blog Image"}
                      fill
                      width={800}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-all duration-1000 group-hover/card:scale-125"
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-2 font-medium">
                        <span className="rounded-lg bg-primary/10 p-2 text-primary">
                          <FaRegCalendarAlt />
                        </span>
                        {formatDate(blog.date)}
                      </span>

                      <span className="flex items-center gap-2 font-medium">
                        <span className="rounded-lg bg-primary/10 p-2 text-primary">
                          <FaRegUser />
                        </span>
                        {blog.author}
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-secondary transition-colors duration-500 group-hover/card:text-primary">
                      {blog.title}
                    </h3>

                    <p className="line-clamp-3 text-sm text-gray-600">
                      {blog.description}
                    </p>

                    <div className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-all duration-300">
                      <span className="relative transition-all duration-300 group-hover/card:translate-x-1 group-hover/card:text-primary">
                        Read More
                      </span>

                      <FiArrowRight className="transition-all duration-500 group-hover/card:translate-x-2 group-hover/card:text-primary" />

                      <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover/card:scale-x-100" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
