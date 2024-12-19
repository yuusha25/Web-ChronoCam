import React from "react";
import ImageThumbnail from "./ImageThumbnail";
import ImageUploadStats from "./ImageUploadStats";

const ImageDisplay = ({ images, error, viewMode, onImageClick }) => {
  return (
    <div className="w-full max-w-5xl lg:max-w-7xl bg-[#f0faff] rounded-lg shadow-md mb-8">
      {viewMode === "event" && <ImageUploadStats images={images} />}

      {viewMode === "grid" && (
        <div className="p-4 border rounded-md h-[610px] overflow-y-auto ">
          {error && (
            <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg mb-4">
              Error: {error}
            </div>
          )}

          {images.length === 0 && !error && (
            <div className="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">
              No images found
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex justify-center hover:scale-105 transition-transform duration-300"
              >
                <ImageThumbnail
                  image={image}
                  onClick={() => onImageClick(image)}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
