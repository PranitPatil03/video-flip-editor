/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useRef,
  useCallback,
} from "react";
import ReactPlayer from "react-player";
import { PreviewData, VideoContextType, VideoData } from "../utils/types";

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
  const [cropperDimensions, setCropperDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [previewData, setPreviewData] = useState<PreviewData[]>([]);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const addPreviewDataPoint = useCallback((dataPoint: PreviewData) => {
    setPreviewData((prevData) => [...prevData, dataPoint]);
  }, []);

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
        setCropperDimensions,
        previewData,
        setPreviewData,
        addPreviewDataPoint,
        previewCanvasRef,
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
