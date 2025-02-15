import React from 'react'
import { Link } from 'react-router-dom'

export default function CTA() {
    return (
        <>
            <div className="bg-green-600 text-white p-8 text-center rounded-lg">
                <h2 className="text-3xl font-bold">Be Part of the Change</h2>
                <p className="mt-2">Join us in rescuing food and feeding communities.</p>
                <button className="mt-4 px-6 py-2 bg-white text-green-600 font-semibold rounded-lg"> <Link to='/signup'>Join Us</Link> </button>
            </div>

        </>
    )
}
