/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollArea, ScrollBar } from "@/lib/utils/ui/scroll-area";
import { Separator } from "@/lib/utils/ui/separator";
import Podcast from "./podcast";
import { useEffect, useState } from "react";
import SpinerLoading from "../spiner-loading";
import { useAxios } from "@/context/AuthContext";

function MadeForYou() {
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
    </>
  );
}

export default MadeForYou;
