import React, { useEffect, useState } from 'react';
import axios from "axios";
import { User, Mail, Phone, MapPin, Calendar, Trash2, Loader2, Info } from 'lucide-react';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get("https://api.raj-shaili.com/api/enrollment-get");
        setEnrollments(response.data.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching enrollments:", error.message);
        setError("Failed to fetch enrollment data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enrollment?")) {
      try {
        await axios.delete(`https://api.raj-shaili.com/api/enrollment-delete/${id}`);
        setEnrollments(enrollments.filter((item) => item.id !== id));
        alert("Enrollment deleted successfully!");
      } catch (error) {
        console.error("Error deleting enrollment:", error.message);
        alert("Failed to delete enrollment.");
      }
    }
  };
  
  const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric'
      });
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#192A41]">
            <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
        </div>
    );
  }
  
  if (error) {
       return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="text-center">
                 <Info className="w-12 h-12 text-red-500 mx-auto mb-4"/>
                <p className="text-xl">{error}</p>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Enrollment <span className="text-yellow-400">Submissions</span>
          </h1>
           <p className="text-gray-400 mt-2 text-lg">List of all users who have enrolled for the workshop.</p>
        </header>

        {enrollments.length === 0 ? (
             <div className="text-center py-16 rounded-lg">
                <Info className="w-12 h-12 text-yellow-400 mx-auto mb-4"/>
                <p className="text-gray-400 text-lg">No enrollments found at the moment.</p>
            </div>
        ) : (
        <>
        {/* Desktop Table View */}
        <div className="hidden md:block backdrop-blur-md rounded-2xl shadow-lg border border-blue-800/50 overflow-hidden">
          <table className="w-full text-left">
            <thead className="">
              <tr>
                <th className="p-4 text-sm font-semibold text-yellow-400 uppercase">Name</th>
                <th className="p-4 text-sm font-semibold text-yellow-400 uppercase">Contact Info</th>
                <th className="p-4 text-sm font-semibold text-yellow-400 uppercase">Address</th>
                <th className="p-4 text-sm font-semibold text-yellow-400 uppercase">Enrolled On</th>
                {/* <th className="p-4 text-sm font-semibold text-yellow-400 uppercase text-center">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-800/30">
              {enrollments.map((item) => (
                <tr key={item.id} className="">
                  <td className="p-4  font-medium">{item.name}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2"><Mail size={16}/> {item.email}</div>
                    <div className="flex items-center gap-2 mt-1"><Phone size={16}/> {item.number}</div>
                  </td>
                  <td className="p-4">{item.address}</td>
                  <td className="p-4">{formatDate(item.createdAt)}</td>
                  {/* <td className="p-4 text-center">
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400">
                      <Trash2 size={20}/>
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-4">
            {enrollments.map((item) => (
                <div key={item.id} className="bg-[#1F3A5A]/50 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-blue-800/50">
                    <div className="flex justify-between items-start">
                        <h2 className="text-lg font-bold text-white">{item.name}</h2>
                        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400">
                           <Trash2 size={20}/>
                        </button>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-gray-300">
                        <p className="flex items-center gap-2"><Mail size={16}/> {item.email}</p>
                        <p className="flex items-center gap-2"><Phone size={16}/> {item.number}</p>
                        <p className="flex items-center gap-2"><MapPin size={16}/> {item.address}</p>
                        <p className="flex items-center gap-2 pt-2 border-t border-blue-800/30 mt-2"><Calendar size={16}/> Enrolled: {formatDate(item.createdAt)}</p>
                    </div>
                </div>
            ))}
        </div>
        </>
        )}
      </div>
    </div>
  );
}
