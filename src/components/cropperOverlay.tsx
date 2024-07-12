/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useVideo } from "../context/VideoContext";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

export const CropperOverlay: React.FC = () => {
  const {
    cropperAspectRatio,
    playerRef,
    isCropperActive,
    setCropperPosition,
    setCropperDimensions,
  } = useVideo();

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    setCropperPosition({ x: data.x, y: data.y });
  };

  const [overlayDimensions, setOverlayDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (playerRef.current) {
        const playerElement = playerRef.current.getInternalPlayer();

        if (playerElement) {
          const playerRect = playerElement.getBoundingClientRect();
          const playerHeight = playerRect.height;
          const playerWidth = playerRect.width;

          let overlayWidth, overlayHeight;

          const [widthRatio, heightRatio] = (cropperAspectRatio as string)
            .split(":")
            .map(Number);

          if (widthRatio / heightRatio > playerWidth / playerHeight) {
            overlayWidth = playerWidth;
            overlayHeight = playerWidth * (heightRatio / widthRatio);
          } else {
            overlayHeight = playerHeight;
            overlayWidth = playerHeight * (widthRatio / heightRatio);
          }

          setOverlayDimensions({ width: overlayWidth, height: overlayHeight });
          setBounds({
            left: 0,
            top: 0,
            right: playerWidth - overlayWidth,
            bottom: playerHeight - overlayHeight,
          });
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    setCropperDimensions(overlayDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [cropperAspectRatio, playerRef, isCropperActive]);

  const initialOverlay = isCropperActive ? (
    <Draggable bounds={bounds} onDrag={handleDrag}>
      <div
        className="border-x-2 border-white absolute cursor-move top-0"
        style={{
          width: `${overlayDimensions.width}px`,
          height: `${overlayDimensions.height}px`,
          background: "rgba(255, 255, 255, 0.1)",
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
        }}
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            style={{
              border: index < 3 || index >= 6 ? "none" : "1px dotted white",
              borderLeft: index % 3 === 0 ? "none" : "1px dotted white",
              borderRight: index % 3 === 2 ? "none" : "1px dotted white",
            }}
          ></div>
        ))}
      </div>
    </Draggable>
  ) : null;

  return <>{initialOverlay}</>;
};
