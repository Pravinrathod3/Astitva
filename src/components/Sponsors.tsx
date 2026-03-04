"use client";
import Link from "next/link";
import localFont from "next/font/local";
import Image from "next/image";
import FadeIn from "./FadeIn";

const gilton = localFont({ src: "../../public/fonts/GiltonRegular.otf" });
const softura = localFont({ src: "../../public/fonts/Softura-Demo.otf" });



export default function Sponsors() {
    return (
        <section id="sponsors" className="w-full bg-black ">
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden flex flex-col gap-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <FadeIn>
                    <div className="flex flex-col gap-4 text-center">
                        <h2 className={`text-5xl sm:text-7xl text-black uppercase leading-[0.9] ${gilton.className}`}>
                            Current <span className="italic">Sponsors</span>
                        </h2>
                        <p className={`text-xl text-gray-600 font-medium max-w-2xl mx-auto ${softura.className}`}>
                            Powered by the best in the industry.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={200}>
                    <div className="w-full flex items-center justify-center flex-col gap-8 mt-4 mb-8">
                        <h3 className={`text-3xl sm:text-5xl text-gray-400/80 uppercase tracking-widest ${gilton.className}`}>
                            Coming Soon...
                        </h3>
                        {/* Become a Sponsor Button */}
                        <div className="flex justify-center mt-4">
                            <Link href="/sponsors">
                                <button className={`bg-black text-white px-8 py-3 rounded-full border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase font-bold text-lg tracking-wider ${softura.className}`}>
                                    Become a Sponsor
                                </button>
                            </Link>
                        </div>
                    </div>
                </FadeIn>


                {/* Community Partners Section */}
                <FadeIn delay={300}>
                    <div className="flex flex-col gap-8 mt-12 pt-8 border-t-4 border-black">
                        <h3 className={`text-4xl sm:text-5xl text-black uppercase text-center ${gilton.className}`}>
                            Community <span className="italic">Partners</span>
                        </h3>

                        {/* Horizontal Logo Layout */}
                        <div className="flex flex-row flex-wrap items-center justify-center gap-12 py-4">
                            {/* ECC Club Logo */}
                            <Image
                                src="/ecc-club.jpg"
                                alt="ECC Club"
                                width={200}
                                height={90}
                                className="h-24 w-auto object-contain"
                            />

                            {/* Raptors Logo */}
                            <Image
                                src="/Raptors_logo.png"
                                alt="Raptors"
                                width={200}
                                height={90}
                                className="h-32 w-auto object-contain"
                            />
                        </div>
                    </div>
                </FadeIn>


            </div>
        </section>
    );
}
