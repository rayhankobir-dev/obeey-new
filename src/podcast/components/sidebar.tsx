import { cn } from "@/lib/utils";
import { Button } from "@/lib/utils/ui/button";
import { ScrollArea } from "@/lib/utils/ui/scroll-area";

import { Playlist } from "../data/playlists";
import {
  Album,
  Globe,
  LayoutGrid,
  Library,
  ListMusic,
  Mic2,
  Music,
  PlayCircle,
  Podcast,
  Radio,
  User,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
  return (
    <aside className={cn("", className, "")}>
      <div className="w-64 max-w-96 fixed top-14 left-0 h-full space-y-4 py-4 bg-slate-10">
        {/* discover section */}
        <div className="px-3">
          <div className="relative px-4 py-2">
            <h2 className="flex gap-2 items-center text-lg font-semibold tracking-tight text-green-600">
              Discover
              <Globe size={20} />
            </h2>
          </div>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <PlayCircle className="mr-2 h-4 w-4" />
              Listen Now
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Browse
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Radio className="mr-2 h-4 w-4" />
              Genres
            </Button>
          </div>
        </div>

        {/* library section */}
        <div className="px-3">
          <div className="relative px-4 py-2">
            <h2 className="flex gap-2 items-center text-lg font-semibold tracking-tight text-green-600">
              Library
              <Library size={20} />
            </h2>
            <p className="pt-1 text-sm text-gray-600">Your all libraries.</p>
          </div>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <ListMusic className="mr-2 h-4 w-4" />
              Playlists
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Music className="mr-2 h-4 w-4" />
              Songs
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Made for You
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Mic2 className="mr-2 h-4 w-4" />
              Artists
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Album className="mr-2 h-4 w-4" />
              Albums
            </Button>
          </div>
        </div>

        {/* playlists section */}
        <div className="">
          <div className="relative px-7 py-2">
            <h2 className="flex gap-2 items-center text-lg font-semibold tracking-tight text-green-600">
              Playlists
              <Podcast size={20} />
            </h2>
            <p className="pt-1 text-sm text-gray-600">
              Add your new playlists.
            </p>
          </div>
          <ScrollArea className="h-[300px] px-1 pb-5">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M21 15V6" />
                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path d="M12 12H3" />
                    <path d="M16 6H3" />
                    <path d="M12 18H3" />
                  </svg>
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
}
