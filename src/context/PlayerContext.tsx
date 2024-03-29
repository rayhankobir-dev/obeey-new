/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useRef } from "react";

const PlayerContext = createContext({});

// Create a custom hook to access the player context
// eslint-disable-next-line react-refresh/only-export-components
export const usePlayer = () => useContext(PlayerContext);

// Define the PlayerProvider component
export const PlayerProvider = ({ children }: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBackgroundPlay, setIsBackgroundPlay] = useState(false);
  const [currentPlayingPodcast, setCurrentPlayingPodcast] = useState(null);
  const playerRef = useRef(null);
  const [ref, setPlayerRef] = useState<any>(playerRef || null);

  const togglePlayer = () => {
    if (isPlaying) {
      ref.current?.audio?.current.pause();
      setIsPlaying(false);
    } else {
      ref.current?.audio?.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        playerRef,
        setPlayerRef,
        isPlaying,
        setIsPlaying,
        togglePlayer,
        isBackgroundPlay,
        setIsBackgroundPlay,
        currentPlayingPodcast,
        setCurrentPlayingPodcast,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
