import React from "react";
import Doctors from "../Doctors/Doctors";
import Banner from "@/Components/Banner";
import SpecialityMenu from "@/Components/SpecialityMenu";
import TopDoctors from "@/Components/TopDoctors";
import Header from "@/Components/Header";
import MeetOurTeam from "@/Components/MeetOurTeam";
import OurLaboratory from "@/Components/OurLaboratory";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <SpecialityMenu></SpecialityMenu>
      <TopDoctors></TopDoctors>
      <Banner></Banner>
      <OurLaboratory></OurLaboratory>
      <MeetOurTeam></MeetOurTeam>
    </div>
  );
};

export default Home;
