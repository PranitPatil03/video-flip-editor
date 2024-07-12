import { useEffect, useRef } from "react";
import { FaYoutube } from "react-icons/fa";
import { useVideo } from "../context/VideoContext";

const VideoPreview = () => {
  const {
    playerRef,
    cropperPosition,
    cropperDimensions,
    cropperAspectRatio,
    isCropperActive,
    playing,
  } = useVideo();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const updatePreview = () => {
      const video = playerRef.current?.getInternalPlayer() as HTMLVideoElement;
      const canvas = previewCanvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!video || !ctx || !canvas || !isCropperActive || !playing) return;

      const [widthRatio, heightRatio] = cropperAspectRatio
        .split(":")
        .map(Number);
      const aspectRatio = widthRatio / heightRatio;

      const maxWidth = 300;
      const maxHeight = 300;

      let previewWidth, previewHeight;

      if (aspectRatio > 1) {
        previewWidth = Math.min(maxWidth, cropperDimensions.width);
        previewHeight = previewWidth / aspectRatio;
      } else {
        previewHeight = Math.min(maxHeight, cropperDimensions.height);
        previewWidth = previewHeight * aspectRatio;
      }

      canvas.width = previewWidth;
      canvas.height = previewHeight;

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      const scaleX = videoWidth / video.clientWidth;
      const scaleY = videoHeight / video.clientHeight;

      const cropX = cropperPosition.x * scaleX;
      const cropY = cropperPosition.y * scaleY;
      const cropWidth = cropperDimensions.width * scaleX;
      const cropHeight = cropperDimensions.height * scaleY;

      ctx.drawImage(
        video,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      animationFrameId = requestAnimationFrame(updatePreview);
    };

    if (isCropperActive && playing) {
      animationFrameId = requestAnimationFrame(updatePreview);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    playerRef,
    cropperPosition,
    cropperDimensions,
    cropperAspectRatio,
    isCropperActive,
    playing,
  ]);

  return (
    <div className="flex flex-col gap-5 items-center w-full h-full justify-between">
      <div>
        <p className="text-base font-semibold text-gray-400">Preview</p>
      </div>
      {isCropperActive && playing ? (
        <div className="flex flex-col gap-2 items-center justify-center">
          <canvas ref={previewCanvasRef} />
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center">
          <FaYoutube className="w-14 h-14 text-center" />
          <p className="">Preview not available</p>
          <div className="flex flex-col items-center justify-center text-base font-normal text-gray-400">
            <p>Please click on "Start Cropper"</p>
            <p>and then play video</p>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default VideoPreview;
