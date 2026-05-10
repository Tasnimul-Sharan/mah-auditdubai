"use client";

import Link from "next/link";
import { FaRegCalendarAlt, FaRegUser, FaBookOpen } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import SectionBadge from "@/components/SectionBadge";
import OptimizedImage from "@/components/OptimizedImage";

const defaultSectionData = {
  badge: "Insights & Resources",
  title: "Latest Blogs",
  subtitle: "Stay updated with our latest insights and resources.",
  buttonText: "Read More",
};

export default function BlogPageSection({
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
    <section className="relative bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <SectionBadge icon={FaBookOpen}>{section.badge}</SectionBadge>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {section.title}
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            {section.subtitle}
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="py-20 text-center text-gray-400">No blogs found</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                <div className="group/card overflow-hidden rounded-xl border bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative h-64 w-full overflow-hidden">
                    <OptimizedImage
                      src={blog.image || "/placeholder.jpg"}
                      alt={blog.title || "Blog Image"}
                      fill
                      width={800}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-all duration-1000 group-hover/card:scale-125"
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
                        By: {blog.author}
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
                        {section.buttonText || "Read More"}
                      </span>

                      <FiArrowRight className="transition-all duration-500 group-hover/card:translate-x-2 group-hover/card:text-primary" />

                      <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover/card:scale-x-100" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
