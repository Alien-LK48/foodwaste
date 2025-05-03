import React from 'react'
import Prblm from './prblm'
import Hero from './Hero'
import Steps from './Steps'
import CTA from './CTA'
import Tips from './Tips'
import Contact from './Contact'
import AboutUs from './Aboutus'
import Footer from '../../components/footer/Footer'
export default function Home() {
  return (
    <>
      <Hero /> <br />
      <Prblm /> <br />
      <AboutUs /> <br />
      <Steps /> <br />
      <CTA />
      <Tips />
      <Contact /><br />
      <Footer />
    </>
  )
}
