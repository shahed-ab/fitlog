"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, ChevronDown, Sparkles, X } from "lucide-react";
import { Workout, SortOption } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";
import WorkoutSkeleton from "./WorkoutSkeleton";

interface WorkoutLibraryProps {
  initialWorkouts?: Workout[];
}

export default function WorkoutLibrary({ initialWorkouts = [] }: WorkoutLibraryProps) {
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [isLoading, setIsLoading] = useState<boolean>(initialWorkouts.length === 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("Duration");
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    if (initialWorkouts.length === 0) {
      let isMounted = true;

      import("@/lib/api").then(({ getWorkouts }) => {
        getWorkouts().then((data) => {
          if (isMounted) {
            setWorkouts(data);
            setIsLoading(false);
          }
        });
      });

      return () => {
        isMounted = false;
      };
    }
  }, [initialWorkouts]);

  const filteredWorkouts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return workouts;

    return workouts.filter((workout) => {
      const matchName = workout.name.toLowerCase().includes(query);
      const matchMuscle = workout.muscleGroups.some((group) =>
        group.toLowerCase().includes(query)
      );
      const matchEquipment = workout.equipment.toLowerCase().includes(query);
      return matchName || matchMuscle || matchEquipment;
    });
  }, [workouts, searchQuery]);

  const sortedWorkouts = useMemo(() => {
    const list = [...filteredWorkouts];
    if (sortBy === "Duration") {
      return list.sort((a, b) => a.duration - b.duration);
    }
    if (sortBy === "Calories") {
      return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    }
    if (sortBy === "Rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filteredWorkouts, sortBy]);

  return (
    <section id="library" className="w-full pt-8 pb-20 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-2">
            THE LIBRARY
          </h2>
          <p className="text-sm sm:text-base text-[#8b8f98]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-[#8b8f98] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, chest, arms..."
              className="w-full pl-10 pr-9 py-2 bg-[#161922] border border-[#232732] rounded-lg text-sm text-white placeholder-[#8b8f98] focus:outline-none focus:border-[#ccff00] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b8f98] hover:text-white"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSortOpen((prev) => !prev)}
              onBlur={() => setTimeout(() => setIsSortOpen(false), 200)}
              className="w-full sm:w-auto flex items-center justify-between gap-2.5 px-4 py-2 bg-[#161922] border border-[#232732] rounded-lg text-sm font-medium text-white hover:border-[#3b4356] transition-colors"
            >
              <span className="text-xs text-[#8b8f98] font-normal">Sort By</span>
              <span className="font-semibold text-white">{sortBy}</span>
              <ChevronDown
                className={`w-4 h-4 text-[#8b8f98] transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-1.5 w-36 py-1.5 bg-[#161922] border border-[#232732] rounded-xl shadow-2xl z-30 flex flex-col">
                {(["Duration", "Calories", "Rating"] as SortOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setIsSortOpen(false);
                    }}
                    className={`px-4 py-2 text-left text-xs font-semibold tracking-wide transition-colors ${sortBy === option
                        ? "bg-[#ccff00]/15 text-[#ccff00]"
                        : "text-[#8b8f98] hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <WorkoutSkeleton key={index} />
          ))}
        </div>
      ) : sortedWorkouts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#232732] bg-[#161922]/50 p-12 text-center my-6">
          <Sparkles className="w-8 h-8 text-[#8b8f98] mx-auto mb-3 opacity-60" />
          <h3 className="font-display text-xl font-bold text-white uppercase mb-2">
            No matching lifts
          </h3>
          <p className="text-sm text-[#8b8f98] max-w-sm mx-auto mb-6">
            We couldn&apos;t find any workout matching &ldquo;{searchQuery}&rdquo;. Try another term.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="px-5 py-2 text-xs font-bold uppercase rounded-full bg-[#232732] hover:bg-[#323846] text-white transition-colors"
          >
            Clear Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
