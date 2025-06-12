import React,{ useState } from 'react'
import Header from './components/Layout/Header'
import HeroSection from './components/LandingPageSections/HeroSection'
import Section2 from './components/LandingPageSections/Section2'
import Section3 from './components/LandingPageSections/Section3'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <HeroSection />
      <Section2 />
      <Section3 />
    </>
  )
}

export default App
