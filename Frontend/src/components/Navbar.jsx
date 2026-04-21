import logo from '../assets/focusentrixclear.png'
import { Link, useLocation } from 'react-router-dom'


export default function Navbar() {
    //getting the current url path which is used to highlight an active link
  const location = useLocation()

  //navvigation links data and their route
  const links = [
    { label: 'Home',     to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Features', to: '/features' },
    { label: "FAQ's",    to: '/faqs' },
    { label: 'Pricing',  to: '/pricing' },
    { label: 'Contact',  to: '/contact' },
  ]

  return (
    //navbar container 
    <nav className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#1a1030]">
        {/* inner container*/}
      <div className="w-full px-30 h-16 flex items-center justify-between">

        {/* logo and brand name. routes to home page*/}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src={logo} alt="Focussentrix logo" className="w-10 h-10 object-contain"/>
          <span className="text-white font-black text-lg tracking-widest">FOCUSENTRIX</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, to }) => {
            const isActive = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium transition-colors duration-200 no-underline pb-1
                  ${isActive
                    ? 'text-white border-b-2 border-[#9b59f5]'
                    : 'text-[#8a7aaa] hover:text-white border-b-2 border-transparent'
                  }`}
              >
                {label}
              </Link>
            )
          })}
        </div>


          {/* get started link*/}
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-[#9b59f5] hover:bg-[#7c3de0] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 text-sm no-underline"
        >
          Get Started <span>›</span>
        </Link>

      </div>
    </nav>
  )
}