"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  FaBoxOpen,
  FaHome,
  FaPlusCircle,
  FaTags,
  FaLayerGroup,
  FaFileAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();

  const menu = [
    { name: "Dashboard", href: "/dashboard", icon: <FaHome /> },
    { name: "Pages", href: "/dashboard/pages", icon: <FaFileAlt /> }, // ✅ NEW
    { name: "Products", href: "/dashboard/products", icon: <FaBoxOpen /> },
    {
      name: "Home Page",
      href: "/dashboard/home",
      icon: <FaHome />,
    },
    {
      name: "HeroSlides",
      href: "/dashboard/hero-slides",
      icon: <FaBoxOpen />,
    },
    {
      name: "Stats",
      href: "/dashboard/stats",
      icon: <FaBoxOpen />,
    },
    {
      name: "Why Choose Us",
      href: "/dashboard/why-choose",
      icon: <FaBoxOpen />,
    },
    {
      name: "Industries",
      href: "/dashboard/industries",
      icon: <FaBoxOpen />,
    },
    {
      name: "Add Product",
      href: "/dashboard/products/add",
      icon: <FaPlusCircle />,
    },
    {
      name: "Add Service",
      href: "/dashboard/services/add",
      icon: <FaPlusCircle />,
    },
    { name: "Services Page", href: "/dashboard/services-page", icon: <FaLayerGroup /> },
    { name: "Services", href: "/dashboard/services", icon: <FaLayerGroup /> },
    {
      name: "Add Blog",
      href: "/dashboard/blogs/add",
      icon: <FaPlusCircle />,
    },
    {
      name: "Blog Page",
      href: "/dashboard/blog-page",
      icon: <FaLayerGroup />,
    },
    {
      name: "Blogs",
      href: "/dashboard/blogs",
      icon: <FaLayerGroup />,
    },
    {
      name: "Testimonials",
      href: "/dashboard/testimonials",
      icon: <FaLayerGroup />,
    },
    {
      name: "Clients",
      href: "/dashboard/clients",
      icon: <FaLayerGroup />,
    },
    {
      name: "Contact Page",
      href: "/dashboard/contact-page",
      icon: <FaLayerGroup />,
    },
    {
      name: "Add Contact",
      href: "/dashboard/contact/add",
      icon: <FaLayerGroup />,
    },
    {
      name: "Contact",
      href: "/dashboard/contact",
      icon: <FaLayerGroup />,
    },
    { name: "Categories", href: "/dashboard/categories", icon: <FaTags /> },
    { name: "Types", href: "/dashboard/types", icon: <FaLayerGroup /> },
  ];

  const isActiveRoute = (href) => router.pathname === href;

  return (
    <aside className="w-64 min-h-screen bg-secondary text-white flex flex-col border-r border-white/10">
      {/* Logo Section */}
      <Link
        href="/"
        className="px-6 py-6 border-b border-white/10 flex items-center gap-3 hover:bg-white/5 transition"
      >
        <Image
          src="/logo/MAH Audit Dubai Logo-1.png"
          alt="Logo"
          width={1650}
          height={1024}
          className="h-16 w-auto object-cover rounded-md"
        />

        {/* <div>
          <h2 className="text-sm font-semibold tracking-wide">MAH AUDIT</h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Dubai
          </p>
        </div> */}
      </Link>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menu.map((item) => {
          const active = isActiveRoute(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
              ${
                active
                  ? "bg-primary text-soft_black shadow-md"
                  : "text-white/70 hover:bg-primary/40 hover:text-white"
              }`}
            >
              {/* Icon */}
              <span
                className={`text-base transition-all
                ${
                  active
                    ? "text-soft_black"
                    : "text-white/60 group-hover:text-secondary"
                }`}
              >
                {item.icon}
              </span>

              {/* Text */}
              <span>{item.name}</span>

              {/* Active Indicator */}
              {active && (
                <span className="ml-auto w-2 h-2 bg-soft_black rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Small Footer */}
      <div className="px-6 py-4 border-t border-white/10 text-[10px] text-gray-500">
        © 2026 Audit System
      </div>
    </aside>
  );
}
