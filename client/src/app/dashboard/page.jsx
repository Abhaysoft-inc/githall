import React from 'react'
import Navbar from '.././../components/Navbar'
import { poppins } from '../../components/fonts';
import Sidebar from '../../components/dashboard/Sidebar';



const DashboardPage = () => {
  return (
    <>
      <Navbar />

      <div className="main flex">
        {/* sidebar */}

        <div className="sidebar w-1/4 border-r h-146 px-3 py-5">

          <Sidebar />


        </div>

        {/* subsbar */}

        <div className="subsbar w-3/4">


        </div>
      </div>


    </>
  )
}

export default DashboardPage