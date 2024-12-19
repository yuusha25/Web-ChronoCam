import React, { useState } from "react";
import Popup from "../Popup";

const UserUsername = ({
  userData,
  usernameState,
  setUsernameState,
  handleUpdateUsername,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("info");

  const handleSave = () => {
    handleUpdateUsername();
    if (usernameState.message) {
      setPopupMessage(usernameState.message);
      setPopupType("success");
    } else if (usernameState.error) {
      setPopupMessage(usernameState.error);
      setPopupType("error");
    }
    setIsPopupOpen(true); // Buka popup
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
        <label className="text-base sm:text-lg md:text-xl font-bold">
          Username
        </label>

        {usernameState.isEditing ? (
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-3/4 space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={usernameState.newUsername}
              onChange={(e) =>
                setUsernameState((prev) => ({
                  ...prev,
                  newUsername: e.target.value,
                }))
              }
              className="bg-white border border-black p-2 rounded w-full text-sm sm:text-base md:text-lg"
            />
            <div className="flex space-x-2 w-full sm:w-auto">
              <button
                className="bg-[#365486] hover:bg-[#2a4675] text-base sm:text-lg md:text-xl text-white md:px-4 p-1 md:py-2 rounded flex-1 sm:flex-none"
                onClick={handleSave} // Panggil fungsi handleSave
              >
                Save
              </button>
              <button
                className="bg-[#5b6982] hover:bg-[#414b5c] text-base sm:text-lg md:text-xl text-white px-4 py-2 rounded flex-1 sm:flex-none"
                onClick={() =>
                  setUsernameState((prev) => ({
                    ...prev,
                    isEditing: false,
                  }))
                }
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center w-full sm:w-3/4 justify-between">
            <span className="flex-grow text-sm sm:text-base md:text-lg">
              {userData.username}
            </span>
            <button
              className="bg-[#365486] hover:bg-[#2a4675] text-base sm:text-lg md:text-xl text-white px-3 py-1.5 md:px-4 md:py-2 rounded"
              onClick={() =>
                setUsernameState((prev) => ({
                  ...prev,
                  isEditing: true,
                  newUsername: userData.username,
                }))
              }
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Komponen Popup */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message={popupMessage}
        type={popupType}
      />
    </>
  );
};

export default UserUsername;
