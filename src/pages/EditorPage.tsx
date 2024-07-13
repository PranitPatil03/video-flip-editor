// In EditorPage.tsx
import { useState } from "react";
import GeneratePreview from "../components/GeneratePreview";
import Preview from "../components/Preview";
import { VideoProvider } from "../context/VideoContext";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState("generate");

  return (
    <VideoProvider>
      <div className="flex items-center justify-center min-h-screen w-full p-2 sm:p-4 bg-[#2C2D30]">
        <div className="w-full max-w-7xl h-[90vh] sm:h-[85vh] flex flex-col items-start justify-between gap-3 sm:gap-6 p-2 sm:p-4 md:p-6 rounded-xl border border-gray-700 bg-[#37393F] text-white">
          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-2 sm:gap-4">
            <h2 className="text-white text-lg sm:text-xl font-semibold">
              Cropper
            </h2>
            <div className="w-full sm:w-auto bg-gray-600 rounded-lg p-1 text-center">
              <button
                className={`px-2 sm:px-3 py-2 rounded text-sm sm:text-sm ${
                  activeTab === "preview" ? "bg-[#37393F]" : "bg-gray-600"
                } text-white transition-colors duration-200`}
                onClick={() => setActiveTab("preview")}
              >
                Preview Session
              </button>
              <button
                className={`px-2 sm:px-3 py-2 rounded text-sm sm:text-sm ${
                  activeTab === "generate" ? "bg-[#37393F]" : "bg-gray-600"
                } text-white transition-colors duration-200`}
                onClick={() => setActiveTab("generate")}
              >
                Generate Session
              </button>
            </div>
            <div></div>
          </div>

          <div className="w-full flex-grow overflow-auto">
            {activeTab === "generate" ? <GeneratePreview /> : <Preview />}
          </div>
        </div>
      </div>
    </VideoProvider>
  );
}
