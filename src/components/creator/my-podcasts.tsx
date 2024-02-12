import PodcastCard, {
  PodcastCardProps,
} from "@/components/creator/podcast-card";
import { Button } from "@/lib/utils/ui/button";
import { Heading } from "@/lib/utils/ui/heading";
import { Separator } from "@/lib/utils/ui/separator";
import { Upload } from "lucide-react";
import { Link } from "react-router-dom";

const podcast: PodcastCardProps = {
  title: "Godan By Munshi Premchand ",
  thumbnail: "@/assets/thumbnail-1.png",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
};
export default function MyPodcasts() {
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
      <div className="grid grid-cols-4 gap-3">
        <PodcastCard {...podcast} />
        <PodcastCard {...podcast} />
        <PodcastCard {...podcast} />
        <PodcastCard {...podcast} />
      </div>
    </section>
  );
}
