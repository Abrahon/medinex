import React, { useState, useContext } from "react";
import Chat from "./Chat";
import { AuthContext } from "@/context/AuthProvider";

const ChatButton = () => {
  // ✅ Use your AuthContext here
  const { user, role } = useContext(AuthContext);

  const [openChat, setOpenChat] = useState(false);

  // Only show chat button if user or doctor is logged in
  if (!user || !role) return null;

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        onClick={() => setOpenChat(!openChat)}
      >
        💬{openChat ? "Close Chat" : "Chat"}
      </button>

      {openChat && (
        <Chat
          userEmail={role === "user" ? user.email : null}
          doctorEmail={role === "doctor" ? user.email : null}
          onClose={() => setOpenChat(false)}
        />
      )}
    </>
  );
};

export default ChatButton;
