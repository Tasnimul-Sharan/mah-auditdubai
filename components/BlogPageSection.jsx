// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
// import { FiArrowRight } from "react-icons/fi";
// import { useEffect, useState } from "react";
// import { supabaseServer } from "@/lib/supabaseServer";

// export default function BlogPageSection() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH FROM DB =================
//   const fetchBlogs = async () => {
//     setLoading(true);

//     const { data, error } = await supabaseServer
//       .from("blogs")
//       .select("*")
//       .order("date", { ascending: false });

//     if (!error && data) {
//       setBlogs(data);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <div className="text-center py-20 text-gray-500">Loading blogs...</div>
//     );
//   }

//   return (
//     <section className="py-20 bg-white relative">
//       <div className="max-w-7xl mx-auto px-6 md:px-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {blogs.map((blog) => (
//             <Link key={blog.id} href={`/blogs/${blog.slug}`}>
//               <div className="group rounded-xl overflow-hidden border">
//                 {/* IMAGE */}
//                 <div className="relative w-full h-64 overflow-hidden">
//                   <Image
//                     src={blog.image || "/placeholder.jpg"}
//                     alt={blog.title}
//                     fill
//                     className="object-cover rounded transform transition-all duration-1000 group-hover:scale-125"
//                   />
//                 </div>

//                 <div className="mt-4 p-6">
//                   {/* DATE + AUTHOR */}
//                   <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
//                     <span className="flex items-center gap-2 font-medium">
//                       <span className="p-2 rounded-lg bg-primary/10 text-primary">
//                         <FaRegCalendarAlt />
//                       </span>
//                       {blog.date}
//                     </span>

//                     <span className="flex items-center gap-2 font-medium">
//                       <span className="p-2 rounded-lg bg-primary/10 text-primary">
//                         <FaRegUser />
//                       </span>
//                       By: {blog.author}
//                     </span>
//                   </div>

//                   {/* TITLE */}
//                   <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-500">
//                     {blog.title}
//                   </h3>

//                   {/* DESCRIPTION */}
//                   <p className="text-gray-600 text-sm">
//                     {blog.description?.slice(0, 120)}...
//                   </p>

//                   {/* READ MORE */}
//                   <div className="relative mt-2 inline-flex items-center gap-2 text-secondary text-sm font-semibold transition-all duration-300 group">
//                     <span className="relative transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
//                       Read More
//                     </span>

//                     <FiArrowRight className="transition-all duration-500 group-hover:translate-x-2 group-hover:text-primary" />

//                     <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>

//                     <span className="absolute inset-0 rounded-md bg-primary/10 opacity-0 blur-md transition duration-300 group-hover:opacity-100"></span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* EMPTY STATE */}
//         {blogs.length === 0 && (
//           <div className="text-center py-20 text-gray-400">No blogs found</div>
//         )}
//       </div>
//     </section>
//   );
// }

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
// import { FiArrowRight } from "react-icons/fi";
// import { useEffect, useState } from "react";
// import { supabaseServer } from "@/lib/supabaseServer";

// export default function BlogPageSection() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const formatDate = (date) => {
//     if (!date) return "";

//     return new Date(date).toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const fetchBlogs = async () => {
//     try {
//       setLoading(true);

//       const { data, error } = await supabaseServer
//         .from("blogs")
//         .select("*")
//         .order("date", { ascending: false });

//       if (error) throw error;

//       setBlogs(data || []);
//     } catch (err) {
//       console.error("Blogs fetch error:", err);
//       setBlogs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   if (loading) {
//     return (
//       <section className="py-20 bg-white">
//         <div className="text-center text-gray-500">Loading blogs...</div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-20 bg-white relative">
//       <div className="max-w-7xl mx-auto px-6 md:px-12">
//         {blogs.length === 0 ? (
//           <div className="text-center py-20 text-gray-400">No blogs found</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {blogs.map((blog) => (
//               <Link key={blog.id} href={`/blogs/${blog.slug}`}>
//                 <div className="group rounded-xl overflow-hidden border bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
//                   <div className="relative w-full h-64 overflow-hidden">
//                     <Image
//                       src={blog.image || "/placeholder.jpg"}
//                       alt={blog.title || "Blog Image"}
//                       fill
//                       className="object-cover transition-all duration-1000 group-hover:scale-125"
//                     />
//                   </div>

//                   <div className="p-6">
//                     <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-3">
//                       <span className="flex items-center gap-2 font-medium">
//                         <span className="p-2 rounded-lg bg-primary/10 text-primary">
//                           <FaRegCalendarAlt />
//                         </span>
//                         {formatDate(blog.date)}
//                       </span>

//                       <span className="flex items-center gap-2 font-medium">
//                         <span className="p-2 rounded-lg bg-primary/10 text-primary">
//                           <FaRegUser />
//                         </span>
//                         By: {blog.author}
//                       </span>
//                     </div>

//                     <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-500">
//                       {blog.title}
//                     </h3>

//                     <p className="text-gray-600 text-sm line-clamp-3">
//                       {blog.description}
//                     </p>

// <div className="relative mt-4 inline-flex items-center gap-2 text-secondary text-sm font-semibold transition-all duration-300 group">
//   <span className="relative transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
//     Read More
//   </span>

//   <FiArrowRight className="transition-all duration-500 group-hover:translate-x-2 group-hover:text-primary" />

//   <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
// </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { FaRegCalendarAlt, FaRegUser, FaBookOpen } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import SectionBadge from "@/components/SectionBadge";

export default function BlogPageSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sectionData, setSectionData] = useState({
    badge: "Insights & Resources",
    title: "Latest Blogs",
    subtitle: "Stay updated with our latest insights and resources.",
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
      setLoading(true);

      const { data, error } = await supabaseServer
        .from("blogs")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;

      setBlogs(data || []);

      // ✅ header data load
      if (data?.length > 0) {
        if (data?.length > 0) {
          setSectionData({
            badge: data[0]?.badge,
            title: data[0]?.section_title,
            subtitle: data[0]?.section_subtitle,
            buttonText: data[0]?.button_text,
          });
        }
      }
    } catch (err) {
      console.error("Blogs fetch error:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white text-center text-gray-500">
        Loading blogs...
      </section>
    );
  }

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <SectionBadge icon={FaBookOpen}>{sectionData.badge}</SectionBadge>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {sectionData.title}
          </h2>

          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            {sectionData.subtitle}
          </p>
        </div>

        {/* ================= BLOG GRID ================= */}
        {blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No blogs found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                <div className="group rounded-xl overflow-hidden border bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  {/* IMAGE */}
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={blog.image || "/placeholder.jpg"}
                      alt={blog.title || "Blog Image"}
                      fill
                      className="object-cover transition-all duration-1000 group-hover:scale-125"
                    />
                  </div>

                  <div className="p-6">
                    {/* DATE + AUTHOR */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-3">
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
                        By: {blog.author}
                      </span>
                    </div>

                    {/* TITLE */}
                    <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-500">
                      {blog.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {blog.description}
                    </p>

                    {/* READ MORE */}
                    <div className="relative mt-4 inline-flex items-center gap-2 text-secondary text-sm font-semibold transition-all duration-300 group">
                      <span className="relative transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
                        Read More
                      </span>

                      <FiArrowRight className="transition-all duration-500 group-hover:translate-x-2 group-hover:text-primary" />

                      <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
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
