import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Thumbnail1 from "@/assets/thumbnail-1.png";
import { Button } from "@/lib/utils/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
// import Ever from "@/assets/podcasts/ever.mp3";

export default function Player() {
  const [show, setShow] = useState(true);

  return (
    <section
      className={`${
        show ? "lg:w-4/5" : "lg:w-48"
      } w-full fixed z-10 bottom-0 right-0 flex bg-green-600 bg-opacity-80 backdrop-blur-3xl border rounded-t-lg overflow-hidden duration-500 group`}
    >
      <Button
        className={`p-0 w-8 h-8 px-2 text-white rounded-none rounded-br-lg bg-green-600 hover:bg-green-800 opacity-0 group-hover:opacity-100 shadow-sm`}
        onClick={() => {
          setShow(!show);
        }}
      >
        <ArrowRight size={18} />
      </Button>

      <AudioPlayer
        header={<PodcastInfo />}
        layout="horizontal-reverse"
        className="bg-transparent py-5 px-4 text-white"
        src={
          "https://res.cloudinary.com/rayhankobirdev/video/upload/v1707244123/ever_qn8k4y.mp3"
        }
        onPlay={(e) => console.log(e, "onPlay")}
        onPlayError={() => {
          alert("Problem to playing");
        }}
      />
    </section>
  );
}

function PodcastInfo() {
  return (
    <div className="max-w-1/3 flex flex-col md:flex-row items-center justify-center gap-4">
      <img
        className="aspect-square rounded-lg object-cover"
        height={60}
        src={Thumbnail1}
        width={60}
      />
      <div className="flex-1 min-w-0 space-y-1">
        <h2 className="text-lg font-medium line-clamp-1 truncate">
          Detective Turjo - Chotushkon - Part 1
        </h2>
        <p className="text-sm text-gray-100 line-clamp-1">
          Artist Name - Chotushkon
        </p>
      </div>
    </div>
  );
}
