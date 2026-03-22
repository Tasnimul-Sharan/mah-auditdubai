import { useEffect, useState } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data } = await supabaseServer
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    setBlogs(data);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl mb-6">Blogs</h1>

      <div className="grid gap-6">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`}>
            <div className="border p-4 rounded hover:shadow">
              <h2 className="font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-500">{blog.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
