import React, { useState } from "react";
import axios from "axios";

const DoctorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
    experience: "",
    about: "",
    fees: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("image", formData.image);
      data.append("experience", formData.experience);
      data.append("about", formData.about);
      data.append("fees", formData.fees);
      data.append("address", formData.address);

      const token = localStorage.getItem("adminToken"); // Or however you're storing it

      const res = await axios.post("/api/admin/adddoctor", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`, // optional if using auth middleware
        },
      });

      setMessage("Doctor added successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        image: null,
        experience: "",
        about: "",
        fees: "",
        address: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
        {/* Profile Picture Upload */}
        <div className="flex items-center mb-6">
          <label
            htmlFor="upload"
            className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">+</span>
            )}
            <input
              id="upload"
              type="file"
              accept="image/*"
              onChange={handleChange}
              name="image"
              className="hidden"
            />
          </label>
          <span className="ml-3 text-gray-600 text-sm">Upload doctor picture</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Doctor Name */}
            <div>
              <label className="block mb-1 text-gray-600">Doctor Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Speciality */}
            <div>
              <label className="block mb-1 text-gray-600">Specialty</label>
              <select
                name="specialty"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option>General physician</option>
                <option>Cardiologist</option>
                <option>Neurologist</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-600">Doctor Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Education */}
            <div>
              <label className="block mb-1 text-gray-600">Education</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Education"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block mb-1 text-gray-600">Experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
                <option value="6">6 years</option>
                <option value="7-10">7-10 years</option>
              </select>
            </div>

            {/* Fees */}
            <div>
              <label className="block mb-1 text-gray-600">Fees</label>
              <input
                type="text"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="Fees"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* About Me */}
          <div className="mt-4">
            <label className="block mb-1 text-gray-600">About Doctor</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Write about doctor"
              rows="4"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Doctor"}
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <div className="mt-4 text-center text-gray-700">{message}</div>
        )}
      </div>
    </div>
  );
};

export default DoctorForm;
