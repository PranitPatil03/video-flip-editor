import { useState } from "react";
import GeneratePreview from "../components/GeneratePreview";
import Preview from "../components/Preview";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState("generate");

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4 bg-[#2C2D30]">
      <div className="w-full max-w-7xl h-[85vh] flex flex-col items-start justify-between gap-6 p-4 sm:p-6 rounded-xl border border-gray-700 bg-[#37393F] text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 sm:gap-6">
          <h2 className="text-white text-xl font-semibold">Cropper</h2>
          <div className="w-full sm:w-auto bg-gray-600 rounded-lg p-1 text-center">
            <button
              className={`px-3 py-1 rounded text-sm sm:text-base ${
                activeTab === "preview" ? "bg-[#37393F]" : "bg-gray-600"
              } text-white transition-colors duration-200`}
              onClick={() => setActiveTab("preview")}
            >
              Preview Session
            </button>
            <button
              className={`px-3 py-1 rounded text-sm sm:text-base ${
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
  );
}
