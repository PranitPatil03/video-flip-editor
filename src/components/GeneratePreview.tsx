import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import VideoPreview from "./VideoPreview";
import { Button } from "./ui/button";
import { VideoProvider } from "../context/VideoContext";

const GeneratePreview = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    localStorage.removeItem("VideoFileData");
    navigate("/");
  };

  return (
    <div className="flex flex-col w-full h-full max-w-7xl mx-auto p-4 gap-20">
      <div className="flex flex-col lg:flex-row w-full gap-20 md:gap-4 mb-4">
        <VideoProvider>
          <VideoPlayer />
        </VideoProvider>
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
            >
              Start Cropper
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-[#7C36D6] text-white text-sm sm:text-base font-medium rounded-xl w-full sm:w-auto"
            >
              Remove Cropper
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-[#7C36D6] text-white text-sm sm:text-base font-medium rounded-xl w-full sm:w-auto"
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
