"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Check, X, Search, ChevronDown, Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout, SortOption } from "@/types/workout";

export default function MyPlanView() {
  const {
    todaysPlan,
    saved,
    isHydrated,
    markDone,
    removePlanItem,
    removeSaved,
    isItemDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("Duration");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const metrics = useMemo(() => {
    const exercisesCount = todaysPlan.length;
    const totalMinutes = todaysPlan.reduce((acc, item) => acc + (item.duration || 0), 0);
    const totalCalories = todaysPlan.reduce((acc, item) => acc + (item.caloriesBurned || 0), 0);

    return {
      exercises: exercisesCount,
      minutes: totalMinutes,
      calories: totalCalories,
    };
  }, [todaysPlan]);

  const currentList = activeTab === "today" ? todaysPlan : saved;

  const filteredList = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return currentList;

    return currentList.filter((workout) => {
      const matchName = workout.name.toLowerCase().includes(query);
      const matchMuscle = workout.muscleGroups.some((group) =>
        group.toLowerCase().includes(query)
      );
      const matchEquipment = workout.equipment.toLowerCase().includes(query);
      return matchName || matchMuscle || matchEquipment;
    });
  }, [currentList, searchQuery]);

  const sortedList = useMemo(() => {
    const list = [...filteredList];
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
  }, [filteredList, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-2">
          MY PLAN
        </h1>
        <p className="text-sm sm:text-base text-[#8b8f98]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="rounded-2xl bg-[#161922] border border-[#232732] p-6 sm:p-8 mb-10 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#232732]">
          <div className="sm:pr-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8b8f98] block mb-2">
              Exercises
            </span>
            <div className="font-display text-5xl sm:text-6xl font-black text-[#ccff00]">
              {isHydrated ? metrics.exercises : 0}
            </div>
          </div>

          <div className="pt-6 sm:pt-0 sm:px-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8b8f98] block mb-2">
              Minutes
            </span>
            <div className="font-display text-5xl sm:text-6xl font-black text-white">
              {isHydrated ? metrics.minutes : 0}
            </div>
          </div>

          <div className="pt-6 sm:pt-0 sm:pl-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8b8f98] block mb-2">
              Calories
            </span>
            <div className="font-display text-5xl sm:text-6xl font-black text-white">
              {isHydrated ? metrics.calories : 0}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        <div className="inline-flex p-1 bg-[#12141c] border border-[#232732] rounded-xl self-start">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wider transition-all ${activeTab === "today"
                ? "bg-[#1e2330] text-white border border-[#2e3547] shadow-sm"
                : "text-[#8b8f98] hover:text-white"
              }`}
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wider transition-all ${activeTab === "saved"
                ? "bg-[#1e2330] text-white border border-[#2e3547] shadow-sm"
                : "text-[#8b8f98] hover:text-white"
              }`}
          >
            Saved
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-[#8b8f98] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plan..."
              className="w-full pl-9 pr-8 py-2 bg-[#161922] border border-[#232732] rounded-lg text-xs sm:text-sm text-white placeholder-[#8b8f98] focus:outline-none focus:border-[#ccff00] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8b8f98] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSortOpen((prev) => !prev)}
              onBlur={() => setTimeout(() => setIsSortOpen(false), 200)}
              className="w-full sm:w-auto flex items-center justify-between gap-2.5 px-4 py-2 bg-[#161922] border border-[#232732] rounded-lg text-xs sm:text-sm font-medium text-white hover:border-[#3b4356] transition-colors"
            >
              <span className="text-xs text-[#8b8f98]">Sort By</span>
              <span className="font-semibold text-white">{sortBy}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#8b8f98] transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-1.5 w-36 py-1 bg-[#161922] border border-[#232732] rounded-xl shadow-2xl z-30 flex flex-col">
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

      {!isHydrated ? (
        <div className="py-20 text-center text-[#8b8f98]">
          <div className="inline-block w-6 h-6 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-medium">Loading workouts…</p>
        </div>
      ) : sortedList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#232732] bg-[#161922]/40 py-20 px-6 text-center max-w-4xl mx-auto my-4">
          <Dumbbell className="w-10 h-10 text-[#8b8f98] mx-auto mb-4 opacity-40" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white mb-2">
            NOTHING HERE YET
          </h2>
          <p className="text-sm text-[#8b8f98] max-w-md mx-auto mb-6">
            {searchQuery
              ? `No ${activeTab === "today" ? "planned" : "saved"} workouts match "${searchQuery}".`
              : "Browse the library and add a lift to get today moving."}
          </p>
          <Link
            href="/"
            className="btn bg-[#ccff00] hover:bg-[#b8e600] text-[#0f1115] border-none rounded-full px-7 py-3 font-display font-bold tracking-wider text-sm inline-flex items-center gap-2 transition-transform hover:scale-105 shadow-lime"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((workout: Workout) => {
            const done = isItemDone(workout.id);

            return (
              <div
                key={workout.id}
                className={`rounded-2xl bg-[#161922] border transition-all duration-200 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${done
                    ? "border-[#ccff00]/40 bg-[#161922]/90 shadow-[0_0_15px_rgba(204,255,0,0.06)]"
                    : "border-[#232732] hover:border-[#3b4356]"
                  }`}
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-1">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="relative w-24 h-16 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-[#12141a] flex-shrink-0 group"
                  >
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      sizes="144px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link
                        href={`/workout/${workout.id}`}
                        className="font-display font-bold text-base sm:text-xl uppercase tracking-wide text-white hover:text-[#ccff00] transition-colors truncate"
                      >
                        {workout.name}
                      </Link>
                      {done && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded-full border border-[#ccff00]/30">
                          <Check className="w-3 h-3 stroke-[3]" /> Done
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#8b8f98] mb-2 sm:mb-3 truncate">
                      {workout.equipment}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-[#8b8f98]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#8b8f98]" />
                        <span className="text-[#c4c7cc]">{workout.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#ff8833]" />
                        <span className="text-[#c4c7cc]">{workout.caloriesBurned} kcal</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-[#ccff00] text-[#ccff00]" />
                        <span className="text-white font-semibold">{workout.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 sm:gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-[#232732]/60 flex-shrink-0">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-white border border-[#232732] hover:border-[#3b4356] hover:bg-white/5 transition-colors"
                  >
                    View Details
                  </Link>

                  {activeTab === "today" && (
                    <button
                      type="button"
                      onClick={() => markDone(workout.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all ${done
                          ? "bg-[#ccff00] text-[#0f1115] hover:bg-[#b8e600]"
                          : "bg-[#ccff00] text-[#0f1115] hover:bg-[#b8e600] hover:scale-105 active:scale-95 shadow-sm"
                        }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{done ? "Done" : "Mark as Done"}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (activeTab === "today") {
                        removePlanItem(workout.id);
                      } else {
                        removeSaved(workout.id);
                      }
                    }}
                    className="p-2 text-[#8b8f98] hover:text-white hover:bg-white/5 rounded-full transition-colors"
                    title={activeTab === "today" ? "Remove from plan" : "Remove from saved"}
                    aria-label="Remove workout"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
