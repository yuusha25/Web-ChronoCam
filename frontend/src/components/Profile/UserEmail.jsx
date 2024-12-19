import React from "react";

const UserEmail = ({ email }) => (
  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
    <label className="text-base sm:text-lg md:text-xl font-bold">Email</label>
    <div className="text-sm sm:text-base md:text-lg sm:w-3/4"> {email}</div>
  </div>
);

export default UserEmail;
