import React, { useState } from 'react';

const ReserveRoomForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    checkinDate: '',
    checkoutDate: '',
    adults: 0,
    children: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass form data to the parent component
    onSubmit(formData);
  };

  // Calculate total guests
  const totalGuests = parseInt(formData.adults, 10) + parseInt(formData.children, 10);

  return (
    <div className="max-w-md p-6 mx-10 border border-black">
      <h2 className="mb-6 text-2xl font-bold">Reserve Room</h2>
      <form onSubmit={handleSubmit}>
        {/* Booking Period */}
        <div className="mb-4">
          <label className="block text-gray-700">Booking Period</label>
          <div className="flex space-x-4">
            <input
              type="date"
              id="checkinDate"
              name="checkinDate"
              value={formData.checkinDate}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
            <input
              type="date"
              id="checkoutDate"
              name="checkoutDate"
              value={formData.checkoutDate}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
        </div>

        {/* Number of Guests */}
        <div className="mb-4">
          <label className="block text-gray-700">Number of Guests</label>
          <div className="flex space-x-4">
            <input
              type="number"
              id="adults"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              min="0"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="0"
              required
            />
            <input
              type="number"
              id="children"
              name="children"
              value={formData.children}
              onChange={handleChange}
              min="0"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="0"
              required
            />
          </div>
        </div>

        {/* Total Guests */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Total Guests: {totalGuests}</label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ReserveRoomForm;
