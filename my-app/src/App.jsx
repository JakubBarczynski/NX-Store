import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import Card from './components/card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Card />
      <Footer />
    </>
  )
}

export default App