import { listenNowAlbums } from "../../constants/albums";
import { ScrollArea } from "@/lib/utils/ui/scroll-area";
import Podcast from "./podcast";

export default function PopularItemsCard() {
  return (
    <div className="w-full max-h-96 col-span-3 lg:col-span-1 overflow-hidden shadow-sm border-2 border-slate-50 rounded-xl p-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Popular Podcasts
        </h2>
        <p className="text-sm text-muted-foreground">
          Popular podcasts which currently trending.
        </p>
      </div>

      <ScrollArea className="w-full h-full py-2">
        <div className="grid gap-2">
          {listenNowAlbums.map((album, index) => (
            <Podcast
              key={index}
              className="w-[200px]"
              aspectRatio="landscape"
              width={200}
              height={200}
              podcast={{
                thumbnail:
                  "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80",
                title: "Convertion with Stive Jobs",
                audio: "ss",
                author: "Rayhan Kobir",
                description: album.name,
              }}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
