import React, { useState } from "react";

const ImageFilterForm = ({ onSubmit }) => {
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      date,
      starttime: timeStart,
      endtime: timeEnd,
    });
    console.log("Filters applied:", { date, timeStart, timeEnd });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-center sm:space-x-4 mb-6 sm:mb-8"
    >
      <div className="flex items-center space-x-2 pr-1">
        <label
          htmlFor="date"
          className="text-black whitespace-nowrap sm:mr-0 mr-14"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-md px-1 text-sm md:text-base py-2 border border-black shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow"
        />
      </div>

      <div className="flex items-center space-x-2 pr-1">
        <label
          htmlFor="timeStart"
          className="mr-3 sm:mr-0 text-black whitespace-nowrap"
        >
          Time Start
        </label>
        <input
          type="time"
          id="timeStart"
          name="timeStart"
          value={timeStart}
          onChange={(e) => setTimeStart(e.target.value)}
          className="rounded-md text-sm md:text-base px-2 py-2 border border-black shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow"
        />
      </div>

      <div className="flex items-center space-x-2 pr-1">
        <label
          htmlFor="timeEnd"
          className="text-black whitespace-nowrap mr-5 sm:mr-0"
        >
          Time End
        </label>
        <input
          type="time"
          id="timeEnd"
          name="timeEnd"
          value={timeEnd}
          onChange={(e) => setTimeEnd(e.target.value)}
          className="rounded-md px-2 text-sm md:text-base py-2 border border-black shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow"
        />
      </div>

      <button
        type="submit"
        className="bg-[#365486] text-white font-bold rounded-md px-4 py-2 hover:bg-[#2a4675] transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default ImageFilterForm;
