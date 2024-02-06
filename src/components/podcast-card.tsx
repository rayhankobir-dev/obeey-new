import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/utils/ui/card";
import Thumbnail from "@/assets/thumbnail-1.png";
import { Badge } from "@/lib/utils/ui/badge";
import { Button } from "@/lib/utils/ui/button";
import { Edit, Trash } from "lucide-react";

export type PodcastCardProps = {
  thumbnail: string;
  title: string;
  description: string;
};

export default function PodcastCard({
  thumbnail,
  title,
  description,
}: PodcastCardProps) {
  return (
    <Card className="rounded-lg overflow-hidden">
      <CardHeader className="relative p-0">
        <img src={Thumbnail} alt={thumbnail} />
        <Badge className="absolute bottom-2 left-4 px-4 py-1.5">Crime</Badge>
        <div className=" absolute top-2 left-4 flex gap-2 items-center justify-between">
          <Button variant={"destructive"} className="p-0 px-2">
            <Trash className="w-5 h-5" />
          </Button>
          <Button variant={"primary"} className="p-0 px-2">
            <Edit className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <CardTitle>{title}</CardTitle>
      </CardContent>
      <CardFooter className="px-4">
        <p className="truncate">{description}</p>
      </CardFooter>
    </Card>
  );
}
