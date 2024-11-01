import React from 'react';
import { Link } from 'react-router-dom';

const ReceptionistNavbar = ({ activePage }) => {
  return (
    <nav className="flex justify-center py-4 space-x-10 bg-white shadow-lg">
      <Link
        to="/bookings"
        className={`text-gray-700 hover:text-blue-500 font-semibold ${activePage === 'bookings' ? 'border-b-2 border-blue-500' : ''}`}
      >
        Booking Details
      </Link>
      <Link
        to="/roomsd"
        className={`text-gray-700 hover:text-blue-500 font-semibold ${activePage === 'roomsd' ? 'border-b-2 border-blue-500' : ''}`}
      >
        Rooms Details
      </Link>
      <Link
        to="/add-room"
        className={`text-gray-700 hover:text-blue-500 font-semibold ${activePage === 'add-room' ? 'border-b-2 border-blue-500' : ''}`}
      >
        Add Room
      </Link>
    </nav>
  );
};

export default ReceptionistNavbar;
