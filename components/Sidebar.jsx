"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  FaBoxOpen,
  FaHome,
  FaPlusCircle,
  FaLayerGroup,
  FaFileAlt,
  FaBlog,
  FaUsers,
  FaQuoteRight,
  FaEnvelope,
  FaChartBar,
  FaIndustry,
  FaStar,
  FaRegFileAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();

  const menuGroups = [
    {
      title: "Main",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: <FaHome /> },
        { name: "Navbar", href: "/dashboard/navbar", icon: <FaFileAlt /> },
        { name: "Footer", href: "/dashboard/footer", icon: <FaFileAlt /> },
        { name: "Pages", href: "/dashboard/pages", icon: <FaFileAlt /> },
      ],
    },
    {
      title: "Home Content",
      items: [
        { name: "Home Page", href: "/dashboard/home", icon: <FaHome /> },
        {
          name: "Hero Slides",
          href: "/dashboard/hero-slides",
          icon: <FaBoxOpen />,
        },
        { name: "Stats", href: "/dashboard/stats", icon: <FaChartBar /> },
        {
          name: "Why Choose Us",
          href: "/dashboard/why-choose",
          icon: <FaStar />,
        },
        {
          name: "Industries",
          href: "/dashboard/industries",
          icon: <FaIndustry />,
        },
        { name: "Clients", href: "/dashboard/clients", icon: <FaUsers /> },
        {
          name: "Testimonials",
          href: "/dashboard/testimonials",
          icon: <FaQuoteRight />,
        },
      ],
    },
    {
  title: "About",
  items: [
    { name: "About Page", href: "/dashboard/about", icon: <FaRegFileAlt /> },
  ],
},
    {
      title: "Services",
      items: [
        {
          name: "Add Service",
          href: "/dashboard/services/add",
          icon: <FaPlusCircle />,
        },
        {
          name: "Services Page",
          href: "/dashboard/services-page",
          icon: <FaLayerGroup />,
        },
        {
          name: "Services",
          href: "/dashboard/services",
          icon: <FaLayerGroup />,
        },
      ],
    },
    {
      title: "Blogs",
      items: [
        {
          name: "Add Blog",
          href: "/dashboard/blogs/add",
          icon: <FaPlusCircle />,
        },
        { name: "Blog Page", href: "/dashboard/blog-page", icon: <FaBlog /> },
        { name: "Blogs", href: "/dashboard/blogs", icon: <FaBlog /> },
      ],
    },
    {
      title: "Contact",
      items: [
        {
          name: "Contact Page",
          href: "/dashboard/contact-page",
          icon: <FaEnvelope />,
        },
        {
          name: "Add Contact",
          href: "/dashboard/contact/add",
          icon: <FaPlusCircle />,
        },
        { name: "Contact", href: "/dashboard/contact", icon: <FaEnvelope /> },
        { name: "Types", href: "/dashboard/types", icon: <FaLayerGroup /> },
      ],
    },
  ];

  const isActiveRoute = (href) =>
    router.pathname === href || router.asPath === href;

  return (
    <aside className="w-72 shrink-0 min-h-screen bg-gradient-to-b from-secondary via-secondary to-[#06111d] text-white flex flex-col border-r border-white/10">
      <Link
        href="/"
        className="px-6 py-6 border-b border-white/10 flex items-center justify-center hover:bg-white/5 transition-all duration-500"
      >
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
          <Image
            src="/logo/MAH Audit Dubai Logo-1.png"
            alt="Logo"
            width={1650}
            height={1024}
            className="h-14 w-full object-contain"
            priority
          />
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-7">
          {menuGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActiveRoute(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-500 ${
                        active
                          ? "bg-primary text-secondary shadow-[0_12px_35px_rgba(0,0,0,0.25)]"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-base transition-all duration-500 ${
                          active
                            ? "bg-secondary/10 text-secondary"
                            : "bg-white/5 text-white/60 group-hover:bg-primary/20 group-hover:text-primary"
                        }`}
                      >
                        {item.icon}
                      </span>

                      <span>{item.name}</span>

                      {active && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-secondary" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold text-white">MAH Audit Dubai</p>
          <p className="mt-1 text-[11px] text-white/45">© 2026 Audit System</p>
        </div>
      </div>
    </aside>
  );
}
