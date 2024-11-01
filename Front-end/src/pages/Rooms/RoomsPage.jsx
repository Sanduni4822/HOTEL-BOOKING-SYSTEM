import { useNavigate } from "react-router-dom";
import { request } from "../../config/axiosConfig";

import WifiIcon from "../../assets/facilityicons/WifiIcon.png";
import CleaningIcon from "../../assets/facilityicons/CleaningIcon.png";
import AirConditionerIcon from "../../assets/facilityicons/AirConditionerIcon.png";
import ShowerIcon from "../../assets/facilityicons/ShowerIcon.jpg";
import MinibarIcon from "../../assets/facilityicons/MinibarIcon.png";
import SafetyLockerIcon from "../../assets/facilityicons/SafetyLockerIcon.png";
import BreakfastIcon from "../../assets/facilityicons/BreakfastIcon.png";
import TowelsIcon from "../../assets/facilityicons/TowelsIcon.jpg";
import React, { useState, useEffect } from "react";
import RoomImage from "../../assets/roompageimage/room.jpg";
import BookingComponent from "../../components/BookingComponent/BookingComponent";

const amenitiesWithIcons = {
  "Free wifi": WifiIcon,
  Cleaning: CleaningIcon,
  "Air conditioner": AirConditionerIcon,
  Shower: ShowerIcon,
  Minibar: MinibarIcon,
  "Safety locker": SafetyLockerIcon,
  Breakfast: BreakfastIcon,
  Towels: TowelsIcon,
};

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  const handleTransformedData = (data) => {
    setRooms(data);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await request("GET", "/room/all");
        console.log(response);

        const routeMapping = {
          "Luxury Suite": "/luxurysuite",
          "Standard": "/standard",
          "The Penthouse": "/penthhouse",
          "Grand Suite": "/grandsuite",
          "Junior Suite": "/juniorsuite",
          "Family Special": "/familyspecial",
          "Premium Room": "/premiumroom",
          "Deluxe Suite": "/deluxesuite",
        };

        const transformedData = response.data.body.map((item) => ({
          id: item.rid,
          rname: item.rname,
          rimg1: item.rimg1,
          rimg2: item.rimg2,
          rimg3: item.rimg3,
          rdescription: item.rdescription,
          rmaxCount: item.rmaxCount,
          rfee: item.rfee,
          rating: (Math.random() * 4 + 1).toFixed(1),
          reviews: Math.floor(Math.random() * 10) + 1,
          route: routeMapping[item.rtype] || "/defaultRoute",
          amenities: [
            "Free wifi",
            "Cleaning",
            "Air conditioner",
            "Shower",
            "Minibar",
            "Safety locker",
            "Breakfast",
            "Towels",
          ],
        }));

        setRooms(transformedData);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRooms();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center relative">
      {/* Title */}
      <div className="w-full bg-blue-500 text-white text-3xl font-bold py-4 text-center">
        Rooms
      </div>

      {/* Room image with Booking component overlay */}
      <div className="relative w-full">
        <img
          src={RoomImage}
          alt="Additional Room"
          className="w-full h-auto object-cover"
        />

        {/* Booking component overlay */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
          <BookingComponent onTransformedData={handleTransformedData} />
        </div>
      </div>

      {/* Description section */}
      <div className="flex justify-center items-center text-center mt-8">
        <p className="text-2xl">
          EXTERIOR AND INTERIOR 360 TOUR <br />
          WITH 9 LOCATIONS
        </p>
      </div>

      {/* Rooms grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mt-8">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="relative border rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={room.rimg1}
              alt={room.rname}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{room.rname}</h3>
              <ul className="flex flex-wrap mt-2">
                {room.amenities.map((amenity, index) => (
                  <li
                    key={index}
                    className="flex justify-center items-center m-1"
                  >
                    <img
                      src={amenitiesWithIcons[amenity]}
                      alt={`${amenity} icon`}
                      className="w-5 h-5"
                    />
                  </li>
                ))}
              </ul>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">
                  {"★".repeat(room.rating)}
                  {"☆".repeat(5 - room.rating)}
                </span>
                <span className="ml-2 text-gray-600">
                  {room.reviews} review{room.reviews > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4">
                {/* <span className="text-gray-600">1 King Bed</span> */}
                {/* <span className="text-gray-600">4 Guests</span> */}
              </div>
            </div>
            {/* "More" Button */}
            <div className="absolute bottom-4 right-4">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => navigate(room.route)}
              >
                More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
