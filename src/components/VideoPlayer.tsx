import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Input } from "./ui/input";
import { Play, Volume2 } from "lucide-react";
import { Pause } from "lucide-react";
import { Button } from "./ui/button";
import "../App.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { SelectGroup } from "./ui/select";
import { VideoData } from "../utils/types";
import { ScrollArea } from "../components/ui/scroll-area";

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [volumeProgress, setVolumeProgress] = useState(0.5);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cropperAspectRatio, setCropperAspectRatio] = useState("16:9");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setVolumeProgress(newVolume);
  };

  const handlePlaybackRateChange = (value: string) => {
    setPlaybackRate(parseFloat(value));
  };

  const handleCropperAspectRatioChange = (value: string) => {
    setCropperAspectRatio(value);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
    playerRef.current?.seekTo(newTime);
  };

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) {
      return "00:00:00";
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours().toString().padStart(2, "0");
    const mm = date.getUTCMinutes().toString().padStart(2, "0");
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  const VideoFileData = localStorage.getItem("VideoFileData");

  if (!VideoFileData) {
    return <div>Video File Not Found</div>;
  }

  const videoData: VideoData = JSON.parse(VideoFileData);

  const videoUrl = videoData.fileUrl;

  return (
    <div className="flex gap-5 items-center w-full h-full max-w-4xl mx-auto">
      <div className="overflow-hidden h-full rounded-xl flex flex-col w-full">
        <div className="p-3 pl-0 rounded-xl aspect-video">
          <ReactPlayer
            ref={playerRef}
            url={
              videoUrl !== null
                ? videoUrl
                : "https://upcdn.io/FW25c8M/raw/uploads/2024/07/11/4kUzT1YZ9p-Rocket.Chat%20Issue.mp4your-default-url"
            }
            width="100%"
            height="100%"
            playing={playing}
            volume={volume}
            playbackRate={playbackRate}
            onProgress={handleProgress}
            onDuration={handleDuration}
          />
        </div>

        <div className="w-full pr-4">
          <div className="flex justify-between items-center w-full">
            <Button
              onClick={handlePlayPause}
              className="text-white py-1 rounded bg-transparent hover:bg-transparent pl-0"
            >
              {playing ? (
                <Pause fill="white" />
              ) : (
                <Play fill="white" className="p-0" />
              )}
            </Button>
            <Input
              type="range"
              min={0}
              max={1}
              step="any"
              value={progress}
              onChange={handleSeekChange}
              className="custom-range h-1 p-0"
              style={
                { "--progress": `${progress * 100}%` } as React.CSSProperties
              }
            />
          </div>
          <div className="flex flex-row justify-between items-center gap-5 md:gap-1">
            <div className="flex justify-start text-white text-sm gap-2 py-3">
              <span className="text-base font-medium">
                {formatTime(progress * duration)}
              </span>
              <div className="border border-gray-400"></div>
              <span className="text-base font-medium text-gray-400">
                {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-white">
                <Volume2 fill="white" />
              </span>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={volumeProgress}
                onChange={handleVolumeChange}
                className="custom-range h-1 p-0 w-12 md:w-24"
                style={
                  {
                    "--progress": `${volumeProgress * 100}%`,
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
          <div className="py-3 flex flex-col md:flex-row gap-5 z-10">
            <div
              className={`relative ${
                openDropdown === "playback" ? "z-20" : "z-10"
              }`}
            > 
              <Select
                value={playbackRate.toString()}
                onValueChange={(value) => handlePlaybackRateChange(value)}
                onOpenChange={(open) =>
                  setOpenDropdown(open ? "playback" : null)
                }
              >
                <SelectTrigger className="w-full md:w-[170px] bg-inherit border-[#45474E]">
                  <SelectValue>
                    Playback speed{" "}
                    <span className="text-sm font-medium text-gray-400">
                      {`${playbackRate}x`}{" "}
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-inherit shadow-md text-white border-[#9BA6AB] z-30">
                  <SelectGroup className="w-full">
                    <ScrollArea className="h-[60px] md:h-[80px] w-full">
                      <SelectItem value="0.5">0.5x</SelectItem>
                      <SelectItem value="1">1x</SelectItem>
                      <SelectItem value="1.5">1.5x</SelectItem>
                      <SelectItem value="2">2x</SelectItem>
                    </ScrollArea>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div
              className={`relative ${
                openDropdown === "aspect" ? "z-20" : "z-10"
              } ${openDropdown === "playback" ? "mt-20 md:mt-0" : ""}`}
            >
              <Select
                value={cropperAspectRatio}
                onValueChange={(value) => handleCropperAspectRatioChange(value)}
                onOpenChange={(open) => setOpenDropdown(open ? "aspect" : null)}
              >
                <SelectTrigger className="w-full md:w-[210px] bg-inherit border-[#45474E]">
                  <SelectValue>
                    Cropper Aspect Ratio{" "}
                    <span className="text-sm font-medium text-gray-400">
                      {cropperAspectRatio}
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-inherit shadow-md text-white border-[#9BA6AB] z-30">
                  <SelectGroup>
                    <ScrollArea className="h-[60px] md:h-[80px] w-full">
                      <SelectItem value="9:18">9:18</SelectItem>
                      <SelectItem value="9:16">9:16</SelectItem>
                      <SelectItem value="4:3">4:3</SelectItem>
                      <SelectItem value="3:4">3:4</SelectItem>
                      <SelectItem value="1:1">1:1</SelectItem>
                    </ScrollArea>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
