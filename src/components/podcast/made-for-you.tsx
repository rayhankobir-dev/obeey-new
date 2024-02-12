import { ScrollArea, ScrollBar } from "@/lib/utils/ui/scroll-area";
import { madeForYouAlbums } from "../../constants/albums";
import { Separator } from "@/lib/utils/ui/separator";
import Podcast from "./podcast";

function MadeForYou() {
  return (
    <>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Made for You</h2>
        <p className="text-sm text-muted-foreground">
          Your personal playlists. Updated daily.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {madeForYouAlbums.map((album, index) => (
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
                  description: album.name,
                }}
              />
            ))}
            {madeForYouAlbums.map((album, index) => (
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
                  description: album.name,
                }}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}

export default MadeForYou;
