import { useRef, useEffect, useState } from "react";
import { useVideo } from "../context/VideoContext";
import { getPreviewData } from "../utils/preview";
import ReactPlayer from "react-player";
import { PreviewData } from "../utils/types";

const Preview = () => {
  const { videoData } = useVideo();
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const previewData = getPreviewData();
  const playerRef = useRef<ReactPlayer>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!videoData || previewData.length === 0) return;

    const updatePreview = (previewPoint: PreviewData) => {
      const player = playerRef.current?.getInternalPlayer() as HTMLVideoElement;
      const canvas = canvasRef.current;
      if (!player || !canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      player.currentTime = previewPoint.timeStamp;
      player.volume = previewPoint.volume;
      player.playbackRate = previewPoint.playbackRate;

      const [x, y, width, height] = previewPoint.coordinates;

      // Set canvas size to match the cropped area's aspect ratio
      const aspectRatio = (width - x) / (height - y);
      const maxWidth = 300; // You can adjust this value
      const maxHeight = 300; // You can adjust this value

      if (aspectRatio > 1) {
        canvas.width = maxWidth;
        canvas.height = maxWidth / aspectRatio;
      } else {
        canvas.height = maxHeight;
        canvas.width = maxHeight * aspectRatio;
      }

      ctx.drawImage(
        player,
        x,
        y,
        width - x,
        height - y,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };

    const interval = setInterval(() => {
      updatePreview(previewData[currentPreviewIndex]);
      setCurrentPreviewIndex(
        (prevIndex) => (prevIndex + 1) % previewData.length
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [videoData, previewData, currentPreviewIndex]);

  if (!videoData || previewData.length === 0) {
    return <div>No preview data available</div>;
  }

  return (
    <div className="flex flex-col w-full h-full max-w-7xl mx-auto p-2 sm:p-4 gap-4 sm:gap-6">
      <h2 className="text-xl font-bold">Preview</h2>
      <div className="relative">
        <ReactPlayer
          ref={playerRef}
          url={videoData.fileUrl}
          width="100%"
          height="auto"
          style={{ display: "none" }}
        />
        <canvas ref={canvasRef} className="mx-auto" />
      </div>
      <div>
        <p>
          Preview Point: {currentPreviewIndex + 1} / {previewData.length}
        </p>
        <p>
          Timestamp: {previewData[currentPreviewIndex].timeStamp.toFixed(2)}s
        </p>
        <p>Volume: {previewData[currentPreviewIndex].volume.toFixed(2)}</p>
        <p>
          Playback Rate:{" "}
          {previewData[currentPreviewIndex].playbackRate.toFixed(2)}x
        </p>
      </div>
    </div>
  );
};

export default Preview;