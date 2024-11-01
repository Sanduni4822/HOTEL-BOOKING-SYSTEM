import React, { useState } from "react";
import PaymentInformation from "../../components/PaymentInformationComponent/PaymentInformation"; // Import Payment Information component
import { useLocation } from "react-router-dom";

const ConfirmBookingProceedPaymentPage = () => {
  // Accept bookingDetails as a prop
  const location = useLocation();
  const reservationData = location.state; // Access the passed state data

  if (!reservationData) {
    // Optionally handle the case where no data is passed
    return <div>No reservation data found.</div>;
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [confirmViaPhone, setConfirmViaPhone] = useState(false);
  const [receiveOffers, setReceiveOffers] = useState(true);
  

  const handleCheckboxChange = (setter) => {
    setter((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.firstName) formErrors.firstName = "Enter the first name";
    if (!formData.lastName) formErrors.lastName = "Enter the last name";
    if (!formData.email) formErrors.email = "Enter the email";
    if (!formData.phone) formErrors.phone = "Enter the phone number";
    if (!formData.address) formErrors.address = "Enter the address";
    if (!formData.city) formErrors.city = "Enter the city";
    if (!formData.state) formErrors.state = "Enter the state/country";
    if (!formData.postcode) formErrors.postcode = "Enter the postcode";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const [payload, setPayload] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        rid: 2,
        checkInDate: reservationData.checkInDate,
        checkOutDate: reservationData.checkOutDate,
        bookedDate: new Date().toISOString().split("T")[0],
        gname: `${formData.firstName} ${formData.lastName}`,
        gemail: formData.email,
        address: formData.address,
        gphone: formData.phone,
        notes: formData.notes,
        postCode: formData.postcode,
        country: formData.state,
        city: formData.city,
        adultsCount: `${reservationData.adults}`,
        childrenCount: `${reservationData.children}`,
        totalGuest: `${reservationData.total}`,
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/bookingpending/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        console.log(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        alert("Booking successfully completed");

        const data = await response.json();
        console.log("Booking successful:", data);

        localStorage.setItem("bookingPendingId", data.body.bid);

        // Save the response data to localStorage
        localStorage.setItem("bookingData", JSON.stringify(data));

        // Optionally, set payload state
        setPayload(payload);
      } catch (error) {
        console.error("Error during booking:", error);
      }
    } else {
      console.log("Form has errors:", errors);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen p-4 bg-gray-100">
      {/* Parent container for both forms */}
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 mt-1 lg:grid-cols-2">
        {/* Left side: Confirm Booking Form */}
        <div className="p-6 bg-white border border-gray-400">
          <form onSubmit={handleSubmit} className="w-full">
            {/* Section Title */}
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-8 h-8 mr-2 text-white bg-red-500 rounded-full">
                1
              </div>
              <h2 className="text-2xl font-bold text-gray-700">
                Your Information
              </h2>
            </div>

            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring focus:border-blue-500`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring focus:border-blue-500`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring focus:border-blue-500`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring focus:border-blue-500`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:border-blue-500`}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">{errors.address}</p>
              )}
            </div>

            {/* City and State */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring focus:border-blue-500`}
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  className="block mb-2 font-bold text-gray-700"
                  htmlFor="state"
                >
                  State/Country
                </label>
                <input
                  id="state"
                  type="text"
                  placeholder="Enter your state/country"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring focus:border-blue-500`}
                />
                {errors.state && (
                  <p className="mt-1 text-xs text-red-500">{errors.state}</p>
                )}
              </div>
            </div>

            {/* Postcode */}
            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="postcode"
              >
                Postcode
              </label>
              <input
                id="postcode"
                type="text"
                placeholder="Enter your postcode"
                value={formData.postcode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.postcode ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring focus:border-blue-500`}
              />
              {errors.postcode && (
                <p className="mt-1 text-xs text-red-500">{errors.postcode}</p>
              )}
            </div>

            {/* Additional Notes */}
            <div className="mb-4">
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="notes"
              >
                Additional Notes
              </label>
              <textarea
                id="notes"
                placeholder="Any additional requests"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            {/* Confirmation and Offers Checkboxes */}
            <div className="flex items-center mb-4">
              <input
                id="confirmViaPhone"
                type="checkbox"
                checked={confirmViaPhone}
                onChange={() => handleCheckboxChange(setConfirmViaPhone)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="confirmViaPhone" className="ml-2 text-gray-700">
                Confirm via phone
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="receiveOffers"
                type="checkbox"
                checked={receiveOffers}
                onChange={() => handleCheckboxChange(setReceiveOffers)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="receiveOffers" className="ml-2 text-gray-700">
                Receive special offers and updates
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Proceed to Payment
            </button>
          </form>
        </div>

        {/* Right side: Payment Information */}
        <div>
          <PaymentInformation payload={payload} />{" "}
          {/* Pass payload to PaymentInformation */}
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingProceedPaymentPage;
