import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ReservationSummary = ({ reservation}) => {
  const {
    checkInDate,
    checkOutDate,
    numberOfDays,
    adults,
    children,
    totalPayment,
  } = reservation;

  const navigate = useNavigate(); // Use navigate hook

  const handleProceedToPayment = () => {
    // Calculate total guests
    const totalGuests = adults + children;

    // Prepare the data to be passed
    const reservationData = {
      checkInDate,
      checkOutDate,
      numberOfDays,
      adults,
      children,
      total: totalGuests,
      totalPayment,
    };

    // Print the reservation data to the console
    console.log('Reservation Data:', reservationData);

    // Navigate to Confirm Booking page with the necessary data
    navigate('/confirm-booking', { state: reservationData });
  };
  
  return (
    <div className="max-w-xs p-4 ml-10 bg-white border border-black">
      <h2 className="mb-4 text-lg font-bold">Reservation Summary</h2>

      {/* Check-in Date */}
      <div className="mb-2">
        <span className="font-semibold">Check-in Date:</span> {checkInDate}
      </div>

      {/* Check-out Date */}
      <div className="mb-2">
        <span className="font-semibold">Check-out Date:</span> {checkOutDate}
      </div>

      {/* Number of Days Booked */}
      <div className="mb-2">
        <span className="font-semibold">Number of Days Booked:</span> {numberOfDays}
      </div>

      {/* Number of Guests */}
      <div className="mb-2">
        <span className="font-semibold">Number of Guests:</span>
        <div>
          Adults: {adults} <br />
          Children: {children}
        </div>
      </div>

      {/* Total Payment */}
      <div className="mb-4">
        <span className="font-semibold">Total Payment:</span> ${totalPayment.toFixed(2)}
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleProceedToPayment} // Add onClick to navigate
        className="px-4 py-2 text-white transition-colors duration-200 bg-green-500 rounded-full hover:bg-green-600"
      >
        Confirm Booking & Proceed to Payment
      </button>
    </div>
  );
};

export default ReservationSummary;
