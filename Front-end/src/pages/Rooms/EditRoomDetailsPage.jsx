import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { request } from "../../config/axiosConfig";
import ReceptionistNavbar from "../../components/ReceptionistNavbarComponent/ReceptionistNavbar";

const EditRoomDetailsPage = () => {
    const { roomId } = useParams();  // Assuming roomId is passed as a URL parameter
    const navigate = useNavigate();
    const [room, setRoom] = useState({
        rname: "",
        rtype: "",
        rfee: ""
    });

    // Fetch room details by ID on component mount
    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await request("GET", `/room/byid`, null, {
                    params: { rId: roomId },
                });
                setRoom(response.data.body);  // Set room data to state
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
    };

    // Handle form submission to update room details
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting room details:", room);  // Debugging data

        try {
            await request("PUT", `/room/update`, room, {
                params: { rId: roomId },
            });
            console.log("Update successful!");
            navigate("/roomsd");  // Navigate back to the rooms list
        } catch (error) {
            console.error("Error updating room details:", error);
        }
    };

    return (
        <div>
            <ReceptionistNavbar activePage="roomsd" />
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center">Edit Room Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Room Name:</label>
                    <input
                        type="text"
                        name="rname"
                        value={room.rname}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Room Type:</label>
                    <input
                        type="text"
                        name="rtype"
                        value={room.rtype}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Room Price:</label>
                    <input
                        type="number"
                        name="rfee"
                        value={room.rfee}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded">
                    Save Changes
                </button>
            </form>
        </div>
        </div>
    );
};

export default EditRoomDetailsPage;
