import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { UserCog, Stethoscope, Trash2 } from "lucide-react";
import { AuthContext } from "@/context/AuthProvider";
// import { AuthContext } from "@/provider/AuthProvider";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const { user, role } = useContext(AuthContext); // must expose `role` in context

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  const handleDelete = (id) => {
    if (role !== "admin") return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE",
          });

          if (res.ok) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            setUsers((prev) => prev.filter((user) => user._id !== id));
          } else {
            Swal.fire("Error", "Failed to delete user.", "error");
          }
        } catch (err) {
          console.error("Error deleting user:", err);
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleMakeAdmin = async (id) => {
    if (role !== "admin") return;

    try {
      const res = await fetch(`http://localhost:5000/users/admin/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        Swal.fire("Success!", "User has been made admin.", "success");
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: "admin" } : user
          )
        );
      } else {
        Swal.fire("Error", "Failed to make admin.", "error");
      }
    } catch (error) {
      console.error("Error making admin:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const handleMakeDoctor = async (id) => {
    if (role !== "admin") return;

    try {
      const res = await fetch(`http://localhost:5000/users/doctor/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        Swal.fire("Success!", "User has been made doctor.", "success");
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: "doctor" } : user
          )
        );
      } else {
        Swal.fire("Error", "Failed to make doctor.", "error");
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
                            className="flex items-center gap-1 bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600"
                          >
                            <UserCog size={16} /> Make Admin
                          </button>
                        )}
                        {user.role !== "doctor" && (
                          <button
                            onClick={() => handleMakeDoctor(user._id)}
                            className="flex items-center gap-1 bg-indigo-500 text-white text-sm px-2 py-1 rounded hover:bg-indigo-600"
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
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded"
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
