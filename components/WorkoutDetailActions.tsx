"use client";

import React from "react";
import { CalendarPlus, Bookmark, Check } from "lucide-react";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";

interface WorkoutDetailActionsProps {
  workout: Workout;
}

export default function WorkoutDetailActions({ workout }: WorkoutDetailActionsProps) {
  const { addToPlan, saveForLater, isItemInPlan, isItemSaved, todaysPlan } = usePlan();

  const inPlan = isItemInPlan(workout.id);
  const isSaved = isItemSaved(workout.id);
  const isPlanFull = todaysPlan.length >= 5;

  return (
    <div className="flex flex-wrap items-center gap-4 pt-6">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={isPlanFull && !inPlan}
        className={`px-6 py-3.5 rounded-full font-bold text-sm tracking-wide inline-flex items-center gap-2.5 transition-all ${
          isPlanFull && !inPlan
            ? "bg-[#232732] text-[#8b8f98] cursor-not-allowed border border-[#2e3342]"
            : inPlan
            ? "bg-[#ccff00] text-[#0f1115] hover:bg-[#b8e600] shadow-[0_0_20px_rgba(204,255,0,0.3)]"
            : "bg-[#ccff00] text-[#0f1115] hover:bg-[#b8e600] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.25)]"
        }`}
      >
        {inPlan ? (
          <>
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>In Today&apos;s Plan</span>
          </>
        ) : isPlanFull ? (
          <>
            <CalendarPlus className="w-4 h-4 text-[#8b8f98]" />
            <span>Plan is full (5/5)</span>
          </>
        ) : (
          <>
            <CalendarPlus className="w-4 h-4 stroke-[2.5]" />
            <span>Add to today&apos;s plan</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workout)}
        className={`px-6 py-3.5 rounded-full font-medium text-sm tracking-wide inline-flex items-center gap-2.5 border transition-all ${
          isSaved
            ? "bg-[#1c222e] border-[#3b4356] text-[#ccff00]"
            : "bg-transparent border-[#232732] text-white hover:border-[#3b4356] hover:bg-white/5"
        }`}
      >
        <Bookmark className={`w-4 h-4 ${isSaved ? "fill-[#ccff00]" : ""}`} />
        <span>{isSaved ? "Saved for later" : "Save for later"}</span>
      </button>
    </div>
  );
}
