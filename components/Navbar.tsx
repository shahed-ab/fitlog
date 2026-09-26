"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, saved, isHydrated } = usePlan();

  const planCount = isHydrated ? todaysPlan.length : 0;
  const savedCount = isHydrated ? saved.length : 0;

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout/");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f1115]/95 backdrop-blur-md border-b border-[#232732]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display text-lg sm:text-2xl font-bold tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Center Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`whitespace-nowrap text-xs sm:text-sm tracking-wide transition-all ${
              isWorkoutsActive
                ? "bg-[#232c17] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold border border-[#3b4b20]/60 shadow-sm"
                : "text-[#8b8f98] hover:text-white px-2.5 sm:px-4 py-1.5 sm:py-2 font-medium"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`whitespace-nowrap text-xs sm:text-sm tracking-wide transition-all ${
              isMyPlanActive
                ? "bg-[#232c17] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold border border-[#3b4b20]/60 shadow-sm"
                : "text-[#8b8f98] hover:text-white px-2.5 sm:px-4 py-1.5 sm:py-2 font-medium"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Status Badges */}
        <div className="flex items-center gap-2 sm:gap-5 flex-shrink-0">
          <Link
            href="/my-plan"
            className="flex items-center gap-1 sm:gap-2 group transition-opacity hover:opacity-90"
            title="View Today's Plan"
          >
            <span className="text-xs sm:text-sm font-medium text-[#8b8f98] group-hover:text-white transition-colors">
              Plan
            </span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#ccff00] text-[#0f1115] font-bold text-[11px] sm:text-xs flex items-center justify-center shadow-sm">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1 sm:gap-2 group transition-opacity hover:opacity-90"
            title="View Saved Workouts"
          >
            <span className="text-xs sm:text-sm font-medium text-[#8b8f98] group-hover:text-white transition-colors">
              Saved
            </span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#353b4b] bg-[#161922] text-[#f5f5f5] font-bold text-[11px] sm:text-xs flex items-center justify-center">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
