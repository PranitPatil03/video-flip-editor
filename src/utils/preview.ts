import { PreviewData } from "./types";

export let previewData: PreviewData[] = [];

export const getPreviewData = () => previewData;

export const setPreviewData = (data: PreviewData[]) => {
  previewData = data;
};

export const addPreviewDataPoint = (dataPoint: PreviewData) => {
  previewData.push(dataPoint);
};
