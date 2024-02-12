import { Skeleton } from "@/lib/utils/ui/skeleton";
import { PlayCircle } from "lucide-react";

interface PodcastSkeletonProps {
  variant: string;
}

export default function PodcastSkeleton({ variant }: PodcastSkeletonProps) {
  if (variant === "square") {
    return (
      <div className="grid gap-x-4 w-full max-w-xs rounded-lg overflow-hidden">
        <div className="aspect-square relative">
          <Skeleton className="aspect-square rounded-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="w-10 h-10 text-gray-300" />
            </div>
          </Skeleton>
        </div>
        <div className="grid gap-2 p-4 bg-gray-50">
          <Skeleton>
            <div className="h-5 bg-gray-200 rounded-lg" />
          </Skeleton>
          <Skeleton>
            <div className="h-4 bg-gray-200 rounded-lg" />
          </Skeleton>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid h-[60px] grid-cols-5  w-full max-w-xs rounded-lg overflow-hidden">
        <div className="col-span-1 h-full relative">
          <Skeleton className="h-full rounded-none relative">
            <div className="absolute w-full h-full flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-gray-400" />
            </div>
          </Skeleton>
        </div>
        <div className="col-span-3 grid gap-2 p-4 bg-gray-50">
          <Skeleton>
            <div className="h-3 bg-gray-200 rounded-lg" />
          </Skeleton>
          <Skeleton>
            <div className="h-2 bg-gray-200 rounded-lg" />
          </Skeleton>
        </div>
        <div className="p-4 bg-gray-50 col-span-1">
          <Skeleton>
            <div className="h-4 w-4 bg-gray-200 rounded-lg" />
          </Skeleton>
        </div>
      </div>
    );
  }
}
