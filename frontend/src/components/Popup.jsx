import React from "react";

const Popup = ({ isOpen, onClose, message, type = "info" }) => {
  if (!isOpen) return null;
  const typeStyles = {
    info: {
      background: "bg-[#f0f9ff]",
      border: "border-[#365486]",
      icon: "🔷",
    },
    success: {
      background: "bg-[#f0f9ff]",
      border: "border-[#365486]",
      icon: "✅",
    },
    error: {
      background: "bg-[#f0f9ff]",
      border: "border-[#365486]",
      icon: "❌",
    },
    warning: {
      background: "bg-[#f0f9ff]",
      border: "border-[#365486]",
      icon: "⚠️",
    },
  };

  const styles = typeStyles[type] || typeStyles.info;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`
        ${styles.background} 
        ${styles.border} 
        ${styles.text}
        border-2 rounded-lg p-6 max-w-sm w-full shadow-xl relative
      `}
      >
        <div className="flex items-center mb-4">
          <span className="mr-3 text-2xl">{styles.icon}</span>
          <h2 className="text-lg font-semibold">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <p className="text-base">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#365486] text-white rounded hover:bg-[#2a4675]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
