import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkout } from "@/lib/api";
import WorkoutDetailActions from "@/components/WorkoutDetailActions";

interface WorkoutPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export function generateStaticParams() {
  return Array.from({ length: 12 }, (_, i) => ({ id: String(i + 1) }));
}

export async function generateMetadata({ params }: WorkoutPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const workout = await getWorkout(resolvedParams.id);
  if (!workout) {
    return {
      title: "Workout Not Found — FitLog",
    };
  }

  return {
    title: `${workout.name} — FitLog`,
    description: workout.description,
  };
}

export default async function WorkoutDetailPage({ params }: WorkoutPageProps) {
  const resolvedParams = await params;
  const workout = await getWorkout(resolvedParams.id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating.toFixed(1) },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Large Media / Illustration */}
        <div className="lg:col-span-6 w-full">
          <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full rounded-2xl bg-[#161922] border border-[#232732] overflow-hidden shadow-2xl">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Right Column: Workout Details */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-[1.1] mb-3">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="text-[#8b8f98] text-sm sm:text-base leading-relaxed mb-4">
            {workout.description}
          </p>

          {/* Muscle Group Pills (Mixed case) */}
          <div className="flex flex-wrap gap-2 mb-6">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="bg-[#ccff00] text-[#0f1115] text-xs font-bold px-3.5 py-1 rounded-full shadow-sm"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key Specs Panel */}
          <div className="rounded-xl bg-[#161922] border border-[#232732] divide-y divide-[#232732]/70 overflow-hidden mb-8">
            {specs.map((item) => (
              <div
                key={item.label}
                className="px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-xs font-medium text-[#8b8f98] tracking-wider uppercase">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Instructions Section */}
          <div className="mb-6">
            <h2 className="font-display text-lg font-bold uppercase tracking-wider text-white mb-4">
              INSTRUCTIONS
            </h2>
            <ol className="space-y-3">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex items-start gap-3.5 text-sm text-[#c4c7cc]">
                  <span className="font-mono text-xs font-bold text-[#8b8f98] mt-0.5 min-w-[16px]">
                    {index + 1}.
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Call-to-action Buttons */}
          <WorkoutDetailActions workout={workout} />
        </div>
      </div>
    </div>
  );
}
