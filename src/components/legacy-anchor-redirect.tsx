"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLegacyDestination } from "@/data/navigation";

export function LegacyAnchorRedirect() {
  const router = useRouter();
  useEffect(() => {
    const redirect = () => {
      const href = getLegacyDestination(location.hash);
      if (href) router.replace(href);
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, [router]);
  return null;
}
