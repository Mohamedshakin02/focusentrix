import logo from '../assets/focusentrixclear.png'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'


export default function Navbar() {
  //getting the current url path which is used to highlight an active link
  const location = useLocation()

  //navvigation links data and their route
  const links = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Features', to: '/features' },
    { label: "FAQ's", to: '/faqs' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    //navbar container 
    <nav className="sticky top-0 py-2 z-50 bg-[#000] backdrop-blur-md border-b border-[#1a1030]">
      {/* inner container*/}
      <div className="w-full px-30 h-16 flex items-center justify-between">

        {/* logo and brand name. routes to home page*/}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src={logo} alt="Focussentrix logo" className="w-10 h-10 object-contain" />
          <span className="text-white font-black text-lg tracking-widest">FOCUSENTRIX</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, to }) => {
            const isActive = location.pathname === to
            return (
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


        {/* get started link*/}
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-lg text-md no-underline
                    bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0]
                    shadow-[0_4px_12px_rgba(123,44,191,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)]
                    hover:shadow-[0_6px_18px_rgba(123,44,191,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]
                    transition-all duration-300"
        >
          Get Started <ChevronRight className="w-4 h-4 mt-0.5 font-bold" />
        </Link>

      </div>
    </nav>
  )
}