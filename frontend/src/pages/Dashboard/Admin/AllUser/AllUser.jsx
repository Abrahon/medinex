import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AllUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
          });
  
          if (res.ok) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            // Update local user list
            setUsers(prev => prev.filter(user => user._id !== id));
          } else {
            Swal.fire("Error", "Failed to delete user.", "error");
          }
        } catch (err) {
          console.error('Error deleting user:', err);
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };
  const handleMakeAdmin = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/users/admin/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (res.ok) {
        Swal.fire("Success!", "User has been made admin.", "success");
  
        // Refresh the user list
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: 'admin' } : user
          )
        );
      } else {
        Swal.fire("Error", "Failed to make admin.", "error");
      }
    } catch (error) {
      console.error('Error making admin:', error);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };
  
  


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Users : {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Photo</th>
              <th className="p-3 border-b">Full Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">
                    <img
                      src={user.image || 'https://via.placeholder.com/40'}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3 border-b">{user.name}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b capitalize">
                    {
                      user.role === 'admin'?(
                        <span className="text-green-600 font-medium">Admin</span>
                      ):(
                        <button
                         onClick={() => handleMakeAdmin(user._id)}
                          className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600">
                           Make Admin
                         </button>
                      )
                    }
  
                   </td>
                   <td className="p-3 border-b">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Delete
                    </button>
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
