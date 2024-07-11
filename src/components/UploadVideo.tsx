import { UploadDropzone } from "@bytescale/upload-widget-react";

export default function UploadVideo() {
  const VITE_API_KEY = import.meta.env.VITE_API_KEY;

  if (!VITE_API_KEY) {
    throw new Error("API_KEY is not defined");
  }

  const options = {
    apiKey: VITE_API_KEY,
    maxFileCount: 1,
    showFinishButton: true,
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <UploadDropzone
        options={options}
        onUpdate={({ uploadedFiles }) =>
          console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"))
        }
        onComplete={(files) => alert(files.map((x) => x.fileUrl).join("\n"))}
        width="600px"
        height="375px"
      />
    </div>
  );
}
