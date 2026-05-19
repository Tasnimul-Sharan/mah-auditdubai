"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Layout({
  children,
  footerData = null,
  navbarData = null,
  navLinks = [],
}) {
  const initialLayoutData = useMemo(
    () => ({
      footerData,
      navbarData,
      navLinks: Array.isArray(navLinks) ? navLinks : [],
    }),
    [footerData, navbarData, navLinks],
  );

  const [layoutData, setLayoutData] = useState(initialLayoutData);
  const hasLayoutData =
    Boolean(initialLayoutData.navbarData) ||
    Boolean(initialLayoutData.footerData) ||
    initialLayoutData.navLinks.length > 0;

  useEffect(() => {
    setLayoutData(initialLayoutData);
  }, [initialLayoutData]);

  useEffect(() => {
    if (hasLayoutData) return undefined;

    let cancelled = false;
    let idleId;
    let timeoutId;

    const loadLayoutData = async () => {
      try {
        const response = await fetch("/api/layout-data");
        const data = await response.json();

        if (!cancelled) {
          setLayoutData({
            footerData: data.footerData || null,
            navbarData: data.navbarData || null,
            navLinks: Array.isArray(data.navLinks) ? data.navLinks : [],
          });
        }
      } catch (error) {
        console.error("Layout data fetch failed:", error);
      }
    };

    if ("requestIdleCallback" in window) {
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
