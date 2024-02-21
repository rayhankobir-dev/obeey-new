/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollArea, ScrollBar } from "@/lib/utils/ui/scroll-area";
import { Separator } from "@/lib/utils/ui/separator";
import Podcast from "./podcast";
import { useEffect, useState } from "react";
import SpinerLoading from "../spiner-loading";
import { useAxios } from "@/context/AuthContext";

export default function ListingNow() {
  const [loading, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState([]);
  const api = useAxios();

  useEffect(() => {
    async function fetchMadeForYou() {
      try {
        setLoading(true);
        const response = (await api.get("/podcast")).data;
        const podcasts = response.data.podcasts;
        setPodcasts(podcasts);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchMadeForYou();
  }, []);
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
            {loading && podcasts.length == 0 ? (
              <SpinerLoading />
            ) : (
              podcasts.map((podcast: any) => (
                <Podcast
                  key={podcast.id}
                  className="w-[200px]"
                  aspectRatio="portrait"
                  width={200}
                  height={200}
                  podcast={podcast}
                />
              ))
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
