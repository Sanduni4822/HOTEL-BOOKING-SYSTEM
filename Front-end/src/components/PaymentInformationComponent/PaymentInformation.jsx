import React, { useState } from "react";
import axios from "axios";

const PaymentInformation = ({ payload }) => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [bookingData, setBookingData] = useState(null);
  const [formData, setFormData] = useState({
    cardType: "",
    cardNumber: "",
    cardHolder: "",
    cvc: "",
    expiryMonth: "",
    expiryYear: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const payload2 = {
    rid: payload?.rid,
    checkInDate: payload?.checkInDate,
    checkOutDate: payload?.checkOutDate,
    bookedDate: payload?.bookedDate,
    gname: payload?.gname,
    gemail: payload?.gemail,
    address: payload?.address,
    gphone: payload?.gphone,
    notes: payload?.notes,
    postCode: payload?.postCode,
    country: payload?.country,
    city: payload?.city,
    adultsCount: payload?.adultsCount,
    childrenCount: payload?.childrenCount,
    totalGuest: payload?.totalGuest,
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setAgreeToTerms(checked);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const cardNumberRegex = /^\d{16}$/;
    const cvcRegex = /^\d{3,4}$/;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (!formData.cardType.trim()) errors.cardType = "Card type is required";
    if (!cardNumberRegex.test(formData.cardNumber))
      errors.cardNumber = "Card number must be 16 digits";
    if (!formData.cardHolder.trim())
      errors.cardHolder = "Card holder name is required";
    if (!cvcRegex.test(formData.cvc)) errors.cvc = "CVC must be 3 or 4 digits";

    const expiryMonth = parseInt(formData.expiryMonth, 10);
    if (!expiryMonth || expiryMonth < 1 || expiryMonth > 12)
      errors.expiryMonth = "Expiry month must be valid";

    const expiryYear = parseInt(formData.expiryYear, 10);
    if (
      !expiryYear ||
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      errors.expiryYear = "Expiry year must be valid";
    }

    if (!agreeToTerms) errors.agreeToTerms = "You must agree to the terms";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const queryParams = new URLSearchParams({
          cardNumber: formData.cardNumber,
          cvc: formData.cvc,
          amount: 123.5, // Replace with actual amount if dynamic
          name: formData.cardHolder,
          expMonth: formData.expiryMonth,
          expYear: formData.expiryYear,
          cardType: formData.cardType,
        }).toString();

        // First fetch for payment processing
        const paymentResponse = await fetch(
          `http://localhost:8080/api/v1/card/pay?${queryParams}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (paymentResponse.ok) {
          const contentType = paymentResponse.headers.get("content-type");
          let paymentData;
          if (contentType && contentType.includes("application/json")) {
            paymentData = await paymentResponse.json();
          } else {
            const textData = await paymentResponse.text();
            console.log("Payment processed successfully:", textData);
          }

          // If payment was successful, proceed to send booking data
          console.log("Sending booking data:", payload2); // Log the payload2 data

          const bookingResponse = await fetch(
            "http://localhost:8080/api/v1/booking/add",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload2), // Sending payload2 data
            }
          );

          if (bookingResponse.ok) {
            const bookingContentType =
              bookingResponse.headers.get("content-type");
            let bookingResponseData;
            if (
              bookingContentType &&
              bookingContentType.includes("application/json")
            ) {
              bookingResponseData = await bookingResponse.json();
            } else {
              const textData = await bookingResponse.text();
              console.log("Booking processed successfully:", textData);
              bookingResponseData = textData; // Store text response if it's not JSON
            }

            // Save booking data to state
            setBookingData(bookingResponseData);
            // Save booking data to local storage
            localStorage.setItem(
              "bookingData",
              JSON.stringify(bookingResponseData)
            );

            console.log(bookingResponseData);

            const emailData = {
              to: bookingResponseData.body.gemail,
              bookingId: bookingResponseData.body.bid,
              roomId: bookingResponseData.body.rid,
              checkInDate: bookingResponseData.body.checkInDate,
              gName: bookingResponseData.body.gname,
              checkOutDate: bookingResponseData.body.checkOutDate,
            };

            const queryString = new URLSearchParams(emailData).toString();
            const response = await axios.post(
              `/email/confirmation?${queryString}`
            );

            const bId = {
              bId: localStorage.getItem("bookingPendingId"),
            };

            const deletQueryString = new URLSearchParams(bId).toString();
            const deleteResponse = await axios.delete(
              `/bookingpending/delete?${deletQueryString}`
            );

            setSubmissionStatus({
              success: true,
              message: "Booking successful!",
              data: bookingResponseData,
            });
          } else {
            setSubmissionStatus({
              success: false,
              message: "Booking failed. Please try again.",
            });
            console.error("Booking failed:", bookingResponse.statusText);
          }
        } else {
          setSubmissionStatus({
            success: false,
            message: "Payment failed. Please try again.",
          });
          console.error("Payment failed:", paymentResponse.statusText);
        }
      } catch (error) {
        setSubmissionStatus({
          success: false,
          message: "An error occurred. Please try again later.",
        });
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-xl p-6 bg-white border border-gray-400"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-8 h-8 mr-2 text-white bg-red-500 rounded-full">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-700">
            PAYMENT INFORMATION
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="cardType"
            >
              Card Type
            </label>
            <input
              id="cardType"
              type="text"
              placeholder="Enter card type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.cardType}
              onChange={handleInputChange}
            />
            {formErrors.cardType && (
              <p className="text-red-500">{formErrors.cardType}</p>
            )}
          </div>

          <div>
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="cardNumber"
            >
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              placeholder="Enter card number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.cardNumber}
              onChange={handleInputChange}
            />
            {formErrors.cardNumber && (
              <p className="text-red-500">{formErrors.cardNumber}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="cardHolder"
            >
              Card Holder
            </label>
            <input
              id="cardHolder"
              type="text"
              placeholder="Enter card holder name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.cardHolder}
              onChange={handleInputChange}
            />
            {formErrors.cardHolder && (
              <p className="text-red-500">{formErrors.cardHolder}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="cvc">
              CVC
            </label>
            <input
              id="cvc"
              type="text"
              placeholder="Enter CVC"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.cvc}
              onChange={handleInputChange}
            />
            {formErrors.cvc && <p className="text-red-500">{formErrors.cvc}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="expiryMonth"
            >
              Expiry Month
            </label>
            <input
              id="expiryMonth"
              type="text"
              placeholder="MM"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.expiryMonth}
              onChange={handleInputChange}
            />
            {formErrors.expiryMonth && (
              <p className="text-red-500">{formErrors.expiryMonth}</p>
            )}
          </div>

          <div>
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="expiryYear"
            >
              Expiry Year
            </label>
            <input
              id="expiryYear"
              type="text"
              placeholder="YYYY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={formData.expiryYear}
              onChange={handleInputChange}
            />
            {formErrors.expiryYear && (
              <p className="text-red-500">{formErrors.expiryYear}</p>
            )}
          </div>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agreeToTerms"
            checked={agreeToTerms}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="agreeToTerms" className="text-gray-700">
            I agree to the terms and conditions
          </label>
        </div>
        {formErrors.agreeToTerms && (
          <p className="text-red-500">{formErrors.agreeToTerms}</p>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
        >
          Proceed to Pay
        </button>

        {submissionStatus && (
          <p
            className={`mt-4 ${
              submissionStatus.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {submissionStatus.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default PaymentInformation;
