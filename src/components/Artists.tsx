import { Badge } from "@/lib/utils/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/utils/ui/card";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const artist: ArtistCardPropsType = {
  coverImgUrl: "http://localhost:5173/src/assets/banner-3.png",
  avatarImgUrl:
    "https://firebasestorage.googleapis.com/v0/b/socialstream-ba300.appspot.com/o/music_app_files%2Fartistes%2Fckay.jpg?alt=media&token=04b5367b-2c2a-4934-ad07-85ae7b8cf6f3",
  fullName: "Rayhan Kobir",
  genre: "Historical",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum eveniet.",
};
export default function Artists() {
  return (
    <section className="space-y-4 mb-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Top Artists</h2>
          <p className="text-sm text-muted-foreground">
            Lists of Popular Artists
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <ArtistCard {...artist} />
        <ArtistCard {...artist} />
        <ArtistCard {...artist} />
      </div>
    </section>
  );
}

export interface ArtistCardPropsType {
  coverImgUrl: string;
  avatarImgUrl: string;
  fullName: string;
  genre: string;
  description: string;
}

export function ArtistCard({
  coverImgUrl,
  avatarImgUrl,
  fullName,
  genre,
  description,
}: ArtistCardPropsType) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative w-full h-auto flex justify-center items-center p-0">
        <img src={coverImgUrl} />
        <img
          className="w-32 h-32 absolute rounded-full -bottom-8"
          src={avatarImgUrl}
        />
      </CardHeader>
      <CardContent className="px-4 py-5 pt-10 space-y-2">
        <CardTitle className="flex justify-between gap-3">
          <h2 className="truncate">{fullName}</h2> <Badge>{genre}</Badge>
        </CardTitle>
        <p>{description}</p>

        <Link to={""} className="inline-flex gap-1 items-center text-green-600">
          <Eye size={20} /> View Contents
        </Link>
      </CardContent>
    </Card>
  );
}
