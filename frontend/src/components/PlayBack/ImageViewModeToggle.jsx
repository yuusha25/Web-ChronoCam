import React from "react";
import EventLight from "../../assets/graph-light.png";
import EventDark from "../../assets/graph-dark.png";
import GridLight from "../../assets/grid-light.png";
import GridDark from "../../assets/grid-dark.png";

const ImageViewModeToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => onViewModeChange("event")}
          className={`
            flex items-center justify-center 
            p-2 rounded-md 
            ${
              viewMode === "event"
                ? "bg-[#365486] text-white"
                : "bg-[#e0e0e0] text-black"
            }
            hover:opacity-80 
            transition duration-300 
            w-full sm:w-auto
          `}
        >
          <img
            src={viewMode === "event" ? EventLight : EventDark}
            alt="Event View"
            className="w-6 h-6 sm:w-7 sm:h-7"
          />
          <span className="ml-2 hidden sm:inline">Event View</span>
        </button>

        <button
          onClick={() => onViewModeChange("grid")}
          className={`
            flex items-center justify-center 
            p-2 rounded-md 
            ${
              viewMode === "grid"
                ? "bg-[#365486] text-white"
                : "bg-[#e0e0e0] text-black"
            }
            hover:opacity-80 
            transition duration-300 
            w-full sm:w-auto
          `}
        >
          <img
            src={viewMode === "grid" ? GridLight : GridDark}
            alt="Grid View"
            className="w-6 h-6 sm:w-7 sm:h-7"
          />
          <span className="ml-2 hidden sm:inline">Grid View</span>
        </button>
      </div>
    </div>
  );
};

export default ImageViewModeToggle;
