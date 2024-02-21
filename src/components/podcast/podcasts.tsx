import PodcastSkeleton from "@/components/podcast/podcast-skeleton";
import PodcastAudience from "@/assets/vectors/podcast-audience.svg";
import Podcast from "@/components/podcast/podcast";
import { CardTitle } from "@/lib/utils/ui/card";
import { Input } from "@/lib/utils/ui/input";
import { Search } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "@/context/AuthContext";

export type PodcastData = {
  id: string;
  title: string;
  author: object;
  audio: string;
  thumbnail: string;
  description: string;
};

export default function Podcasts({
  title = "Expore Contents",
  description = "While makeing Withdraw please check your payement method.",
}) {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { genre } = useParams();
  const api = useAxios();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = (await api.get(`/podcast${genre ? "/" + genre : ""}`))
          .data;
        setPodcasts(response.data.podcasts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [genre]);
  return (
    <section className="space-y-4 mb-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm font-light">{description}</p>
        </div>
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form className="min-w-[300px]">
            <div className="relative min-w-xl">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search podcast by title"
                className="pl-10 h-11 min-w-xl rounded-xl"
              />
              <button className="absolute rounded-r-lg right-0 top-0 h-11 w-11 text-white bg-green-600 ">
                <Search className="relative w-full" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 border-t py-2">
        {loading ? (
          <Fragment>
            <PodcastSkeleton variant="square" />
          </Fragment>
        ) : podcasts.length ? (
          podcasts.map((podcast: PodcastData) => (
            <Podcast
              key={podcast.id}
              podcast={podcast}
              width={220}
              height={220}
              className="w-full"
              aspectRatio="portrait"
            />
          ))
        ) : (
          <div className="h-full col-span-5 flex flex-col gap-4 justify-center items-center">
            <img className="max-w-md" src={PodcastAudience} />
            <CardTitle className="text-xl text-green-600">
              No available podcasts at this moment.
            </CardTitle>
          </div>
        )}
      </div>
    </section>
  );
}
