"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export const useLenis = () => {
  useEffect(() => {
    let lenis;
    let rafId;
    let idleId;
    let timeoutId;

    const startLenis = () => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        gestureOrientation: "vertical",
        syncTouch: false,
        touchMultiplier: 1.5,
        anchors: true,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(startLenis, { timeout: 1600 });
    } else {
      timeoutId = window.setTimeout(startLenis, 900);
    }

    return () => {
      if (idleId) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);
};
