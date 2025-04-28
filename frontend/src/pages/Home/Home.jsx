import React from 'react'
import Doctors from '../Doctors/Doctors'
import Banner from '@/Components/Banner'
import SpecialityMenu from '@/Components/SpecialityMenu'
import TopDoctors from '@/Components/TopDoctors'
import Header from '@/Components/Header'

const Home = () => {
  return (
    <div>
      <Header></Header>
      <SpecialityMenu></SpecialityMenu>
      <TopDoctors></TopDoctors>
      <Banner></Banner>
      {/* <Doctors></Doctors> */}
    </div>
  )
}

export default Home