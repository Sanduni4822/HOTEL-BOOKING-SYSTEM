import React, { useState, useEffect } from "react";
import { request } from "../../config/axiosConfig";
import axios from "axios";
import DateFilter from "../../components/ReceptionistBookingDetails/DateFilter";
import ReceptionistNavbar from "../../components/ReceptionistNavbarComponent/ReceptionistNavbar";

const BookingDetailsPage = () => {
  const [bookedDates, setBookedDates] = useState([]);
  const [bookings, setBookings] = useState({
    confirmedBookings: [],
    pendingBookings: [],
  });
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const monthDays = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    );
    setDays(monthDays);
  }, [currentYear, currentMonth]);

  const handleMonthChange = (direction) => {
    if (direction === "prev") {
      setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
      setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
    } else if (direction === "next") {
      setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
      setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
    }
  };

  const formatDate = (year, month, day) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}`;
  };
  const handleDateClick = (day) => {
    const formattedDate = formatDate(currentYear, currentMonth, day);

    setSelectedDates([...selectedDates, formattedDate]);

    setBookedDates((prevDates) =>
      prevDates.includes(day)
        ? prevDates.filter((d) => d !== day)
        : [...prevDates, day]
    );
  };

  const clearFilter = () => {
    setSelectedDates([]);
    setBookedDates([]);
    setBookings({
      confirmedBookings: [],
      pendingBookings: [],
    });
  };

  const fetchBookings = async () => {
    try {
      console.log(selectedDates);
      const params = new URLSearchParams();
      selectedDates.forEach((date) => params.append("bookedDates", date));
      const response = await axios.get(`/booking/filter?${params.toString()}`);

      console.log(response);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleBookingConfirmation = async (booking) => {
    const emailData = {
      to: booking.gemail,
      bookingId: booking.bid,
      roomId: booking.rid,
      checkInDate: booking.checkInDate,
      gName: booking.gname,
      checkOutDate: booking.checkOutDate,
    };

    try {
      // Add confirmed booking
      const response = await fetch("http://localhost:8080/api/v1/booking/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (response.ok) {
        // Delete pending booking
        const bId = { bId: booking.bid };
        const queryString = new URLSearchParams(bId).toString();
        await axios.delete(`/bookingpending/delete?${queryString}`);

        // Update state to reflect changes
        setBookings((prevBookings) => ({
          confirmedBookings: [...prevBookings.confirmedBookings, booking],
          pendingBookings: prevBookings.pendingBookings.filter(
            (b) => b.bid !== booking.bid
          ),
        }));

        // Send confirmation email
        const queryString1 = new URLSearchParams(emailData).toString();
        await axios.post(`/email/confirmation?${queryString1}`);

        console.log("Booking confirmed and email sent.");
      } else {
        console.error("Failed to confirm booking.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleBookingDeletion = async (bid) => {
    const bId = {
      bId: bid,
    };

    const queryString = new URLSearchParams(bId).toString();
    const response = await axios.delete(
      `/bookingpending/delete?${queryString}`
    );

    setBookings((prevBookings) => ({
      ...prevBookings,
      pendingBookings: prevBookings.pendingBookings.filter(
        (booking) => booking.bid !== bid
      ),
    }));
  };

  return (
    <div>
      <ReceptionistNavbar activePage="bookings" />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        {/* Calendar Section */}
        <div className="w-full bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            {/* Month and Year Selector */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleMonthChange("prev")}
                className="text-gray-500 hover:text-gray-700"
              >
                &lt;
              </button>
              <span>
                {new Date(currentYear, currentMonth).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {currentYear}
              </span>
              <button
                onClick={() => handleMonthChange("next")}
                className="text-gray-500 hover:text-gray-700"
              >
                &gt;
              </button>
            </div>

            {/* Clear Filter Button */}
            <button
              onClick={clearFilter}
              className="text-white bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear Filter
            </button>
          </div>
          <div className="w-3/4 pl-4">
            {/* Date Selection */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="font-bold">
                  {day}
                </div>
              ))}
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`p-2 ${
                    bookedDates.includes(day)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  } hover:bg-gray-200 rounded`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Fetch Bookings Button */}
            <button
              onClick={fetchBookings}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Show Bookings
            </button>
          </div>
        </div>

        {/* Booking Table Section */}
        <div className="w-full bg-white rounded-lg shadow-lg mt-4">
          <h2 className="text-2xl font-bold p-4 text-center">Bookings</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Booking ID</th>
                <th className="border px-4 py-2">Room ID</th>
                <th className="border px-4 py-2">Check-In</th>
                <th className="border px-4 py-2">Check-Out</th>
                <th className="border px-4 py-2">Guest Name</th>
                <th className="border px-4 py-2">Guest Email</th>
                <th className="border px-4 py-2">Adults</th>
                <th className="border px-4 py-2">Children</th>
                <th className="border px-4 py-2">Total Guest</th>
                <th className="border px-4 py-2">Confirmation</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.confirmedBookings.length > 0 ||
              bookings.pendingBookings.length > 0 ? (
                <>
                  {/* Render confirmed bookings */}
                  {bookings.confirmedBookings.map((booking) => (
                    <tr key={booking.bId}>
                      <td className="border px-4 py-2">{booking.bid}</td>
                      <td className="border px-4 py-2">{booking.rid}</td>
                      <td className="border px-4 py-2">
                        {booking.checkInDate}
                      </td>
                      <td className="border px-4 py-2">
                        {booking.checkOutDate}
                      </td>
                      <td className="border px-4 py-2">{booking.gname}</td>
                      <td className="border px-4 py-2">{booking.gemail}</td>
                      <td className="border px-4 py-2">
                        {booking.adultsCount}
                      </td>
                      <td className="border px-4 py-2">
                        {booking.childrenCount}
                      </td>
                      <td className="border px-4 py-2">{booking.totalGuest}</td>
                      <td className="border px-4 py-2">Confirmed</td>
                      <td className="border px-4 py-2">-</td>
                    </tr>
                  ))}

                  {/* Render pending bookings */}
                  {bookings.pendingBookings.map((booking) => (
                    <tr key={booking.bId}>
                      <td className="border px-4 py-2">{booking.bid}</td>
                      <td className="border px-4 py-2">{booking.rid}</td>
                      <td className="border px-4 py-2">
                        {booking.checkInDate}
                      </td>
                      <td className="border px-4 py-2">
                        {booking.checkOutDate}
                      </td>
                      <td className="border px-4 py-2">{booking.gname}</td>
                      <td className="border px-4 py-2">{booking.gemail}</td>
                      <td className="border px-4 py-2">
                        {booking.adultsCount}
                      </td>
                      <td className="border px-4 py-2">
                        {booking.childrenCount}
                      </td>
                      <td className="border px-4 py-2">{booking.totalGuest}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded"
                          onClick={() => handleBookingConfirmation(booking)}
                        >
                          Confirm
                        </button>
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleBookingDeletion(booking.bid)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan="11" className="text-center py-4">
                    No bookings available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
