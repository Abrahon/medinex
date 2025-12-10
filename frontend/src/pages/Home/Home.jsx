import React, { useState } from "react";
import Doctors from "../Doctors/Doctors";
import Banner from "@/Components/Banner";
import SpecialityMenu from "@/Components/SpecialityMenu";
import TopDoctors from "@/Components/TopDoctors";
import Header from "@/Components/Header";
import MeetOurTeam from "@/Components/MeetOurTeam";
import OurLaboratory from "@/Components/OurLaboratory";
import Chat from "@/Components/Chat";
import ChatButton from "@/Components/ChatButton";

const Home = () => {
  const [showChat, setShowChat] = useState(false);

  const doctorEmail = "doctor1@example.com";
  const userEmail = "patient1@example.com";

  return (
    <div className="relative">
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
      <OurLaboratory />
      <MeetOurTeam />
      <ChatButton></ChatButton>

      {showChat && (
        <Chat
          doctorEmail={doctorEmail}
          userEmail={userEmail}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default Home;
