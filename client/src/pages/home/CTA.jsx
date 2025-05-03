import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/heading/Header'

export default function CTA() {
    return (
        <div className='border-x-[20px] mt-[-25px] border-[#3B42D2] border-double'>
            <div className="bg-green-600 text-white p-8 text-center rounded-lg w-[95%] ml-[35px]">
                <Header childern={`Be Part of the Change`}/>
                <p className="mt-2">Join us in rescuing food and feeding communities.</p>
                <button className="mt-4 px-6 py-2 bg-white text-green-600 font-semibold rounded-lg"> <Link to='/signup'>Join Us</Link> </button>
            </div>

        </div>
    )
}
