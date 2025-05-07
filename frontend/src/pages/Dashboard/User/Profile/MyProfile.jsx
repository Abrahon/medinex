import { assets } from "@/assets/assets/assets_frontend/assets";
import { AuthContext } from "@/context/AuthProvider";
import React, { useContext, useState } from "react";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    image: assets.profile_pic,
    phone: "01710670341",
    address: {
      line1: "Dhaka, Bangladesh",
      line2: "Rangpur, Sador",
    },
    gender: "Male",
    dob: "2002-05-28", // Use YYYY-MM-DD for date input
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <div className="flex flex-col items-center text-center">
          <img
            className="w-36 h-36 rounded-full border-4 border-blue-500"
            src={
              user?.photoURL || "https://i.ibb.co/6BRR4mX/default-avatar.png"
            }
            alt="Profile"
          />

          {isEdit ? (
            <input
              className="text-xl font-semibold mt-4 text-center border-b border-gray-300 outline-none"
              type="text"
              value={user?.displayName || user?.name || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h2 className="text-2xl font-semibold mt-4">
              {user?.displayName || "Anonymous"}
            </h2>
          )}
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="space-y-4 text-gray-700">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <p>Email:</p>
            <p>{user?.email}</p>

            <p>Phone:</p>
            {isEdit ? (
              <input
                className="border px-3 py-1 rounded"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p>{userData.phone}</p>
            )}

            <p>Address:</p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  className="border px-3 py-1 rounded w-full"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                  type="text"
                />
                <input
                  className="border px-3 py-1 rounded w-full"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                  type="text"
                />
              </div>
            ) : (
              <p>
                {userData.address.line1}, {userData.address.line2}
              </p>
            )}
          </div>

          <h3 className="text-lg font-semibold mt-6">Basic Information</h3>
          <div className="grid grid-cols-[120px_1fr] gap-2 mt-2">
            <p>Gender:</p>
            {isEdit ? (
              <select
                className="border px-3 py-1 rounded w-fit"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="not selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}

            <p>Birthday:</p>
            {isEdit ? (
              <input
                className="border px-3 py-1 rounded w-fit"
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-600">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            className=" bg-blue-900 hover:bg-naviblue transition text-white px-6 py-2 rounded-full font-medium"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? "Save Information" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
