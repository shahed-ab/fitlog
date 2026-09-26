import Image from "next/image";
import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full pt-6 pb-12">
      <div className="relative overflow-hidden rounded-2xl bg-[#161922] border border-[#232732] shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-[#ccff00] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                WORKOUT LIBRARY
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight uppercase mb-5">
              TRAIN WITH INTENT.
              <br />
              <span className="text-white">LOG EVERY SET.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#8b8f98] text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button */}
            <a
              href="#library"
              className="btn bg-[#ccff00] hover:bg-[#b8e600] text-[#0f1115] border-none rounded-full px-8 py-3.5 font-display font-bold tracking-wider text-sm sm:text-base inline-flex items-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(204,255,0,0.35)]"
            >
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              <span>BROWSE WORKOUTS</span>
            </a>
          </div>

          {/* Right Banner Illustration */}
          <div className="lg:col-span-5 relative w-full h-72 sm:h-96 lg:h-full min-h-[380px] flex items-center justify-center lg:justify-end overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#161922] via-transparent to-transparent z-10 pointer-events-none lg:w-32" />
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <Image
                src="/banner.png"
                alt="FitLog Training Banner"
                width={500}
                height={400}
                className="object-contain max-h-[360px] lg:max-h-[420px] w-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
