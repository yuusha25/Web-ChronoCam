import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFetchImages } from "../hooks/useFetchImages";
import ImageFilterForm from "../components/PlayBack/ImageFilterForm";
import ImageViewModeToggle from "../components/PlayBack/ImageViewModeToggle";
import ImageDisplay from "../components/PlayBack/ImageDisplay";
import ImageModal from "../components/PlayBack/ImageModal";

const PlaybacksPage = () => {
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const userId = localStorage.getItem("userId");
  const { images, error } = useFetchImages(userId, filters);

  const handleFilterSubmit = (filterData) => {
    setFilters(filterData);
  };

  const openModal = (image) => {
    setActiveImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveImage(null);
  };

  return (
    <div className="font-poppins">
      <Header />
      <main className="font-poppins min-h-screen flex flex-col items-center py-4 sm:py-8 px-4 sm:px-6">
        <div className="mt-[50px] md:mt-[100px]">
          <ImageFilterForm onSubmit={handleFilterSubmit} />
        </div>

        <ImageViewModeToggle
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <ImageDisplay
          images={images}
          error={error}
          viewMode={viewMode}
          onImageClick={openModal}
        />

        {isModalOpen && activeImage && (
          <ImageModal image={activeImage} closeModal={closeModal} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PlaybacksPage;
