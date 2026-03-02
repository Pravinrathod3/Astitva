"use client";

import localFont from "next/font/local";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { APP_CONFIG } from "@/config/app.config";

const gilton = localFont({ src: "../../public/fonts/GiltonRegular.otf" });
const softura = localFont({ src: "../../public/fonts/Softura-Demo.otf" });
const SocialCard = ({ social }: { social: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <a
      href={social.href}
      className="bg-white rounded-4xl w-full aspect-square lg:w-44 lg:h-44 flex items-center justify-center hover:scale-105 transition-transform duration-300 group relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Floating Label */}
      <motion.div
        className={`absolute pointer-events-none z-20 transition-opacity duration-200 ${isHovering ? "opacity-100" : "opacity-0"}`}
        style={{
          left: xSpring,
          top: ySpring,
          transform: "translate(-50%, -50%)", // Centered on cursor
        }}
      >
        <div
          className={`bg-black text-white text-xs font-bold uppercase px-3 py-1 rounded-full border border-white shadow-lg whitespace-nowrap ${softura.className}`}
        >
          {social.name}
        </div>
      </motion.div>

      {/* Icon */}
      <div className="w-20 h-20 flex items-center justify-center relative z-10">
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition-colors duration-300"
          style={{ fill: isHovering ? social.color : "black" }}
        >
          <path d={social.path} />
        </svg>
      </div>
    </a>
  );
};

// FooterMainContent Component extracted to handle its own motion state
const FooterMainContent = ({ children }: { children: React.ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) {
      setIsHoveringLink(true);
    } else {
      setIsHoveringLink(false);
    }
  };

  return (
    <div
      className={`flex-1 bg-[#4ADE80] rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden min-h-[320px] lg:min-h-auto max-w-full lg:max-w-[calc(100%-21rem)] group/footer ${softura.className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsHoveringLink(false);
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Floating ASTITVA Label */}
      <motion.div
        className={`absolute pointer-events-none z-50 transition-opacity duration-200 ${isHovering && !isHoveringLink ? "opacity-100" : "opacity-0"}`}
        style={{
          left: xSpring,
          top: ySpring,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`bg-black text-white text-sm font-bold uppercase px-4 py-1.5 rounded-full border border-white shadow-lg whitespace-nowrap ${gilton.className} tracking-widest`}
        >
          ASTITVA
        </div>
      </motion.div>

      {children}
    </div>
  );
};

export default function Footer() {
  const socialIcons = [
    {
      name: "instagram",
      href: APP_CONFIG.social.instagram,
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
      color: "#E4405F",
    },
  ];

  return (
    <footer className="w-full bg-black py-6 px-4">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Social Icons Grid */}
        <div className="relative grid grid-cols-2 gap-x-5 gap-y-17 w-full lg:w-auto lg:shrink-0 h-auto">
          {/* Lottie between social icons */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none z-0">
            <DotLottieReact
              src="https://lottie.host/4bacb5e7-ebb8-4432-9d0d-30a7670320cd/DNDnMBvDqd.lottie"
              loop
              autoplay
              className="w-full h-full"
            />
          </div>
          {socialIcons.map((social, index) => (
            <SocialCard key={index} social={social} />
          ))}
        </div>

        {/* Main Footer Content */}
        <FooterMainContent>
          {/* Lottie Animation - Background/Bottom Center */}
          <div className="absolute -bottom-11 left-25 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-[300px] h-[300px] pointer-events-none z-0">
            <DotLottieReact
              src="https://lottie.host/c0e223f1-2554-4dab-bf19-7de564e95b22/XTB4aMtOIo.lottie"
              loop
              autoplay
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-16 z-10 h-full relative">
            <div className="flex flex-col justify-between h-full w-full">
              {/* Top Section */}
              <div className="flex flex-col md:flex-row justify-between w-full">
                {/* Left Text */}
                <div className="max-w-xl flex flex-col justify-center">
                  <h2
                    className={`text-4xl sm:text-5xl md:text-6xl text-black leading-[0.9] tracking-tighter ${gilton.className} uppercase`}
                  >
                    ASTITVA <span className="italic">2026</span>
                  </h2>
                  <p className={`text-black/60 text-sm sm:text-base mt-4 max-w-md ${softura.className}`}>
                    National Level Flagship Technical Event organized by the Department of Electronics & Telecommunication Engineering, DYPIT Pimpri.
                  </p>
                </div>

                {/* Right Navigation */}
                <nav className="flex flex-col gap-2 min-w-[200px] mt-8 md:mt-0">
                  {[
                    { label: "HOME", href: "/" },
                    { label: "BECOME A SPONSOR", href: "/sponsors" },
                    { label: "SCHEDULE", href: "/schedule" },
                    { label: "CONTACT", href: "/contact" },
                    { label: "FAQ", href: "#faq" },
                    { label: "RULES & REGULATIONS", href: "/terms" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-black font-extrabold text-lg sm:text-xl relative w-fit group"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-black transition-all duration-500 ease-in-out group-hover:w-full" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Bottom Links & Copyright */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-auto pt-12 z-10 w-full">
                <div className="flex flex-col gap-2 min-w-[200px] order-1 sm:order-2">
                  {[
                    { label: "ASSETS", href: "/assets" },
                    { label: "TERMS OF SERVICE", href: "/terms" },
                    { label: "PRIVACY POLICY", href: "/terms" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-black font-bold text-sm relative w-fit group"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-black transition-all duration-500 ease-in-out group-hover:w-full" />
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col order-2 sm:order-1 gap-1">
                  <span className="text-black font-bold text-sm">
                    {APP_CONFIG.organization.copyright}
                  </span>
                  <span className="text-black text-[10px] font-medium leading-tight">
                    Designed and Developed by{" "}
                    <a
                      href="https://arddev.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-gray-700 transition-colors"
                    >
                      ard.dev
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://subham12r.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-gray-700 transition-colors"
                    >
                      subham12r
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FooterMainContent>
      </div>
    </footer>
  );
}
