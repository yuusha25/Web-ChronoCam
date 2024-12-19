import React from "react";
import Popup from "../Popup";

const UserPassword = ({
  passwordState,
  setPasswordState,
  handleUpdatePassword,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-base sm:text-lg md:text-xl  font-bold mb-4">
        Change Password
      </label>

      <div className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          value={passwordState.currentPassword}
          onChange={(e) =>
            setPasswordState((prev) => ({
              ...prev,
              currentPassword: e.target.value,
            }))
          }
          className="w-full border p-2 rounded text-sm sm:text-base md:text-lg"
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwordState.newPassword}
          onChange={(e) =>
            setPasswordState((prev) => ({
              ...prev,
              newPassword: e.target.value,
            }))
          }
          className="w-full border p-2 rounded text-sm sm:text-base md:text-lg"
        />
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            className="bg-[#365486] hover:bg-[#2a4675] text-base sm:text-lg md:text-xl text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={handleUpdatePassword}
          >
            Save Password
          </button>
        </div>
      </div>

      {passwordState.message && (
        <p className="text-green-500 text-sm sm:text-base mt-4">
          {passwordState.message}
        </p>
      )}
      {passwordState.error && (
        <p className="text-red-500 text-sm sm:text-base mt-4">
          {passwordState.error}
        </p>
      )}
    </div>
  );
};

export default UserPassword;
