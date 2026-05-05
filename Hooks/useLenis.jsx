// import { useEffect } from "react";
// import Lenis from "@studio-freight/lenis";
// export const useLenis = () => {
//   useEffect(() => {
//     const lenis = new Lenis({
//       smooth: true,
//       duration: 1.2,
//       easing: (t) => 1 - Math.pow(1 - t, 3),
//       direction: "vertical",
//       gestureDirection: "vertical",
//       smoothTouch: true,
//       touchMultiplier: 2,
//     });
//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);
// };
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),

      smoothWheel: true,
      gestureOrientation: "vertical",

      // Safer for mobile. syncTouch true দিলে iOS পুরোনো version এ issue হতে পারে.
      syncTouch: false,
      touchMultiplier: 1.5,

      // Anchor link যেমন #about, #contact কাজ করার জন্য
      anchors: true,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      lenis.destroy();
    };
  }, []);
};