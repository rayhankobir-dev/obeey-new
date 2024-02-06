import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Lofi from "@/assets/podcasts/lofi.mp3";
import Thumbnail1 from "@/assets/thumbnail-1.png";
// import Ever from "@/assets/podcasts/ever.mp3";

export default function Player() {
  return (
    <AudioPlayer
      header={<PodcastInfo />}
      layout="horizontal-reverse"
      className="fixed z-10 px-4 py-5 bottom-0 right-0 w-full lg:w-4/5 flex bg-green-600 bg-opacity-80 backdrop-blur-3xl border  rounded-t-lg overflow-hidden text-white"
      src={Lofi}
      onPlay={(e) => console.log(e, "onPlay")}
      onPlayError={() => {
        alert("Problem to playing");
      }}
    />
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
