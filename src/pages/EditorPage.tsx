import { useState } from "react";
import GeneratePreview from "../components/GeneratePreview";
import Preview from "../components/Preview";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function EditorPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("generate");

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="flex flex-col items-start justify-between gap-10 h-[95%] w-[85%] p-5 rounded-xl border bg-[#37393F] text-white">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 w-full gap-5">
            <h2 className="text-white text-xl font-semibold">Cropper</h2>
            <div className="md:space-x-2 bg-gray-600 rounded-lg p-1">
              <button
                className={`px-3 py-1 rounded ${
                  activeTab === "preview" ? "bg-[#37393F]" : "bg-gray-600"
                } text-white`}
                onClick={() => setActiveTab("preview")}
              >
                Preview Session
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  activeTab === "generate" ? "bg-[#37393F]" : "bg-gray-600"
                } text-white`}
                onClick={() => setActiveTab("generate")}
              >
                Generate Session
              </button>
            </div>
            <div></div>
          </div>

          <div className="w-full h-full">
            {activeTab === "generate" ? (
              <>
                <GeneratePreview></GeneratePreview>
              </>
            ) : (
              <>
                <Preview></Preview>
              </>
            )}
          </div>
          <hr className="border-[#494C55] w-full p-0" />
          <div className="w-full flex items-center justify-between mt-[-10px]">
            <div className="flex items-center justify-center gap-10 ">
              <Button
                variant="ghost"
                size="lg"
                className="bg-[#7C36D6] text-white text-base font-medium rounded-xl"
              >
                Start Cropper
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="bg-[#7C36D6] text-white text-base font-medium rounded-xl"
              >
                Remove Cropper
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="bg-[#7C36D6] text-white text-base font-medium rounded-xl"
              >
                Generate Preview
              </Button>
            </div>
            <Button
              variant="ghost"
              size="lg"
              className="bg-[#45474E] text-white text-base font-medium rounded-xl"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
