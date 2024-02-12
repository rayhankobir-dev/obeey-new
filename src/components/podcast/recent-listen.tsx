import { ScrollArea, ScrollBar } from "@/lib/utils/ui/scroll-area";
import { Separator } from "@/lib/utils/ui/separator";
import { listenNowAlbums } from "../../constants/albums";
import Podcast from "./podcast";

export default function ListingNow() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Listen Now</h2>
          <p className="text-sm text-muted-foreground">
            Top picks for you. Updated daily.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {listenNowAlbums.map((album, index) => (
              <Podcast
                key={index}
                className="w-[200px]"
                aspectRatio="portrait"
                width={200}
                height={200}
                podcast={{
                  thumbnail:
                    "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80",
                  title: "Convertion with Stive Jobs",
                  audio: "ss",
                  author: "Rayhan Kobir",
                  description: album.artist,
                }}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
