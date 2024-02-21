/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import NoData from "@/assets/vectors/no-data.svg";
import { AspectRatio } from "@/lib/utils/ui/aspect-ratio";
import { Skeleton } from "@/lib/utils/ui/skeleton";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { CardTitle } from "@/lib/utils/ui/card";
import { useAxios } from "@/context/AuthContext";

export default function Genres() {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const api = useAxios();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get("/genre");
        setGenres(response.data.data.genres);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);
  return (
    <section className="space-y-4 mb-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Genres</h2>
          <p className="text-sm text-muted-foreground">
            Top picks for you. Updated daily.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {loading ? (
          <Fragment>
            <GenreSkeleton />
            <GenreSkeleton />
            <GenreSkeleton />
            <GenreSkeleton />
            <GenreSkeleton />
            <GenreSkeleton />
            <GenreSkeleton />
            <GenreSkeleton />
            <GenreSkeleton />
            <GenreSkeleton />
          </Fragment>
        ) : genres.length > 0 ? (
          genres.map((genre: any) => (
            <GenreCard
              key={genre.id}
              slug={genre.slug}
              genreImage={genre.genreImage}
              genreName={genre.genreName}
              id={genre.id}
            />
          ))
        ) : (
          <div className="border-t h-full col-span-5 flex flex-col gap-4 justify-center items-center">
            <img className="max-w-sm" src={NoData} />
            <CardTitle className="text-xl text-green-600">
              No available data
            </CardTitle>
          </div>
        )}
      </div>
    </section>
  );
}

interface GenreData {
  id: string;
  slug: string;
  genreImage: string;
  genreName: string;
}

export function GenreCard({ slug, genreImage, genreName }: GenreData) {
  return (
    <Link
      to={`/podcast/${slug}`}
      className="w-full rounded-lg overflow-hidden group"
    >
      <AspectRatio ratio={16 / 9}>
        <div className="h-full absolute top-0 left-0">
          <img
            className="h-full group-hover:scale-110 duration-300"
            src={genreImage}
          />
          <div className="h-full w-full absolute top-0 bg-black opacity-50"></div>
        </div>
        <h2 className="w-full h-full relative inline-flex justify-center items-center text-2xl text-white font-semibold">
          {genreName}
        </h2>
      </AspectRatio>
    </Link>
  );
}

export function GenreSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}
