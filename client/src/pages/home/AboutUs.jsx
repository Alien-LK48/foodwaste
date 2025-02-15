import React from 'react'
import { Link } from 'react-router-dom'
export default function AboutUs() {
  return (
    <div className="bg-gray-100 py-12 text-center">
      <h2 className="text-4xl font-bold text-gray-900">About Us</h2>
      <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
        We are a mission-driven organization focused on reducing food waste and combating hunger.
        Our goal is to rescue surplus food, redistribute it to communities in need, and promote a more sustainable future.
        Join us in our journey to make a positive impact on the world, one meal at a time.
      </p>
      <div className="mt-8">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all">
          <Link to='/about'> Learn More</Link>
        </button>
      </div>
    </div>
  )
}
