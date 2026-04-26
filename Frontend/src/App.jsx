import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import FAQs from './pages/FAQs'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";


function App() {
  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        {/* ScrollToTop makes the page to scroll up whenever we select a different page */}
        <ScrollToTop />

        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />

          <Route
            path="/features"
            element={
              <PublicRoute>
                <Features />
              </PublicRoute>}
          />

          <Route
            path="/pricing"
            element={
              <PublicRoute>
                <Pricing />
              </PublicRoute>} />

          <Route 
          path="/faqs" 
          element={
          <PublicRoute>
            <FAQs />
          </PublicRoute>} 
          />

          <Route 
          path="/about" 
          element={
          <PublicRoute>
            <AboutUs />
          </PublicRoute>} 
          />

          <Route 
          path="/contact" 
          element={
          <PublicRoute>
            <Contact />
          </PublicRoute>} 
          />

          <Route 
          path="/auth" 
          element={
          <PublicRoute>
            <Auth />
          </PublicRoute>} 
          />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App