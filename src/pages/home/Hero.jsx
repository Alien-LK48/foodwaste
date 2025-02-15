import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  const register = () => {
    navigate('/signup')
  }
  return (
    <div
      className="p-[20px] bg-cover bg-center h-[480px] w-full flex flex-col justify-center items-center text-white text-center"
      style={{ backgroundImage: 'url(/hero.png)' }}
    >
      <h1 className="text-6xl font-bold text-black animate-heading">
        Rescue. Reuse. Revive
      </h1>
      <br />
      <p className="text-black text-justify">
        Every year, tons of perfectly good food go to waste while millions go hungry. We're here to change that. Join us in reducing food waste, redistributing surplus, and creating a more sustainable future—one meal at a time. Food waste isn't just wasted food—it's wasted resources, money, and opportunities. Our mission is simple: rescue surplus food, share it with those in need, and protect our planet. Be part of the change today! What if we told you that reducing food waste could help the environment and fight hunger at the same time? With your help, we can save fresh food from being discarded and make a real impact in our communities.
      </p>
      <br />
      <button onClick={register} className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-semibold transition-all">
        Join With Us
      </button>
    </div>
  )
}
