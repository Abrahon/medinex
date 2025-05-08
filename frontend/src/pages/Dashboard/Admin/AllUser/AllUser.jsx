import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { UserCog, Stethoscope, Trash2 } from "lucide-react";
import { AuthContext } from "@/context/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
// import { AuthContext } from "@/provider/AuthProvider";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const { user, role } = useContext(AuthContext); // must expose `role` in context

  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    if (role !== "admin") return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${id}`);
        if (res.status === 200) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          setUsers((prev) => prev.filter((user) => user._id !== id));
        }
      } catch (err) {
        console.error("Error deleting user:", err);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  const handleMakeAdmin = async (id) => {
    if (role !== "admin") return;

    try {
      const res = await axiosSecure.patch(`/users/admin/${id}`);
      if (res.status === 200) {
        Swal.fire("Success!", "User made an admin", "success");
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: "admin" } : user
          )
        );
      }
    } catch (error) {
      console.error("Error making admin:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const handleMakeDoctor = async (id) => {
    if (role !== "admin") return;

    try {
      const res = await axiosSecure.patch(`/users/doctor/${id}`);
      if (res.status === 200) {
        Swal.fire("Success!", "User made a doctor", "success");
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: "doctor" } : user
          )
        );
      }
    } catch (error) {
      console.error("Error making doctor:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Users: {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Photo</th>
              <th className="p-3 border-b">Full Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">
                    <img
                      src={user.image || "https://via.placeholder.com/40"}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3 border-b">{user.name}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b capitalize">
                    {user.role || "user"}
                  </td>
                  <td className="p-3 border-b space-y-1">
                    {role === "admin" && (
                      <>
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleMakeAdmin(user._id)}
                            className="flex items-center gap-1 bg-blue-900 text-white text-sm px-2 py-1 rounded hover:bg-naviblue"
                          >
                            <UserCog size={16} /> Make Admin
                          </button>
                        )}
                        {user.role !== "doctor" && (
                          <button
                            onClick={() => handleMakeDoctor(user._id)}
                            className="flex items-center gap-1 bg-indigo-700 text-white text-sm px-2 py-1 rounded hover:bg-indigo-900"
                          >
                            <Stethoscope size={16} /> Make Doctor
                          </button>
                        )}
                        {/* <button
                          onClick={() => handleDelete(user._id)}
                          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded"
                        >
                          <Trash2 size={16} /> Delete
                        </button> */}
                      </>
                    )}
                  </td>
                  <td className="p-3 border-b">
                    {role === "admin" && (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="flex items-center gap-1 bg-red-700 hover:bg-red-800 text-white text-sm px-2 py-1 rounded"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
