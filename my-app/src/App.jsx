import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import Card from './components/card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <section>
        <div>
          <h1></h1>
          <p></p>
          <a></a>
        </div>
      </section>
      <section id='featured' className='py-[30px] px-[100px]'>
        <div id='products'>
          <Card />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default App