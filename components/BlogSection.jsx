"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegCalendarAlt, FaRegUser, FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "./Button";
import SectionBadge from "./SectionBadge";
import { FiArrowRight } from "react-icons/fi";
import { supabaseServer } from "@/lib/supabaseServer";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sectionData, setSectionData] = useState({
    badge: "Insights & Resources",
    title: "Audit & Compliance Insights in Dubai",
    subtitle:
      "Expert insights on auditing, VAT, and compliance to help your business stay secure, compliant, and growth-ready in the UAE.",
    buttonText: "View All Insights",
  });

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabaseServer
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBlogs(data || []);

      if (data?.length > 0) {
        setSectionData({
          badge: data[0]?.badge || "Insights & Resources",
          title:
            data[0]?.section_title || "Audit & Compliance Insights in Dubai",
          subtitle:
            data[0]?.section_subtitle ||
            "Expert insights on auditing, VAT, and compliance to help your business stay secure, compliant, and growth-ready in the UAE.",
          buttonText: data[0]?.button_text || "View All Insights",
        });
      }
    } catch (err) {
      console.error("Blog fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="py-24 bg-secondary/5 relative">
      <div className="custom-container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="mb-4">
              <SectionBadge icon={FaBookOpen}>{sectionData.badge}</SectionBadge>
            </div>

            <h2 className="md:text-4xl text-3xl font-bold text-gray-900 mt-3">
              {sectionData.title}
            </h2>

            <p className="text-gray-600 mt-3 max-w-xl">
              {sectionData.subtitle}
            </p>
          </div>

          <Link href="/blogs">
            <Button variant="primary">{sectionData.buttonText}</Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
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
                      src={blog.image}
                      alt={blog.title || "Blog Image"}
                      fill
                      className="object-cover transition-all duration-1000 group-hover:scale-125"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                      <span className="flex items-center gap-2 font-medium">
                        <span className="p-2 rounded-lg bg-primary/10 text-primary">
                          <FaRegCalendarAlt />
                        </span>
                        {formatDate(blog.date)}
                      </span>

                      <span className="flex items-center gap-2 font-medium">
                        <span className="p-2 rounded-lg bg-primary/10 text-primary">
                          <FaRegUser />
                        </span>
                        {blog.author}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3">
                      {blog.description}
                    </p>

                    <div className="relative mt-4 inline-flex items-center gap-2 text-secondary text-sm font-semibold transition-all duration-300 group">
                      <span className="relative transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
                        Read More
                      </span>

                      <FiArrowRight className="transition-all duration-500 group-hover:translate-x-2 group-hover:text-primary" />

                      <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
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
