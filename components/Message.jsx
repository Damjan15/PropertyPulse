"use client";

import { useState, useEffect } from "react";
import Spinner from "./Spinner";


const Message = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await fetch(`/api/messages`);

                if (res.status === 200) {
                    const data = await res.json();
                    setMessages(data);
                }
            } catch (error) {
                console.log("Error fetching messages: ", error);
            } finally {
                setLoading(false);
            }
        }

        getMessages();
    }, []);
  return (
    <div>Message</div>
  )
}

export default Message