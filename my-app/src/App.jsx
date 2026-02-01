import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import Card from './components/card'
import Tagline from './components/tagline'
import Hero from './components/hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Tagline />
      <Hero />
      <section id='featured' className='py-6 w-full bottom-0 mb-40 absolute'>
        <div id='products' className='ml-16'>
          <Card />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default App