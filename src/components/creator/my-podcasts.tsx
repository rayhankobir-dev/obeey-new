/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/lib/utils/ui/button";
import { Heading } from "@/lib/utils/ui/heading";
import { Separator } from "@/lib/utils/ui/separator";
import { Upload } from "lucide-react";
import { Link } from "react-router-dom";
import SpinerLoading from "../spiner-loading";
import Podcast from "../podcast/podcast";
import { useEffect, useState } from "react";
import { useAxios } from "@/context/AuthContext";

export default function MyPodcasts() {
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
    <section className="space-y-3 py-3 mb-5">
      <div className="flex items-center justify-between mb-3">
        <Heading
          title={"My Podcasts"}
          description={"Your own podcasts are listed here"}
        />
        <Button asChild variant="primary" className="px-3">
          <Link to={"/add-podcast"} className="gap-1">
            <Upload size={17} />
            Upload Content
          </Link>
        </Button>
      </div>
      <Separator />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
    </section>
  );
}
