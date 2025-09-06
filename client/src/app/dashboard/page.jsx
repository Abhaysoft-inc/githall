import React from 'react'
import Navbar from '.././../components/Navbar'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'], // Or other desired subsets
  display: 'swap', // Ensures text is visible during font loading
  variable: '--font-poppins', // CSS variable name
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] // Specify desired weights
});

const DashboardPage = () => {
  return (
    <>
      <Navbar />

      <div className="main flex">
        {/* sidebar */}

        <div className="sidebar w-1/4 border-r h-146 px-3 py-5">

          <p className={`text-white ${poppins.className}`}>Your Repos</p>


        </div>

        {/* subsbar */}

        <div className="subsbar w-3/4">

        </div>
      </div>


    </>
  )
}

export default DashboardPage