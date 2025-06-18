import React,{ useState } from 'react'
import Header from './components/Layout/Header'
import HeroSection from './components/LandingPageSections/HeroSection'
import Section2 from './components/LandingPageSections/Section2'
import Section3 from './components/LandingPageSections/Section3'
import Section4 from './components/LandingPageSections/Section4'
import Section5 from './components/LandingPageSections/Section5'
import Section6 from './components/LandingPageSections/Section6'

function App() {

  return (
    <>
      <Header />
      <HeroSection />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </>
  )
}

export default App
