import { useRef, useEffect, useState } from "react";
import { useVideo } from "../context/VideoContext";
import ReactPlayer from "react-player";
import { PreviewData } from "../utils/types";

const Preview = () => {
  const { videoData } = useVideo();
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState<number>(0);
  const playerRef = useRef<ReactPlayer>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewData, setPreviewData] = useState<PreviewData[]>([]);

  useEffect(() => {
    const storedPreviewData = localStorage.getItem("previewData");
    if (storedPreviewData) {
      setPreviewData(JSON.parse(storedPreviewData));
    }
  }, []);

  useEffect(() => {
    if (!videoData || previewData.length === 0) return;

    let animationFrameId: number;
    let lastUpdateTime = 0;

    const updatePreview = (currentTime: number) => {
      const player = playerRef.current?.getInternalPlayer() as HTMLVideoElement;
      const canvas = canvasRef.current;
      if (!player || !canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const currentPreviewPoint = previewData[currentPreviewIndex];

      player.currentTime = currentPreviewPoint.timeStamp;
      player.volume = currentPreviewPoint.volume;
      player.playbackRate = currentPreviewPoint.playbackRate;

      const [x, y, width, height] = currentPreviewPoint.coordinates;

      canvas.width = width - x;
      canvas.height = height - y;

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

      if (currentTime - lastUpdateTime >= 1000) {
        setCurrentPreviewIndex(
          (prevIndex) => (prevIndex + 1) % previewData.length
        );
        lastUpdateTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(updatePreview);
    };

    animationFrameId = requestAnimationFrame(updatePreview);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
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
    </div>
  );
};

export default Preview;
