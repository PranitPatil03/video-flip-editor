import { UploadWidgetResult } from "@bytescale/upload-widget";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function UploadVideo() {
  const navigate = useNavigate();

  const VITE_API_KEY = import.meta.env.VITE_API_KEY;

  if (!VITE_API_KEY) {
    throw new Error("API_KEY is not defined");
  }

  const handleVideoFileUpload = (files: UploadWidgetResult[]) => {
    console.log(files);

    const videoFile = files[0];
    const { mime, fileUrl } = videoFile.originalFile;

    if (!mime.startsWith("video/")) {
      toast.error("Please upload a video file.");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      return;
    }

    const video = document.createElement("video");
    video.src = fileUrl;

    video.onloadedmetadata = () => {
      const { videoWidth, videoHeight } = video;
      const aspectRatio = videoWidth / videoHeight;
      const isAspectRatioValid = Math.abs(aspectRatio - 16 / 9) < 0.01;

      if (isAspectRatioValid) {
        const videoData = {
          accountId: videoFile.accountId,
          fileUrl: videoFile.fileUrl,
        };
        localStorage.setItem("VideoFileData", JSON.stringify(videoData));
        navigate("/edit-video");
      } else {
        toast.error("Please upload a video with a 16:9 aspect ratio.");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    };

    video.onerror = () => {
      toast.error("Failed to load video. Please try again.");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    };
  };

  const options = {
    apiKey: VITE_API_KEY,
    maxFileCount: 1,
    showFinishButton: true,
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#2C2D30]">
      <Toaster></Toaster>
      <UploadDropzone
        options={options}
        onComplete={(files) => handleVideoFileUpload(files)}
        width="600px"
        height="375px"
        className="bg-[#37393F] rounded-2xl"
      />
    </div>
  );
}
