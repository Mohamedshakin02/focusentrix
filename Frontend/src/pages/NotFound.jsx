import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    // page for when the user tries to access a route that doesn't exist. It shows a 404 error message and a button to go back to the home page.
    
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white overflow-hidden px-4">

      {/*glowing effect */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#9b59f5] opacity-20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#4a1a90] opacity-20 blur-[140px]" />

      <div className="relative text-center max-w-lg">

        <h1 className="text-7xl sm:text-8xl font-black text-[#9b59f5]">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold mt-4">
          You lost focus for a moment
        </h2>

        <p className="text-[#8a7aaa] text-md sm:text-lg mt-4 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to focus mode.
        </p>

        {/* button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0]
          shadow-[0_4px_12px_rgba(123,44,191,0.4)]
          hover:shadow-[0_6px_18px_rgba(123,44,191,0.5)]
          text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>

      </div>
    </div>
  )
}