import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { request } from "../../config/axiosConfig";
import ReceptionistNavbar from "../../components/ReceptionistNavbarComponent/ReceptionistNavbar";

const RoomsDetailsPage = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await request("GET", "/room/all");
        setRooms(response.data.body);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRooms();
  }, []);

  const deleteRoom = async (rId) => {
    try {
      await request("DELETE", `/room/delete`, null, { params: { rId } });
      setRooms((prevRooms) => prevRooms.filter((room) => room.rid !== rId));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const navigateToEditPage = (roomId) => {
    navigate(`/rooms/edit/${roomId}`);
  };

  return (
    <div>
      <ReceptionistNavbar activePage="roomsd" />
      <div className="min-h-screen p-6 bg-gray-100">
        <h2 className="mb-4 text-3xl font-bold text-center">Existing Rooms</h2>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Room Name</th>
                <th className="px-4 py-2 border">Room Type</th>
                <th className="px-4 py-2 border">Room Price</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length > 0 ? (
                rooms.map((room) => (
                  <tr key={room.rid} className="bg-gray-100">
                    <td className="px-4 py-2 border">{room.rid}</td>
                    <td className="px-4 py-2 border">{room.rname}</td>
                    <td className="px-4 py-2 border">{room.rtype}</td>
                    <td className="px-4 py-2 border">${room.rfee}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => navigateToEditPage(room.rid)} // Call navigate function
                        className="px-3 py-1 mr-2 text-white bg-blue-500 rounded"
                      >
                        View / Edit
                      </button>
                      <button
                        onClick={() => deleteRoom(room.rid)}
                        className="px-3 py-1 text-white bg-red-500 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center">
                    No rooms available.
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

export default RoomsDetailsPage;
