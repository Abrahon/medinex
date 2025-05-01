import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Pencil } from 'lucide-react';
import Swal from 'sweetalert2';
import { AppContext } from '@/context/AppProvider';
import { Link } from 'react-router-dom';

const ManageDoctor = () => {

  const {doctors,setDoctors} = useContext(AppContext)


  const handleDeleteDoctor = (id) => {
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
              const res = await fetch(`http://localhost:5000/doctors/${id}`, {
                method: 'DELETE',
              });
      
              if (res.ok) {
                Swal.fire("Deleted!", "Doctor has been deleted.", "success");
                // Update local user list
                setDoctors(prev => prev.filter(doctor => doctor._id !== id));
              } else {
                Swal.fire("Error", "Failed to delete Doctor.", "error");
              }
            } catch (err) {
              console.error('Error deleting booking:', err);
              Swal.fire("Error", "Something went wrong.", "error");
            }
          }
        });
      };

  const handleUpdateDoctors = (id) => {
    // navigate to update page or show modal
    Swal.fire('Update feature coming soon!'); // Placeholder
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Manage Doctors: {doctors.length}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Specialty</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor._id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">
                  <img src={doctor.img} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" />
                </td>
                <td className="p-3 border">{doctor.name}</td>
                <td className="p-3 border">{doctor.email}</td>
                <td className="p-3 border">{doctor.specialty}</td>
                <td className="p-3 border space-x-2">
                <Link to ={`/dashboard/admin/update-doctor/${doctor._id}`}>
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <Pencil size={24} />
                  </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteDoctor(doctor._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-5 text-gray-500">
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctor;
