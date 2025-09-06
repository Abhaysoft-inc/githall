import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
    return (
        <div>
            <Navbar pageTitle={"Explore"} />

            <div className="main">
                <div className="px-2">
                    <div className="grid-cols-3">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page