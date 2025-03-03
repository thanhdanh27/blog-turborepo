"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren;
export default function DesktopNavbar(props: Props) {
  const [scrollHeight, setScrollHeight] = useState(0);

  const handleScroll = () => {
    setScrollHeight(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const pathname = usePathname();
  const isScrollDown = scrollHeight > 10;
  const isHome = pathname === "/";

  return (
    <nav
      className={cn(
        "hidden fixed transition-colors w-full z-50 text-white top-0 md:block",
        {
          "bg-white text-gray-700 shadow": isScrollDown || !isHome,
        }
      )}
    >
      <div className="flex items-center px-4 py-4 container">
        {props.children}
      </div>
      <hr className="border-b border-gray-100 opacity-25" />
    </nav>
  );
}
