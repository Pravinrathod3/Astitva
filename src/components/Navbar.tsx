"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import localFont from "next/font/local";
import { toast } from "sonner";

const softura = localFont({ src: "../../public/fonts/Softura-Demo.otf" });

export default function Navbar({
  showNavLinks,
  session,
  showProfileMenu,
  setShowProfileMenu,
  hideLogo = false,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopNavPinned, setDesktopNavPinned] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Use 1024px (lg breakpoint) instead of 640px so iPad (834px) is treated as mobile
      setIsDesktop(window.innerWidth >= 1024);
      // Close mobile menu when switching to desktop; clear pinned when switching to mobile
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      } else {
        setDesktopNavPinned(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close profile menu on Escape
  useEffect(() => {
    if (!showProfileMenu) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowProfileMenu(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showProfileMenu, setShowProfileMenu]);

  // Determine if menu should be visible: on mobile use click state; on desktop use scroll state OR pinned (clicked + to keep open)
  const isMenuVisible = isDesktop
    ? showNavLinks || desktopNavPinned
    : mobileMenuOpen;

  return (
    <div>
      {/* Fixed Logo at Right Corner */}
      {!hideLogo && (
        <div className="fixed top-16 left-8 bg-black text-black rounded-full flex items-center justify-center transition-transform duration-300  active:scale-95 active:shadow-none z-50">
          <Link href="/">
            <Image
              src="/astitva_logo_no_bg.png"
              alt="Logo"
              width={64}
              height={64}
              className="object-cover w-10 h-10 sm:w-10 sm:h-10 lg:w-16 lg:h-16"
              priority
            />
          </Link>
        </div>
      )}

      {/* Back Button - Only shows when not on home page */}
      {!isHomePage && (
        <button
          onClick={() => router.back()}
          className="fixed top-16 md:top-18 left-20 sm:left-20 lg:left-28 w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white text-black rounded-full border-2 border-black flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none z-50"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
        </button>
      )}

      <div className="fixed top-16 sm:top-16 right-8 sm:right-8 flex flex-col items-end gap-2 sm:gap-4 z-50">
        <div className="flex items-start gap-2 sm:gap-4">
          {/* Navigation Menu Container */}
          <div className="relative group/nav z-50">
            {/* 3D Circle Toggle Button */}
            <button
              onClick={() => {
                if (isDesktop) {
                  setDesktopNavPinned((p) => !p);
                } else {
                  setMobileMenuOpen(!mobileMenuOpen);
                }
              }}
              className="relative w-9 h-9 sm:w-12 sm:h-12 bg-white text-black rounded-full border-2 border-black flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] z-20"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                {/* Plus Icon */}
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out lg:group-hover/nav:rotate-90 lg:group-hover/nav:opacity-0 ${isMenuVisible ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
                >
                  <svg
                    className="w-4 h-4 sm:w-6 sm:h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
                {/* Minus Icon */}
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out lg:group-hover/nav:rotate-0 lg:group-hover/nav:opacity-100 ${isMenuVisible ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
                >
                  <svg
                    className="w-4 h-4 sm:w-6 sm:h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
              </div>
            </button>

            {/* Menu - Vertical on Mobile/Tablet, Horizontal on Desktop (lg and above) */}
            <div
              className={`absolute top-full lg:top-0 right-0 lg:right-full mt-2 lg:mt-0 lg:pr-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-3 transition-all duration-300 ease-out lg:group-hover/nav:opacity-100 lg:group-hover/nav:translate-y-0 lg:group-hover/nav:visible ${isMenuVisible ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 lg:-translate-y-4 invisible"}`}
            >
              {[
                { name: "Schedule", href: "/schedule" },
                { name: "Events", href: "/#events" },
                { name: "FAQ", href: "/#faq" },
              ].map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (!isDesktop) {
                      setMobileMenuOpen(false);
                    } else {
                      setDesktopNavPinned(false);
                    }
                  }}
                  className={`bg-white text-black border-2 border-black px-3 py-1.5 sm:px-6 sm:py-3 text-center uppercase font-bold text-xs sm:text-sm rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 whitespace-nowrap ${softura.className}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
