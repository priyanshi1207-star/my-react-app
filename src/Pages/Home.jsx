import React from 'react'
import Banner from '../Components/home/Banner'
import Hero from '../Components/home/Hero'
import Features from '../Components/Features'
import Testimonial from '../Components/home/Testimonial'
import CallToAction from '../Components/home/CallToAction'
import { Footprints } from 'lucide-react'
import Footer from '../Components/home/Footer'

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home