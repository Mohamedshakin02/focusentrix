import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import FAQs from './pages/FAQs'



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faqs" element={<FAQs />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App