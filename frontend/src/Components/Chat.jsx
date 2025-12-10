import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

// Initialize socket only once outside the component
const socket = io("https://medinex-tan.vercel.app");

const Chat = ({ doctorEmail, userEmail, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Unique chat room ID
  const chatId =
    doctorEmail < userEmail
      ? doctorEmail + "_" + userEmail
      : userEmail + "_" + doctorEmail;

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Fetch existing messages once
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `https://medinex-tan.vercel.app/chats/${chatId}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [chatId]);

  // Socket listeners
  useEffect(() => {
    // Join room
    socket.emit("joinRoom", chatId);

    // Remove previous listener to prevent duplicates
    socket.off("receiveMessage");

    // Listen for new messages from server with duplicate check
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => {
        const exists = prev.some(
          (m) =>
            m.text === message.text &&
            m.sender === message.sender &&
            new Date(m.createdAt).getTime() ===
              new Date(message.createdAt).getTime()
        );
        if (exists) return prev;
        return [...prev, message];
      });
    });

    // Cleanup listener on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [chatId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const message = {
      chatId,
      sender: userEmail,
      text: newMessage,
      createdAt: new Date(),
    };

    // 1️⃣ Optimistic update: show message immediately
    setMessages((prev) => [...prev, message]);
    setNewMessage(""); // clear input immediately

    try {
      // 2️⃣ Emit via socket for real-time chat
      socket.emit("sendMessage", message);

      // 3️⃣ Save message to backend (async, won't block UI)
      await axios.post("https://medinex-tan.vercel.app/chats", message);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Send on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-20 right-4 w-96 h-[500px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
        <h3 className="font-bold">Chat with Doctor</h3>
        <button className="text-white hover:text-gray-200" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col max-w-[70%] p-2 rounded-lg shadow ${
              msg.sender === userEmail
                ? "self-end bg-green-100"
                : "self-start bg-white"
            }`}
          >
            <span className="text-sm font-semibold">{msg.sender}</span>
            <span className="text-sm">{msg.text}</span>
            <span className="text-xs text-gray-400 mt-1 text-right">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 flex border-t border-gray-200">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-full hover:bg-blue-600 transition-colors"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
