import React from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
    return (
        <>
            <div className="bg-blue-600 text-white p-8 text-center rounded-lg">
                <h2 className="text-3xl font-bold">Contact Us</h2>
                <p className="mt-2">We’d love to hear from you! Reach out for any questions or support.</p>
                <button className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg">
                    <Link to='/contact'>Get in Touch </Link>
                </button>
            </div>


        </>
    )
}
