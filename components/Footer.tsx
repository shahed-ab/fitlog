import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0f1115] border-t border-[#232732] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-display text-xl font-bold tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Right: Copyright */}
        <p className="text-xs sm:text-sm text-[#8b8f98] text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
