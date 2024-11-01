import React, { useState } from "react";
import axios from "axios";
import ReceptionistNavbar from "../../components/ReceptionistNavbarComponent/ReceptionistNavbar";

const AddRoomPage = () => {
  const [formData, setFormData] = useState({
    roomName: "",
    type: "",
    feespernight: "",
    maxCount: "",
    description: "",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      rname: formData.roomName,
      rtype: formData.type,
      rfee: parseFloat(formData.feespernight),
      rmaxCount: parseInt(formData.maxCount),
      rdescription: formData.description,
      rimg1: formData.imageUrl1,
      rimg2: formData.imageUrl2,
      rimg3: formData.imageUrl3,
    };

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/room/add",
        payload
      );
      console.log("Room added successfully:", response.data);

      setFormData({
        roomName: "",
        type: "",
        feespernight: "",
        maxCount: "",
        description: "",
        imageUrl1: "",
        imageUrl2: "",
        imageUrl3: "",
      });
    } catch (error) {
      console.error("Error adding room:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ReceptionistNavbar activePage="add-room" />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Add a New Room</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="roomName"
            placeholder="Room Name"
            value={formData.roomName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {/* <input
            type="text"
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          /> */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select Room Type
            </option>
            <option value="Luxury Suite">Luxury Suite</option>
            <option value="Standard">Standard</option>
            <option value="The Penthouse">The Penthouse</option>
            <option value="Grand Suite">Grand Suite</option>
            <option value="Junior Suite">Junior Suite</option>
            <option value="Family Special">Family Special</option>
            <option value="Premium Room">Premium Room</option>
            <option value="Deluxe Suite">Deluxe Suite</option>
          </select>

          <input
            type="number"
            name="feespernight"
            placeholder="Fees per night"
            value={formData.feespernight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="maxCount"
            placeholder="Max Count"
            value={formData.maxCount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="imageUrl1"
            placeholder="Image URL 1"
            value={formData.imageUrl1}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="imageUrl2"
            placeholder="Image URL 2"
            value={formData.imageUrl2}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="imageUrl3"
            placeholder="Image URL 3"
            value={formData.imageUrl3}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full col-span-2 px-4 py-2 mt-4 text-white transition bg-black rounded hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? "Adding Room..." : "Add Room"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddRoomPage;
