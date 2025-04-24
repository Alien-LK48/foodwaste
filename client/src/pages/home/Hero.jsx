import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './css.css'

export default function Hero() {
  const navigate = useNavigate()
  const register = () => {
    navigate('/signup')
  }
  return (
    <div className="relative bg-cover bg-center h-[480px] w-full" style={{ backgroundImage: 'url(/hero.png)' }}>
      <div className="flex flex-row gap-[100px] p-[50px]">
        <div className="w-[630px]">
          <motion.h1
            whileInView={{ scale: [0, 1] }}
            transition={{ delay: 0.25, duration: 1 }}
            className="text-5xl font-bold animate-heading"
          >
            Rescue. Reuse. Revive
          </motion.h1>
          <br />
          <p className="text-black text-justify">
            Every year, tons of perfectly good food go to waste while millions go hungry. We're here to change that. Join us in reducing food waste, redistributing surplus, and creating a more sustainable future—one meal at a time. Food waste isn't just wasted food—it's wasted resources, money, and opportunities. Our mission is simple: rescue surplus food, share it with those in need, and protect our planet. Be part of the change today!
          </p>
          <br />
          <button
            onClick={register}
            className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-semibold transition-all"
          >
            Join With Us
          </button>
        </div>

        <div className="ring-container">
          <img src="/food1.jpeg" alt="Food 1" />
          <img src="/food2.jpeg" alt="Food 2" />
          <img src="/food3.jpeg" alt="Food 3" />
          <img src="/food4.jpeg" alt="Food 4" />
          <img src="/food5.jpeg" alt="Food 5" />
          <img src="/food6.jpeg" alt="Food 6" />
          <img src="/food7.jpeg" alt="Food 7" />
          <img src="/food8.jpeg" alt="Food 8" />
        </div>
      </div>
    </div>
  )
}
