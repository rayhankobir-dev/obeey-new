/* eslint-disable @typescript-eslint/no-explicit-any */
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Button } from "@/lib/utils/ui/button";
import { ArrowRight, Rewind, FastForward, Volume, Volume2 } from "lucide-react";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { setIsBackgrounPlay, setIsPlaying } from "@/redux/slices/playerSlice";

export default function Player() {
  const { isBackgrounPlay, currentPlayingPodcast } = useSelector(
    (state: any) => state.player
  );
  const dispatch = useDispatch();

  return (
    <section
      className={`${
        isBackgrounPlay || !currentPlayingPodcast ? "hidden" : "flex"
      }  w-full lg:w-4/5 fixed z-10 bottom-0 right-0 flex bg-green-600 bg-opacity-80 backdrop-blur-3xl border rounded-t-lg overflow-hidden duration-500 group`}
    >
      <Button
        className={`p-0 w-8 h-8 px-2 text-white rounded-none rounded-br-lg bg-green-600 hover:bg-green-800 opacity-0 group-hover:opacity-100 shadow-sm`}
        onClick={() => {
          dispatch(setIsBackgrounPlay(true));
        }}
      >
        <ArrowRight size={18} />
      </Button>

      <AudioPlayer
        showFilledVolume={true}
        showJumpControls={true}
        showDownloadProgress={false}
        customIcons={{
          rewind: <Rewind />,
          forward: <FastForward className="ml-2" />,
          play: <FaCirclePlay />,
          pause: <FaCirclePause />,
          volumeMute: <Volume />,
          volume: <Volume2 />,
        }}
        header={
          currentPlayingPodcast && (
            <PodcastInfo
              thumbnail={currentPlayingPodcast.thumbnail}
              title={currentPlayingPodcast.title}
              author={currentPlayingPodcast.author.firstName}
            />
          )
        }
        layout="horizontal-reverse"
        className="bg-transparent py-5 px-4 text-white"
        src={currentPlayingPodcast?.audio}
        onPlaying={() => dispatch(setIsPlaying(true))}
        onPlayError={() => {
          alert("Problem to playing");
        }}
      />
    </section>
  );
}

function PodcastInfo({ thumbnail, title, author }: any) {
  return (
    <div className="max-w-1/3 flex flex-col md:flex-row items-center justify-center gap-4">
      <img
        className="aspect-square rounded-lg object-cover"
        height={60}
        src={thumbnail}
        width={60}
      />
      <div className="flex-1 min-w-0 space-y-1">
        <h2 className="text-lg font-medium line-clamp-1 truncate">{title}</h2>
        <p className="text-sm text-gray-100 line-clamp-1">{author}</p>
      </div>
    </div>
  );
}
