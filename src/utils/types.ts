import ReactPlayer from "react-player";

export interface VideoData {
  accountId: string;
  fileUrl: string;
}

export interface PreviewData {
  timeStamp: number;
  coordinates: [number, number, number, number];
  volume: number;
  playbackRate: number;
}

export interface VideoContextType {
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
  isCropperActive: boolean;
  setIsCropperActive: (isCropperActive: boolean) => void;
  cropperPosition: { x: number; y: number };
  setCropperPosition: (position: { x: number; y: number }) => void;
  cropperDimensions: { width: number; height: number };
  setCropperDimensions: (dimensions: { width: number; height: number }) => void;
  previewCanvasRef: React.RefObject<HTMLCanvasElement>;
  previewData: PreviewData[];
  setPreviewData: (data: PreviewData[]) => void;
  addPreviewDataPoint: (dataPoint: PreviewData) => void;
}
