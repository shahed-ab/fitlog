import { Workout } from "@/types/workout";
import { FALLBACK_WORKOUTS } from "./fallbackData";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(BASE_URL, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[getWorkouts] API responded with ${res.status}, using fallback`);
      return FALLBACK_WORKOUTS;
    }

    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data as Workout[];
    }

    return FALLBACK_WORKOUTS;
  } catch (error) {
    console.warn("[getWorkouts] Network error fetching workouts, using fallback:", error);
    return FALLBACK_WORKOUTS;
  }
}

export async function getWorkout(id: number | string): Promise<Workout | null> {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${BASE_URL}/${numericId}`, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[getWorkout] API responded with ${res.status}, using fallback for id ${numericId}`);
      const fallback = FALLBACK_WORKOUTS.find((w) => w.id === numericId);
      return fallback || null;
    }

    const data = await res.json();
    if (data && typeof data === "object" && "id" in data) {
      return data as Workout;
    }

    const fallback = FALLBACK_WORKOUTS.find((w) => w.id === numericId);
    return fallback || null;
  } catch (error) {
    console.warn(`[getWorkout] Network error fetching workout ${numericId}, using fallback:`, error);
    const fallback = FALLBACK_WORKOUTS.find((w) => w.id === numericId);
    return fallback || null;
  }
}
