import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const DoctorForm = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const education = form.education.value;
    const email = form.email.value;
    const password = form.password.value;
    const experience = form.experience.value;
    const about = form.about.value;
    const fees = form.fees.value;
    const address = form.address.value;
    const specialty = form.specialty.value;

    try {
      let imageUrl = "";

      // Step 1: Upload image to imgbb
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

      // Step 2: Prepare doctor object
      const newDoctor = {
        name,
        education,
        email,
        password,
        experience,
        about,
        fees,
        address,
        specialty,
        img: imageUrl,
      };

      // Step 3: Send doctor data to backend
      const res = await fetch("https://medinex-tan.vercel.app/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDoctor),
      });

      if (!image) {
        Swal.fire("Error", "Doctor image is required!", "error");
        return;
      }
      const data = await res.json();
      if (data.insertedId) {
        Swal.fire("Success", "Doctor added successfully!", "success");
        form.reset();
        setImage(null); // ✅ Correctly reset image
      } else {
        throw new Error("Doctor addition failed");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="flex justify-center items-center  bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-6xl">
        {/* Profile Picture Upload */}
        <div className="flex items-center mb-6">
          <label
            htmlFor="upload"
            className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
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
              required
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <span className="ml-3 text-gray-600 text-sm">
            Upload doctor picture
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-600">Doctor Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Specialty</label>
              <select
                name="specialty"
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option>General physician</option>
                <option>Cardiologist</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
                <option>Pediatrics</option>
                <option>Gynecologist</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Doctor Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Education</label>
              <input
                type="text"
                name="education"
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Experience</label>
              <select
                name="experience"
                className="w-full border border-gray-300 rounded-md p-2"
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

            <div>
              <label className="block mb-1 text-gray-600">Fees</label>
              <input
                type="text"
                name="fees"
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-1 text-gray-600">About Doctor</label>
            <textarea
              name="about"
              rows="4"
              required
              className="w-full border border-gray-300 rounded-md p-2"
            ></textarea>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-naviblue transition-all duration-300"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm;
