import type { Metadata } from "next";
import MyPlanView from "@/components/MyPlanView";

export const metadata: Metadata = {
  title: "My Plan — FitLog",
  description: "Cap of five lifts for today. Finish them, then load more.",
};

export default function MyPlanPage() {
  return <MyPlanView />;
}
