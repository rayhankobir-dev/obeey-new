import { AspectRatio } from "@/lib/utils/ui/aspect-ratio";
import { Link } from "react-router-dom";

export default function Genres() {
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
        <GenreCard
          href="/history"
          imgUrl="https://beatbox-music.vercel.app/cat_podcast.png"
          genreName="Historical"
        />
        <GenreCard
          href="/history"
          imgUrl="https://beatbox-music.vercel.app/cat_podcast.png"
          genreName="Historical"
        />
        <GenreCard
          href="/history"
          imgUrl="https://beatbox-music.vercel.app/cat_podcast.png"
          genreName="Historical"
        />
        <GenreCard
          href="/history"
          imgUrl="https://beatbox-music.vercel.app/cat_podcast.png"
          genreName="Historical"
        />
        <GenreCard
          href="/politics"
          imgUrl="https://beatbox-music.vercel.app/cat_podcast.png"
          genreName="Politics"
        />
        <GenreCard
          href="/horor"
          imgUrl="https://beatbox-music.vercel.app/cat_chill.png"
          genreName="Horor"
        />
        <GenreCard
          href="/educational"
          imgUrl="https://beatbox-music.vercel.app/cat_podcast.png"
          genreName="Educational"
        />
      </div>
    </section>
  );
}

interface GenreCardPropsType {
  href: string;
  imgUrl: string;
  genreName: string;
}

export function GenreCard({ href, imgUrl, genreName }: GenreCardPropsType) {
  return (
    <Link to={href} className="w-full rounded-lg overflow-hidden group">
      <AspectRatio ratio={16 / 9}>
        <div className="h-full absolute top-0 left-0">
          <img
            className="h-full group-hover:scale-110 duration-300"
            src={imgUrl}
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
