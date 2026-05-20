"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTopButton from "./ScrollToTopButton";

const EMPTY_NAV_LINKS = [];

export default function Layout({
  children,
  footerData = null,
  navbarData = null,
  navLinks = EMPTY_NAV_LINKS,
}) {
  const [layoutData, setLayoutData] = useState(() => ({
    footerData,
    navbarData,
    navLinks: Array.isArray(navLinks) ? navLinks : EMPTY_NAV_LINKS,
  }));

  const fetchedRef = useRef(false);

  const hasLayoutData =
    Boolean(navbarData) ||
    Boolean(footerData) ||
    (Array.isArray(navLinks) && navLinks.length > 0);

  useEffect(() => {
    if (!hasLayoutData) return;

    setLayoutData({
      footerData,
      navbarData,
      navLinks: Array.isArray(navLinks) ? navLinks : EMPTY_NAV_LINKS,
    });
  }, [hasLayoutData, footerData, navbarData, navLinks]);

  useEffect(() => {
    if (hasLayoutData || fetchedRef.current) return;

    fetchedRef.current = true;

    let cancelled = false;
    let idleId;
    let timeoutId;

    const loadLayoutData = async () => {
      try {
        const response = await fetch("/api/layout-data");

        if (!response.ok) {
          throw new Error("Failed to fetch layout data");
        }

        const data = await response.json();

        if (!cancelled) {
          setLayoutData({
            footerData: data?.footerData || null,
            navbarData: data?.navbarData || null,
            navLinks: Array.isArray(data?.navLinks)
              ? data.navLinks
              : EMPTY_NAV_LINKS,
          });
        }
      } catch (error) {
        console.error("Layout data fetch failed:", error);
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadLayoutData, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(loadLayoutData, 1200);
    }

    return () => {
      cancelled = true;

      if (idleId) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [hasLayoutData]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        navbarData={layoutData.navbarData}
        navLinks={layoutData.navLinks}
      />

      <main className="flex-1">{children}</main>

      <Footer data={layoutData.footerData} />

      <ScrollToTopButton />
    </div>
  );
}
