import { Separator } from "@/lib/utils/ui/separator";
import { ScrollArea, ScrollBar } from "@/lib/utils/ui/scroll-area";
import { AlbumArtwork } from "./album-artwork";
import { listenNowAlbums } from "../data/albums";

export default function ListingNow() {
  return (
    <>
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
            {listenNowAlbums.map((album) => (
              <AlbumArtwork
                key={album.name}
                album={album}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={330}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
