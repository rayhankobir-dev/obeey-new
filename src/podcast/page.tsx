import { ScrollArea, ScrollBar } from "@/lib/utils/ui/scroll-area";
import { Separator } from "@/lib/utils/ui/separator";

import { AlbumArtwork } from "./components/album-artwork";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/lib/utils/ui/carousel";
import Banner1 from "@/assets/banner-1.png";
import Banner2 from "@/assets/banner-2.png";
import Banner3 from "@/assets/banner-3.png";
import PopularListItem from "./components/PopularListItem";

export default function MusicPage() {
  return (
    <>
      <section className="pb-10 grid grid-cols-3 gap-4">
        <Carousel
          opts={{ loop: true, direction: "ltr" }}
          className="col-span-2 rounded-xl overflow-hidden"
        >
          <CarouselContent>
            <CarouselItem className="relative">
              <img
                height={400}
                src={Banner1}
                className="rounded-xl object-cover"
              />
              <div className="absolute top-[50%] bg-gradient-to-t from-white to-transparent"></div>
            </CarouselItem>
            <CarouselItem className="relative">
              <img
                height={400}
                src={Banner2}
                className="rounded-xl object-cover"
              />
            </CarouselItem>
            <CarouselItem className="relative">
              <img
                height={400}
                src={Banner3}
                className="rounded-xl object-cover"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div className="col-span-1 shadow-sm border-2 border-slate-50 rounded-xl p-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Popular Podcasts
            </h2>
            <p className="text-sm text-muted-foreground">
              Popular podcasts which currently trending.
            </p>
          </div>
          <div className="py-2 grid gap-2">
            <PopularListItem />
            <PopularListItem />
            <PopularListItem />
            <PopularListItem />
          </div>
        </div>
      </section>
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
            {madeForYouAlbums.map((album) => (
              <AlbumArtwork
                key={album.name}
                album={album}
                className="w-[150px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            ))}
            {madeForYouAlbums.map((album) => (
              <AlbumArtwork
                key={album.name}
                album={album}
                className="w-[150px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {madeForYouAlbums.map((album) => (
            <CarouselItem className="basis-1/8" key={album.name}>
              <AlbumArtwork
                album={album}
                className="w-[150px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            </CarouselItem>
          ))}
          {madeForYouAlbums.map((album) => (
            <CarouselItem className="basis-1/8" key={album.name}>
              <AlbumArtwork
                album={album}
                className="w-[150px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            </CarouselItem>
          ))}
          {madeForYouAlbums.map((album) => (
            <CarouselItem className="basis-1/8" key={album.name}>
              <AlbumArtwork
                album={album}
                className="w-[150px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            </CarouselItem>
          ))}
          {madeForYouAlbums.map((album) => (
            <CarouselItem className="basis-1/8" key={album.name}>
              <AlbumArtwork
                album={album}
                className="w-[150px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
