import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full rounded-2xl bg-[#161922] border border-[#232732] p-8 sm:p-10 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center mx-auto mb-6">
          <Dumbbell className="w-8 h-8 text-[#ccff00]" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#ccff00] block mb-2">
          ERROR 404
        </span>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight mb-3">
          PAGE NOT FOUND
        </h1>

        <p className="text-sm text-[#8b8f98] leading-relaxed mb-8">
          The lift or page you are looking for does not exist in our library.
          Check the URL or head back to the main workout index.
        </p>

        <Link
          href="/"
          className="btn bg-[#ccff00] hover:bg-[#b8e600] text-[#0f1115] border-none rounded-full px-7 py-3 font-display font-bold tracking-wider text-sm inline-flex items-center gap-2 transition-transform hover:scale-105 shadow-lime"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>BACK TO WORKOUTS</span>
        </Link>
      </div>
    </div>
  );
}
