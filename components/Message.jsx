"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { toast } from "react-toastify";

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async() => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        toast.success("Message marked as read");
      }
    } catch (error) {
      console.log("Error marking message as read: ", error);
    }
  }

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });
  
      if (res.status === 200) {
        // Delete was successful
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
        toast.success("Message deleted");
      }
    } catch (error) {
      console.log("Error deleting message: ", error);
    }
  }

  if (isDeleted) {
    return null; // Return null to render nothing if the message is deleted
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      <h2 className="text-xl mb-4">
        {" "}
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      { !isRead && (
        <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>
        New
      </div>
      )}
      
      <p className="text-gray-700 text-lg">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href="mailto:recipient@example.com" className="text-blue-500">
            {" "}
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {" "}
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button onClick={handleReadClick} className={`mt-4 mr-3 ${isRead ? 'bg-grey-300' : 'bg-blue-500 text-white'} py-1 px-3 rounded-md`}>
        {isRead ? 'Mark As New' : 'Mark As Read'}
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export default Message;
