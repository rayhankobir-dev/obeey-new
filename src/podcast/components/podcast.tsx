import React from "react";
import { cn } from "@/lib/utils";
import { IoMdPlayCircle } from "react-icons/io";

export type PodcastData = {
  thumbnail: string;
  title: string;
  author: string;
  description: string;
  audio: string;
};

interface PodcastProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "portrait" | "landscape";
  width?: number;
  height?: number;
  podcast: PodcastData;
}

export default function Podcast({
  podcast,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: PodcastProps) {
  if (aspectRatio === "landscape") {
    return (
      <div className="group w-full h-16 flex items-center gap-4 p-2 rounded-lg bg-slate-100  cursor-pointer">
        <div className="relative rounded-lg overflow-hidden">
          <img
            className="aspect-square rounded-lg object-cover"
            height={50}
            width={50}
            src={podcast.thumbnail}
          />
          <div className="absolute top-0 left-0 w-full h-full inline-flex items-center justify-center bg-black bg-opacity-45 opacity-0 group-hover:opacity-100 duration-500">
            <IoMdPlayCircle className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 duration-500" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-md font-medium line-clamp-1 truncate">
            {podcast.title}
          </h2>
          <p className="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
            {podcast.author}
          </p>
        </div>
        <p className="min-w-fit px-2">30:40</p>
      </div>
    );
  }
  return (
    <div
      className={cn("rounded-md  overflow-hidden bg-gray-50 shadow", className)}
      {...props}
    >
      <div
        onClick={() => console.log("playing")}
        className="relative overflow-hidden cursor-pointer group"
      >
        <img
          src={podcast.thumbnail}
          alt={podcast.title}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all group-hover:scale-110 duration-700",
            aspectRatio === "portrait" ? "aspect-[4/4]" : "aspect-square"
          )}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black hover:bg-opacity-55 duration-500 inline-flex justify-center items-center group">
          <IoMdPlayCircle
            className="opacity-0 group-hover:opacity-100 relative text-white transition-all duration-300"
            size={40}
          />
        </div>
      </div>
      <div className="space-y-1 text-sm px-2 py-4">
        <h3 className="text-md font-semibold leading-none truncate">
          {podcast.title}
        </h3>
        <p className="text-sm text-muted-foreground">{podcast.author}</p>
      </div>
    </div>
  );
}
