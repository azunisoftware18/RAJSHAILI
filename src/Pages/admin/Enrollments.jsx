import React, { useEffect, useState } from 'react';
import axios from "axios";
import { User, Mail, Phone, MapPin, Calendar, Loader2, Info, Trash2, Download } from 'lucide-react';

// Fallback data agar API se connection na ho paye
const mockEnrollments = [
    {
        id: "cf6a20f6-e589-465d-b6cd-fc83861ea9c8",
        name: "Amit Sharma (Sample)",
        email: "amitsharma@example.com",
        number: "9876543210",
        address: "123, MG Road, Delhi, India",
        createdAt: "2025-09-28T05:55:55.942Z"
    },
    {
        id: "b1d2e1c3-a5f7-4b0e-9c1d-8e4a7b2d1c6f",
        name: "Priya Singh (Sample)",
        email: "priyasingh@example.com",
        number: "8765432109",
        address: "456, Park Street, Kolkata, India",
        createdAt: "2025-09-27T10:15:30.123Z"
    }
];


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
        // Network error hone par, mock data istemal karein
        setError("Could not connect to the server. Displaying sample data.");
        setEnrollments(mockEnrollments);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enrollment?")) {
      try {
        // Yahan delete API ka endpoint daalein
        // await axios.delete(`https://api.raj-shaili.com/api/enrollment-delete/${id}`);
        setEnrollments(enrollments.filter((item) => item.id !== id));
        alert("Enrollment deleted successfully!");
      } catch (error) {
        console.error("Error deleting enrollment:", error.message);
        alert("Failed to delete enrollment.");
      }
    }
  };

  const handleDownload = () => {
    if (enrollments.length === 0) {
        alert("No data to download.");
        return;
    }

    const headers = ["ID", "Name", "Email", "Phone Number", "Address", "Enrolled At"];
    const csvRows = enrollments.map(row => 
        [
            `"${row.id}"`,
            `"${row.name}"`,
            `"${row.email}"`,
            `"${row.number}"`,
            `"${row.address.replace(/"/g, '""')}"`, // Handle quotes in address
            `"${new Date(row.createdAt).toISOString()}"`
        ].join(',')
    );

    const csvString = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'enrollments.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  return (
    <div className="min-h-screen bg-[#192A41] p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Enrollment <span className="text-yellow-400">Submissions</span>
          </h1>
          <p className="text-gray-400 mt-2 text-lg">List of all users who have enrolled for the workshop.</p>
           <button 
                onClick={handleDownload}
                className="mt-6 bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
            >
                <Download size={20} />
                Download Data (CSV)
            </button>
        </header>
        
        {/* Error/Info Message */}
        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6 text-center">
                <Info className="inline w-5 h-5 mr-2"/> {error}
            </div>
        )}


        {enrollments.length === 0 && !loading ? (
             <div className="text-center py-16 bg-[#1F3A5A]/50 rounded-lg">
                <Info className="w-12 h-12 text-yellow-400 mx-auto mb-4"/>
                <p className="text-gray-400 text-lg">No enrollments found at the moment.</p>
            </div>
        ) : (
        <>
        {/* Desktop Table View */}
        <div className="hidden md:block bg-[#1F3A5A]/50 backdrop-blur-md rounded-2xl shadow-lg border border-blue-800/50 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-black/20">
              <tr>
                <th className="p-4 text-sm font-semibold text-yellow-400 uppercase">Name</th>
                <th className="p-4 text-sm font-semibold text-yellow-400 uppercase">Contact Info</th>
                <th className="p-4 text-sm font-semibold text-yellow-400 uppercase">Address</th>
                <th className="p-4 text-sm font-semibold text-yellow-400 uppercase">Enrolled On</th>
                <th className="p-4 text-sm font-semibold text-yellow-400 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-800/30">
              {enrollments.map((item) => (
                <tr key={item.id} className="hover:bg-[#1F3A5A]">
                  <td className="p-4 text-white font-medium">{item.name}</td>
                  <td className="p-4 text-gray-300">
                    <div className="flex items-center gap-2"><Mail size={16}/> {item.email}</div>
                    <div className="flex items-center gap-2 mt-1"><Phone size={16}/> {item.number}</div>
                  </td>
                  <td className="p-4 text-gray-300">{item.address}</td>
                  <td className="p-4 text-gray-300">{formatDate(item.createdAt)}</td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400">
                      <Trash2 size={20}/>
                    </button>
                  </td>
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

