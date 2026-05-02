"use client";

import { socialConfig } from "@/utils/socialConfig";
import Image from "next/image";
import { AiOutlineTag } from "react-icons/ai";
import { FaCheckCircle, FaQuoteLeft, FaRegCheckCircle } from "react-icons/fa";

export default function BlogDetails({ blogsData }) {
  const blogPost = blogsData;

  const currentUrl = `https://mah-auditdubai.ae/blog/${blogsData.slug}`;
  const socialTypes = ["facebook", "twitter", "linkedin", "whatsapp"];

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute bottom-20 right-0 w-[450px] h-[260px] bg-secondary/10 blur-3xl rounded-full" />

      <div className="relative max-w-6xl mx-auto md:px-0 px-6">
        <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.16)] border border-white">
          <Image
            src={blogPost.image}
            alt={blogPost.title || "Blog Image"}
            width={1400}
            height={850}
            priority
            className="w-full h-[320px] md:h-[560px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm mb-5">
              <span className="text-primary font-semibold">Written by:</span>
              <span>{blogPost.author}</span>
              <span className="opacity-60">•</span>
              <span>{formatDate(blogPost.date)}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl drop-shadow-lg">
              {blogPost.title}
            </h1>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <div className="space-y-10">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 md:p-10">
              <p className="text-gray-700 text-lg leading-8">
                {blogPost.description}
              </p>
            </div>

            {blogPost.checklist?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogPost.checklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                  >
                    <FaRegCheckCircle className="text-primary mt-1 shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {blogPost.subimages?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {blogPost.subimages.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-72 rounded-3xl overflow-hidden shadow-lg group"
                  >
                    <Image
                      src={img}
                      alt={`Blog supporting image ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                ))}
              </div>
            )}

            {blogPost.highlights?.length > 0 && (
              <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] space-y-5">
                {blogPost.highlights.map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <FaCheckCircle />
                    </span>
                    <p className="text-gray-700 leading-7">{point}</p>
                  </div>
                ))}
              </div>
            )}

            {blogPost.quote && (
              <blockquote className="relative bg-gradient-to-br from-primary/10 via-white to-secondary/10 text-gray-800 p-8 md:p-10 rounded-3xl border border-primary/20 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                <FaQuoteLeft className="text-primary text-4xl absolute -top-5 left-8" />
                <p className="text-xl md:text-2xl italic leading-9">
                  {blogPost.quote}
                </p>
              </blockquote>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 h-fit space-y-6">
            {blogPost.posttags?.length > 0 && (
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2 mb-4 font-semibold text-gray-900">
                  <AiOutlineTag className="text-primary text-xl" />
                  Tags
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  {blogPost.posttags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <p className="font-semibold text-gray-900 mb-4">
                Share This Post
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                {socialTypes.map((type, index) => {
                  const social = socialConfig[type];
                  if (!social) return null;

                  const Icon = social.icon;

                  return (
                    <a
                      key={index}
                      href={social.getLink(currentUrl, blogPost.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full
                      border border-gray-200 text-gray-500 bg-white
                      hover:bg-primary hover:text-white hover:border-primary
                      hover:-translate-y-1 hover:shadow-lg
                      transition-all duration-500"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}