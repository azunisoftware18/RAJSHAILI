import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Mail, Phone, Clock, Trash2, X } from "lucide-react";

// Format date/time
const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Single message card
const MessageItem = ({ message, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-start space-x-4 p-5 transition-colors duration-200 rounded-lg shadow-sm border cursor-pointer ${
      message.unread
        ? "bg-white hover:bg-gray-50 border-gray-200/80"
        : "bg-gray-50 hover:bg-gray-100 border-gray-200/50"
    }`}
  >
    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
      {message.name ? message.name.charAt(0).toUpperCase() : "?"}
    </div>
    <div className="flex-1 overflow-hidden">
      <h3 className="text-lg font-bold text-gray-900 truncate">
        {message.name || "No Name"}
      </h3>
      <p className="text-sm text-gray-600">
        Email: <span className="font-medium">{message.email}</span>
      </p>
      <p className="text-gray-700 mt-2 text-sm line-clamp-2">
        {message.message}
      </p>
    </div>
    <p className="text-xs text-gray-400 self-start flex-shrink-0">
      {formatDateTime(message.createDAt)}
    </p>
  </div>
);

// Detail modal
const MessageDetailView = ({ message, onClose, onDelete }) => {
  if (!message) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">
          Message Details
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <User className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-semibold mr-2">From:</span> {message.name}
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-semibold mr-2">Email:</span>
            <a
              href={`mailto:${message.email}`}
              className="text-blue-600 hover:underline"
            >
              {message.email}
            </a>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-semibold mr-2">Phone:</span> {message.number}
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-3 text-gray-500" />
            <span className="font-semibold mr-2">Received:</span>{" "}
            {formatDateTime(message.createDAt)}
          </div>
        </div>

        <div className="prose text-gray-800 bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Message:</h3>
          <p>{message.message}</p>
        </div>

        <div className="mt-6 pt-4 border-t flex justify-end gap-3">
          <button
            onClick={() => onDelete(message.id)}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 size={18} /> Delete
          </button>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ContactMessage() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${import.meta.VITE_API_URL}/message-get-all`);
        setMessages(res.data.map((msg) => ({ ...msg, unread: true })));
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`${import.meta.VITE_API_URL}/message-delete/${id}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      setSelectedMessage(null);
      alert("Message deleted successfully ✅");
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message ❌");
    }
  };

  return (
    <>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4 md:p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Contact Messages
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Review and respond to all inquiries.
            </p>
          </header>

          <main className="space-y-6">
            {loading ? (
              <p className="text-center text-gray-500 py-10">
                Loading messages...
              </p>
            ) : messages.length > 0 ? (
              messages.map((message) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  onClick={() => setSelectedMessage(message)}
                />
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">No messages yet.</p>
              </div>
            )}
          </main>
        </div>

        {selectedMessage && (
          <MessageDetailView
            message={selectedMessage}
            onClose={() => setSelectedMessage(null)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}
