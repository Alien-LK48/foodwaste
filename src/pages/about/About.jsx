import React from 'react'
import Introduction from './Introduction'
import OurStory from './Ourstory'
import OurTeam from './OurTeam'
import HowYouCanHelp from './HowYouCanHelp'
import FAQ from './FAQ'
import Footer from '../../components/footer/Footer'

export default function About() {
  return (
    <div>
      <Introduction /><br />
      <OurStory /> <br />
      <OurTeam /><br />
      <HowYouCanHelp /><br />
      <FAQ />
      <Footer />
    </div>
  )
}
