import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import VideoPreview from "./VideoPreview";
import { Button } from "./ui/button";
import { useVideo } from "../context/VideoContext";
import { PreviewData } from "../utils/types";
import { addPreviewDataPoint, getPreviewData } from "../utils/preview";

const GeneratePreview = () => {
  const {
    setIsCropperActive,
    isCropperActive,
    addPreviewDataPoint: addContextPreviewDataPoint,
    progress,
    cropperPosition,
    cropperDimensions,
    volume,
    playbackRate,
    previewData,
  } = useVideo();

  const [isStartCropperDisabled, setIsStartCropperDisabled] = useState(false);
  const [isGeneratePreviewDisabled, setIsGeneratePreviewDisabled] =
    useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsGeneratePreviewDisabled(!isCropperActive);
  }, [isCropperActive]);

  const handleCancel = () => {
    localStorage.removeItem("VideoFileData");
    navigate("/");
  };

  const handleStartCropper = () => {
    setIsCropperActive(true);
    setIsStartCropperDisabled(true);
  };

  const handleRemoveCropper = () => {
    setIsCropperActive(false);
    setIsStartCropperDisabled(false);
  };

  const handleGeneratePreview = () => {
    const newDataPoint: PreviewData = {
      timeStamp: progress,
      coordinates: [
        cropperPosition.x,
        cropperPosition.y,
        cropperPosition.x + cropperDimensions.width,
        cropperPosition.y + cropperDimensions.height,
      ],
      volume,
      playbackRate,
    };
    addContextPreviewDataPoint(newDataPoint);
    addPreviewDataPoint(newDataPoint);
    handleDownloadJSON();
  };

  const handleDownloadJSON = () => {
    const combinedData = [...previewData, ...getPreviewData()];
  
    const dataStr = JSON.stringify(combinedData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "preview_data.json";
  
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  // const handleGeneratePreview = () => {
  //   const newDataPoint: PreviewData = {
  //     timeStamp: progress,
  //     coordinates: [
  //       cropperPosition.x,
  //       cropperPosition.y,
  //       cropperPosition.x + cropperDimensions.width,
  //       cropperPosition.y + cropperDimensions.height,
  //     ],
  //     volume,
  //     playbackRate,
  //   };
  //   addContextPreviewDataPoint(newDataPoint);
  //   addPreviewDataPoint(newDataPoint);
  //   handleDownloadJSON()
  // };

  // const handleDownloadJSON = () => {
  //   const combinedData = [...previewData, ...getPreviewData()];
  
  //   const dataStr = JSON.stringify(combinedData, null, 2);
  //   const dataUri =
  //     "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
  //   const exportFileDefaultName = "preview_data.json";
  
  //   const linkElement = document.createElement("a");
  //   linkElement.setAttribute("href", dataUri);
  //   linkElement.setAttribute("download", exportFileDefaultName);
  //   linkElement.click();
  // };

  return (
    <div className="flex flex-col w-full h-full max-w-7xl mx-auto p-4 gap-20">
      <div className="flex flex-col lg:flex-row w-full gap-20 md:gap-4 mb-4">
        <VideoPlayer />
        <VideoPreview />
      </div>
      <div className="flex flex-col gap-5 w-full mt-auto">
        <hr className="border-[#494C55] w-full" />
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              className="bg-[#7C36D6] text-white text-sm sm:text-base font-medium rounded-xl w-full sm:w-auto"
              onClick={handleStartCropper}
              disabled={isStartCropperDisabled}
            >
              Start Cropper
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-[#7C36D6] text-white text-sm sm:text-base font-medium rounded-xl w-full sm:w-auto"
              onClick={handleRemoveCropper}
              disabled={!isCropperActive}
            >
              Remove Cropper
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-[#7C36D6] text-white text-sm sm:text-base font-medium rounded-xl w-full sm:w-auto"
              onClick={handleGeneratePreview}
              disabled={isGeneratePreviewDisabled}
            >
              Generate Preview
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="bg-[#45474E] text-white text-sm sm:text-base font-medium rounded-xl w-full sm:w-auto mt-2 sm:mt-0"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneratePreview;
