import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import { getWorkouts } from "@/lib/api";

export const revalidate = 60;

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <Hero />
      <WorkoutLibrary initialWorkouts={workouts} />
    </div>
  );
}
