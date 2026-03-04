"use client";

import { useState, useRef, useEffect } from "react";
import Preloader from "@/components/Preloader";
import Timer from "@/components/Timer";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUserPassStatus, getUserProfile } from "@/app/actions";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Events from "@/components/Events";
import Prizes from "@/components/Prizes";
import Sponsors from "@/components/Sponsors";
import { APP_CONFIG } from "@/config/app.config";

const rampart = localFont({ src: "../../public/fonts/RampartOne-Regular.ttf" });
const gilton = localFont({ src: "../../public/fonts/GiltonRegular.otf" });
const bicubik = localFont({ src: "../../public/fonts/Bicubik.otf" });
const softura = localFont({ src: "../../public/fonts/Softura-Demo.otf" });

const Marquee = () => {
  const baseVelocity = -2; // Reduced base speed
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    // Reduced factor
    clamp: false,
  });

  const x = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    // Calculate movement based on time delta (ms)
    // Convert to seconds: delta / 1000
    let moveBy = baseVelocity * (delta / 1000);

    // Get smoothed scroll velocity factor (always positive for speed increase)
    const vel = Math.abs(velocityFactor.get());

    // Increase speed based on scroll
    moveBy = moveBy * (1 + vel);

    let newX = x.get() + moveBy;

    // Wrap logic: reset to 0 when we reach -50%
    if (newX <= -50) {
      newX = 0;
    } else if (newX > 0) {
      newX = -50;
    }

    x.set(newX);
  });

  return (
    <div className="w-full relative z-20 py-8 overflow-hidden">
      <div className="absolute inset-0 flex items-center bg-yellow-300 border-y-4 border-black transform -rotate-1 scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <motion.div
          className="flex whitespace-nowrap"
          style={{ x: useTransform(x, (v) => `${v}%`) }}
        >
          {/* Render content twice for seamless loop */}
          {[0, 1].map((_, idx) => (
            <div key={idx} className="flex shrink-0">
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl sm:text-3xl text-black font-black mx-4 tracking-widest ${gilton.className}`}
                >
                  ★ ASTITVA 2026 ★ ★ EXPLORE THE BEST TECHNICAL EVENTS ★ ★ DYPIT PIMPRI ★
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function Home() {
  // null = not yet determined, false = show preloader, true = preloader done
  const [preloaderFinished, setPreloaderFinished] = useState<boolean | null>(
    null,
  );
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [passStatus, setPassStatus] = useState<{
    hasVisitorPass: boolean;
    hasDualDayPass: boolean;
    hasSingleDayPass: boolean;
    hasEventPass: boolean;
    passCount: number;
  } | null>(null);
  const router = useRouter();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);

  // Check sessionStorage on mount to determine if preloader should show
  useEffect(() => {
    const hasSeenPreloader =
      sessionStorage.getItem("preloaderShown") === "true";
    // Set to false to show preloader, or true to skip it
    setPreloaderFinished(hasSeenPreloader);
  }, []);

  // Smooth scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // authClient is removed
  const sessionData = null;

  useEffect(() => {
    // Session fetching disabled for static site
    setSession(null);
    setUserProfile({
      name: "Guest User",
      email: "guest@example.com",
      bookingId: "AST26-GUEST",
    });
    setPassStatus({
      hasVisitorPass: false,
      hasDualDayPass: false,
      hasSingleDayPass: false,
      hasEventPass: false,
      passCount: 0,
    });
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;
      const isAtTop = currentScrollY < 100;
      const isDesktop = window.innerWidth >= 640; // sm breakpoint

      setShowScrollTop(!isAtTop);

      // Show progress bar only when infobar is scrolled out (roughly > 50px)
      if (currentScrollY > 50) {
        setShowProgressBar(true);
      } else {
        setShowProgressBar(false);
      }

      // Only show nav links on scroll up for desktop screens
      if (isDesktop) {
        if (isAtTop) {
          setShowNavLinks(false);
        } else if (isScrollingUp) {
          setShowNavLinks(true);
        } else {
          setShowNavLinks(false);
        }
      } else {
        // On mobile, keep nav links closed (controlled by button click in Navbar)
        setShowNavLinks(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => { }, []);

  const handlePreloaderFinish = () => {
    setPreloaderFinished(true);
    sessionStorage.setItem("preloaderShown", "true"); // Mark preloader as shown for this session
  };

  // Show black screen while determining preloader state (prevents flash)
  if (preloaderFinished === null) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {preloaderFinished === false && (
        <Preloader onFinish={handlePreloaderFinish} />
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-15 right-8 z-50 w-12 h-12 bg-white text-black rounded-full border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      {/* Progress Bar */}
      <div
        className={`fixed top-0 left-0 w-full h-2 z-50 transition-opacity duration-300 ${showProgressBar ? "opacity-100" : "opacity-0"}`}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#deb3fa] via-[#9c27b0] to-[#f3e5f5]"
          style={{ scaleX, transformOrigin: "0%" }}
        />
      </div>

      {/* Top Right Controls - Moved out of main */}
      <Navbar
        showNavLinks={showNavLinks}
        session={session}
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
      />

      <div className="flex-1 p-3 sm:p-3">
        <main className="w-full h-full min-h-[calc(100vh-6rem)] bg-linear-to-b from-[#4a148c] via-[#9c27b0] to-[#f3e5f5] rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay"></div>

          {/* Centered Background Faded Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] sm:w-[1000px] sm:h-[1000px] pointer-events-none z-1 opacity-20">
            <div
              className="relative w-full h-full"
              style={{
                maskImage:
                  "radial-gradient(circle, black 30%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(circle, black 30%, transparent 70%)",
              }}
            >
              <Image
                src="/astitva_logo_no_bg.png"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Main Content - Timer - more top margin on mobile so title, dates and timer sit lower */}
          <div className="z-10 flex flex-col items-center gap-6 sm:gap-8 relative px-4 sm:px-0 mt-20 sm:mt-10">
            {/* ASTITVA Title, then 27th-28th left and 2026 right below */}
            <div className="flex flex-col items-center z-30 ">
              <h1
                className={`text-5xl sm:text-6xl md:text-9xl font-extrabold text-white tracking-widest ${bicubik.className}`}
                style={{ textShadow: "4px 4px 0px rgba(0,0,0,1)" }}
              >
                ASTITVA
              </h1>
              <div className="w-full flex flex-col items-center gap-2 mt-2">

                <div className="w-full flex flex-row items-center justify-between px-5">
                  <span
                    className={`text-xs sm:text-sm md:text-base text-white/90 tracking-widest ${gilton.className}`}
                  >
                    27th - 28th March
                  </span>
                  <span
                    className={`text-xl sm:text-2xl md:text-3xl text-white tracking-[0.3em] sm:tracking-[0.5em] ${bicubik.className}`}
                  >
                    {APP_CONFIG.event.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Lottie Animation Above Timer */}
            {/* <div className="hidden sm:block absolute -top-50 left-1/2 -translate-x-[170%] w-[220px] h-[220px] pointer-events-none z-20">
                <DotLottieReact
                  src="https://lottie.host/e28afc4a-f625-49e6-b4b6-a41b4d08a155/f7wuEZYKPl.lottie"
                  loop
                 autoplay
                />
             </div> */}

            <Timer />

            <div className="flex flex-col items-center gap-4 mt-4">

              <div className="flex flex-row gap-4">

                <Link
                  href="/#events"
                  className={`bg-transparent text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full border-2 border-white font-bold uppercase text-xs sm:text-sm hover:bg-white hover:text-black transition-all ${softura.className}`}
                >
                  Explore Events
                </Link>
              </div>
            </div>
          </div>

          {/* Lottie Animation at Bottom of Hero */}
          <div className="relative mt-8 sm:mt-0 sm:absolute sm:bottom-0 lg:bottom-[-30px] xl:bottom-[-40px] w-full flex flex-col items-center justify-center z-0 pointer-events-none">
            <p
              className={`text-black/60 text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase text-center max-w-lg mb-[-10px] sm:mb-[-50px] ${softura.className}`}
            >
              Experience two days of robotics, drones, innovation, and competitive engineering excellence.

            </p>
            <div className="w-[400px] h-[150px]">
              <DotLottieReact
                src="https://lottie.host/42483186-c353-4351-93cf-a36ce4fe8333/VWAzrjHsxV.lottie"
                loop
                autoplay
              />
            </div>
          </div>

          {/* New Lottie Animation - Bottom Right of Hero */}
          <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
            <div className="w-[150px] h-[150px]">
              <DotLottieReact
                src="https://lottie.host/aadad083-851e-46b8-8325-979c9a4a0f34/VikfqxN0JL.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </main>

        <About />
        <div className="relative z-20 bg-black">
          <Marquee />
          <Events />
          <Prizes />
          <Sponsors />

        </div>
        <div className="relative z-20 bg-black">
        </div>
        <FAQ />
      </div>
      <Footer />
    </div>
  );
}
