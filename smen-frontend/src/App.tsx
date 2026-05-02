import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Therapists from './pages/Therapists'
import Treatment from './pages/Treatment'
import Diagnostic from './pages/Diagnostic'
import Therapy from './pages/Therapy'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/therapists" element={<Therapists />} />
          <Route path="/treatments/:slug" element={<Treatment />} />
          <Route path="/diagnostics/:slug" element={<Diagnostic />} />
          <Route path="/therapies/:slug" element={<Therapy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
