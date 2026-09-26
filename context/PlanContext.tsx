"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Workout } from "@/types/workout";

interface PlanContextType {
  todaysPlan: Workout[];
  saved: Workout[];
  doneItems: Record<number, boolean>;
  isHydrated: boolean;
  addToPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => boolean;
  markDone: (id: number) => void;
  removePlanItem: (id: number) => void;
  removeSaved: (id: number) => void;
  isItemInPlan: (id: number) => boolean;
  isItemSaved: (id: number) => boolean;
  isItemDone: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const STORAGE_KEY_PLAN = "fitlog:plan";
const STORAGE_KEY_SAVED = "fitlog:saved";
const STORAGE_KEY_DONE = "fitlog:done";
const MAX_PLAN_ITEMS = 5;

const toastOptions = {
  style: {
    background: "#161922",
    color: "#f5f5f5",
    border: "1px solid #232732",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "500",
  },
  success: {
    iconTheme: {
      primary: "#ccff00",
      secondary: "#0f1115",
    },
  },
  error: {
    iconTheme: {
      primary: "#f87272",
      secondary: "#0f1115",
    },
  },
};

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [todaysPlan, setTodaysPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneItems, setDoneItems] = useState<Record<number, boolean>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(STORAGE_KEY_PLAN);
      if (storedPlan) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTodaysPlan(JSON.parse(storedPlan));
      }

      const storedSaved = localStorage.getItem(STORAGE_KEY_SAVED);
      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }

      const storedDone = localStorage.getItem(STORAGE_KEY_DONE);
      if (storedDone) {
        setDoneItems(JSON.parse(storedDone));
      }
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(todaysPlan));
    } catch (e) {
      console.error("Failed to save plan to localStorage:", e);
    }
  }, [todaysPlan, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(saved));
    } catch (e) {
      console.error("Failed to save saved workouts to localStorage:", e);
    }
  }, [saved, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_DONE, JSON.stringify(doneItems));
    } catch (e) {
      console.error("Failed to save done items to localStorage:", e);
    }
  }, [doneItems, isHydrated]);

  const addToPlan = useCallback(
    (workout: Workout) => {
      if (todaysPlan.length >= MAX_PLAN_ITEMS) {
        toast.error("Today's plan is full", toastOptions);
        return false;
      }

      if (todaysPlan.some((item) => item.id === workout.id)) {
        toast("Already in today's plan", {
          ...toastOptions,
          icon: "⚠️",
        });
        return false;
      }

      setTodaysPlan((prev) => [...prev, workout]);
      toast.success("Added to today's plan", toastOptions);
      return true;
    },
    [todaysPlan]
  );

  const saveForLater = useCallback(
    (workout: Workout) => {
      if (saved.some((item) => item.id === workout.id)) {
        toast("Already saved for later", {
          ...toastOptions,
          icon: "ℹ️",
        });
        return false;
      }

      setSaved((prev) => [...prev, workout]);
      toast.success("Saved for later", toastOptions);
      return true;
    },
    [saved]
  );

  const markDone = useCallback(
    (id: number) => {
      setDoneItems((prev) => ({
        ...prev,
        [id]: true,
      }));
      toast.success("Marked as done", toastOptions);
    },
    []
  );

  const removePlanItem = useCallback(
    (id: number) => {
      setTodaysPlan((prev) => prev.filter((item) => item.id !== id));
      setDoneItems((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      toast.success("Removed from plan", toastOptions);
    },
    []
  );

  const removeSaved = useCallback(
    (id: number) => {
      setSaved((prev) => prev.filter((item) => item.id !== id));
      toast.success("Removed from saved", toastOptions);
    },
    []
  );

  const isItemInPlan = useCallback(
    (id: number) => todaysPlan.some((item) => item.id === id),
    [todaysPlan]
  );

  const isItemSaved = useCallback(
    (id: number) => saved.some((item) => item.id === id),
    [saved]
  );

  const isItemDone = useCallback(
    (id: number) => Boolean(doneItems[id]),
    [doneItems]
  );

  return (
    <PlanContext.Provider
      value={{
        todaysPlan,
        saved,
        doneItems,
        isHydrated,
        addToPlan,
        saveForLater,
        markDone,
        removePlanItem,
        removeSaved,
        isItemInPlan,
        isItemSaved,
        isItemDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}
