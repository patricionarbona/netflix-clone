import './App.css'
import { Banner, Carousel, Nav } from "./components"

function App() {
  return (
    <>
    <Nav></Nav>
    {/* <Banner/> */}
    <Carousel genre_id={35} />
    </>
  )
}

export default App
