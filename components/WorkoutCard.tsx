import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block rounded-xl bg-[#161922] border border-[#232732] overflow-hidden transition-all duration-300 hover:border-[#3b4356] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] flex flex-col h-full"
    >
      {/* Image container with category pills */}
      <div className="relative w-full aspect-[16/11] bg-[#12141a] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />

        {/* Category / Muscle group pills */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="bg-[#ccff00] text-[#0f1115] text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full shadow-sm tracking-wide"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Bottom subtle shadow vignette */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#161922]/80 to-transparent pointer-events-none" />
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Workout Name */}
          <h3 className="font-display font-bold text-xl uppercase tracking-wide text-white group-hover:text-[#ccff00] transition-colors leading-tight mb-1.5">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="text-xs text-[#8b8f98] mb-4 font-normal">
            {workout.equipment}
          </p>
        </div>

        {/* Stats Row with icons */}
        <div className="pt-3 border-t border-[#232732]/70 flex items-center justify-between text-xs text-[#8b8f98]">
          <div className="flex items-center gap-1.5" title="Duration">
            <Clock className="w-3.5 h-3.5 text-[#8b8f98]" />
            <span className="font-medium text-[#c4c7cc]">{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5" title="Estimated calories burned">
            <Flame className="w-3.5 h-3.5 text-[#ff8833]" />
            <span className="font-medium text-[#c4c7cc]">{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5" title="User rating">
            <Star className="w-3.5 h-3.5 fill-[#ccff00] text-[#ccff00]" />
            <span className="font-semibold text-white">{workout.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
