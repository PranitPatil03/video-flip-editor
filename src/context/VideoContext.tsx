/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useRef,
} from "react";
import ReactPlayer from "react-player";
import { VideoData } from "../utils/types";

interface VideoContextType {
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  playbackRate: number;
  setPlaybackRate: (rate: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  cropperAspectRatio: string;
  setCropperAspectRatio: (ratio: string) => void;
  videoData: VideoData | null;
  setVideoData: (data: VideoData | null) => void;
  playerRef: React.RefObject<ReactPlayer>;
  isCropperActive:boolean
  setIsCropperActive: (isCropperActive: boolean) => void;
  cropperPosition: { x: number; y: number };
  setCropperPosition: (position: { x: number; y: number }) => void;
  cropperDimensions: { width: number; height: number };
  setCropperDimensions: (dimensions: { width: number; height: number }) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCropperActive, setIsCropperActive] = useState(false);
  const [cropperAspectRatio, setCropperAspectRatio] = useState("9:16");
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const playerRef = useRef<ReactPlayer>(null);
  const [cropperPosition, setCropperPosition] = useState({ x: 0, y: 0 });
  const [cropperDimensions, setCropperDimensions] = useState({ width: 0, height: 0 });

  return (
    <VideoContext.Provider
      value={{
        playing,
        setPlaying,
        volume,
        setVolume,
        playbackRate,
        setPlaybackRate,
        progress,
        setProgress,
        duration,
        setDuration,
        cropperAspectRatio,
        setCropperAspectRatio,
        videoData,
        setVideoData,
        playerRef,
        isCropperActive,
        setIsCropperActive,
        cropperPosition,
        setCropperPosition,
        cropperDimensions,
        setCropperDimensions
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};
