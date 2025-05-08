import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate, useParams } from "react-router-dom"; // use react-router-dom not "react-router"

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateDoctor = () => {
  const doctor = useLoaderData(); // ✅ get doctor from route loader
  const navigate = useNavigate();
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [specialty, setSpecialty] = useState(doctor.specialty || "");
  const [name, setName] = useState(doctor.name || "");
  const [email, setEmail] = useState(doctor.email || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = doctor.img; // fallback to existing image
    try {
      // Upload image if updated
      if (image) {
        const imageForm = new FormData();
        imageForm.append("image", image);

        const imageRes = await fetch(image_hosting_api, {
          method: "POST",
          body: imageForm,
        });

        const imageData = await imageRes.json();
        if (!imageData.success) throw new Error("Image upload failed");
        imageUrl = imageData.data.url;
      }

      // Prepare updated doctor object
      const updatedDoctor = {
        name,
        email,
        specialty: specialty, // match backend field
        img: imageUrl,
      };

      const res = await fetch(`https://medinex-tan.vercel.app/doctors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDoctor),
      });

      const data = await res.json();

      if (data.modifiedCount > 0 || data.acknowledged) {
        Swal.fire("Success", "Doctor information updated!", "success");
        navigate("/dashboard/admin/manage-doctor");
      } else {
        Swal.fire("Info", "No changes made.", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update doctor!", "error");
    }
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Update Doctor</h2>

        {/* Image Upload */}
        <div className="flex items-center mb-6">
          <label
            htmlFor="upload"
            className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
          >
            <img
              src={image ? URL.createObjectURL(image) : doctor.img}
              alt="profile"
              className="w-full h-full object-cover"
            />
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <span className="ml-3 text-gray-600 text-sm">
            Change profile picture
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Editable Fields */}
          <div>
            <label className="block mb-1 text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Specialty</label>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Specialty</option>
              <option>General physician</option>
              <option>Cardiologist</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
              <option>Pediatrics</option>
              <option>Gynecologist</option>
            </select>
          </div>

          {/* Read-only Fields */}
          <div>
            <label className="block mb-1 text-gray-600">Education</label>
            <input
              value={doctor.education}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              value={doctor.password}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Experience</label>
            <input
              value={doctor.experience}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Fees</label>
            <input
              value={doctor.fees}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Address</label>
            <input
              value={doctor.address}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-gray-600">About</label>
            <textarea
              value={doctor.about}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
              rows="4"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Update Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDoctor;
