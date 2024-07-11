import VideoPlayer from "./VideoPlayer";
import VideoPreview from "./VideoPreview";

const GeneratePreview = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-full items-center justify-between gap-3">
        <VideoPlayer></VideoPlayer>
        <VideoPreview></VideoPreview>
      </div>
    </>
  );
};

export default GeneratePreview;
