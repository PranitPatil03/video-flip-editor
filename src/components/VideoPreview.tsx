import { FaYoutube } from "react-icons/fa";

const VideoPreview = () => {
  return (
    <div className="flex flex-col gap-5 items-center w-full h-full justify-between">
      <div>
        <p className="text-base font-semibold text-gray-400 ">Preview</p>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <FaYoutube className="w-14 h-14 text-center"></FaYoutube>
        <p className="">Preview not available</p>
        <div className="flex flex-col items-center justify-center text-base font-normal text-gray-400">
          <p className="">Please click on “Start Cropper”</p>
          <p className=""> and then play video</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default VideoPreview;
