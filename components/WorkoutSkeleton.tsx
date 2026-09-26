export default function WorkoutSkeleton() {
  return (
    <div className="rounded-xl bg-[#161922] border border-[#232732] overflow-hidden flex flex-col h-[340px] animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-[16/11] bg-[#1e2330] relative">
        <div className="absolute top-3 left-3 flex gap-1.5">
          <div className="h-5 w-14 rounded-full bg-[#2a3142]" />
          <div className="h-5 w-12 rounded-full bg-[#2a3142]" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="h-6 bg-[#2a3142] rounded-md w-3/4 mb-2.5" />
          <div className="h-3.5 bg-[#202534] rounded-md w-1/2" />
        </div>

        <div className="pt-3 border-t border-[#232732]/70 flex items-center justify-between">
          <div className="h-4 bg-[#202534] rounded w-16" />
          <div className="h-4 bg-[#202534] rounded w-16" />
          <div className="h-4 bg-[#202534] rounded w-10" />
        </div>
      </div>
    </div>
  );
}
