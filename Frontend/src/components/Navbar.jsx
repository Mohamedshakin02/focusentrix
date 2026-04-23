import logo from '../assets/focusentrixclear2.png'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {

  //getting the current url path which is used to highlight an active link
  const location = useLocation()

  //navigation links data and their route
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Features', to: '/features' },
    { label: "FAQ's", to: '/faqs' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <>
      {/* navbar container  */}
      <nav className="relative sticky top-0 py-2 z-50 bg-[#0a0a0f] backdrop-blur-md">

        {/* glowing border bottom effect */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px]">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#9b59f5] to-transparent opacity-80 blur-[1px]" />
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-30 h-16 flex items-center justify-between">

          {/* logo and brand name. routes to home page*/}
          <Link
            to="/"
            className="
                        absolute left-1/2 -translate-x-1/2
                        lg:static lg:translate-x-0
                        flex items-center gap-3 no-underline
                        "
          >
            <img src={logo} alt="Focusentrix logo" className="w-auto h-10 object-contain" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(({ label, to }) => {
              const isActive = location.pathname === to

              return (

                //menu links
                <Link
                  key={to}
                  to={to}
                  className={`relative text-md font-medium no-underline pb-2 transition-colors duration-200
                  ${isActive ? 'text-white' : 'text-[#8a7aaa] hover:text-white'}
                  
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:h-[2px] after:w-full after:rounded-full
                  after:transition-all after:duration-300
                  
                  ${isActive
                      ? 'after:bg-gradient-to-r after:from-transparent after:via-[#9b59f5] after:to-transparent after:opacity-100 after:blur-[1px]'
                      : 'after:bg-gradient-to-r after:from-transparent after:via-[#9b59f5]/70 after:to-transparent after:opacity-0 hover:after:opacity-100 hover:after:blur-[1px]'
                    }
                  `}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Desktop Button */}
            <Link
              to="/auth"
              className="hidden lg:inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-lg text-md no-underline
                bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0]
                shadow-[0_4px_12px_rgba(123,44,191,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)]
                hover:shadow-[0_6px_18px_rgba(123,44,191,0.5)]
                transition-all duration-300"
            >
              Get Started <ChevronRight className="w-4 h-4 mt-0.5" />
            </Link>

            {/* get started link */}
            <button
              className="lg:hidden text-white absolute right-4 sm:right-6"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={28} />
            </button>

          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div className={`
        fixed top-0 right-0 h-full w-[260px]
        bg-[#0a0a0f] border-l border-[#1a1030]
        z-[100] p-6 flex flex-col gap-6
        transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}
      `}>

        {/* Close Button */}
        <button
          className="self-end text-white"
          onClick={() => setMenuOpen(false)}
        >
          <X size={26} />
        </button>

        {/* Menu Links */}
        <div className="flex flex-col gap-5 mt-6">
          {links.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="text-lg text-[#8a7aaa] font-semibold hover:text-white transition"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* get started link */}
        <Link
          to="/auth"
          onClick={() => setMenuOpen(false)}
          className="mt-auto text-center text-white font-semibold py-3 rounded-lg
            bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0]"
        >
          Get Started
        </Link>

      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[90]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}