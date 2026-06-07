"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type LoaderPhase = "initial" | "route";

export function CurtainLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const phaseRef = useRef<LoaderPhase>("initial");
  const routeTimerRef = useRef<number | null>(null);

  // Initial page load curtain: hide when window fully loaded.
  useEffect(() => {
    const hide = () => setVisible(false);

    if (document.readyState === "complete") {
      hide();
      return;
    }

    window.addEventListener("load", hide, { once: true });
    return () => window.removeEventListener("load", hide);
  }, []);

  // Route change curtain: show briefly on navigation.
  useEffect(() => {
    // Skip if we are still in  phase and already visible.
    if (phaseRef.current === "initial" && visible) return;

    phaseRef.current = "route";
    setVisible(true);

    if (routeTimerRef.current) window.clearTimeout(routeTimerRef.current);
    // Small curtain flash to mask  shifts on navigation.
    routeTimerRef.current = window.setTimeout(() => setVisible(false), 320);

    return () => {
      if (routeTimerRef.current) window.clearTimeout(routeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-[200] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(253,248,243,1) 0%, rgba(245,237,228,1) 45%, rgba(253,248,243,1) 100%)",
            }}
          />

          {/* Subtle center shimmer */}
          <div
            className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,5,95,0.16) 0%, rgba(255,5,95,0.0) 70%)",
              filter: "blur(8px)",
            }}
          />
        </div>
      )}
    </>
  );
}

