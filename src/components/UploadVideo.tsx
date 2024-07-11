import { UploadWidgetResult } from "@bytescale/upload-widget";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useNavigate } from "react-router-dom";
import { VideoData } from "../utils/types";

export default function UploadVideo() {
  const navigate = useNavigate();

  const VITE_API_KEY = import.meta.env.VITE_API_KEY;

  if (!VITE_API_KEY) {
    throw new Error("API_KEY is not defined");
  }

  const handleVideoFileUpload = (files: UploadWidgetResult[]) => {
    console.log(files);
    const videoData:VideoData={
      accountId:files[0].accountId,
      fileUrl:files[0].fileUrl
    }
    localStorage.setItem("VideoFileData", JSON.stringify(videoData));
    navigate("/edit-video");
  };

  const options = {
    apiKey: VITE_API_KEY,
    maxFileCount: 1,
    showFinishButton: true,
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <UploadDropzone
        options={options}
        onUpdate={({ uploadedFiles }) =>
          console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"))
        }
        onComplete={(files) => handleVideoFileUpload(files)}
        width="600px"
        height="375px"
      />
    </div>
  );
}
