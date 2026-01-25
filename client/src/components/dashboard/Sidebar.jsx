import React from 'react';
import { poppins } from '../fonts';

const Sidebar = () => {
    return (
        <div>

            <p className={`text-white ${poppins.className}`}>Your Repos</p>

            {/* list down repos from the db */}

            <ul className='mt-10'>
                <li>Abhaysoft-inc/Curalynx</li>
                <li>Abhaysoft-inc/Curalynx</li>
            </ul>



        </div>
    )
}

export default Sidebar