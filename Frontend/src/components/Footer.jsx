import { Link } from 'react-router-dom'
import { Rocket, Bell, ChevronRight } from 'lucide-react'
import logo from '../assets/focusentrixclear2.png'

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1030] bg-[#0a0a0f] py-10 pb-7">
      {/*3 column section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-0 lg:divide-x lg:divide-[#1a1030] mb-8">

        {/* Left area*/}
        <div className="flex items-start gap-4 pr-0 lg:pr-10 order-2 lg:order-1 mb-2 lg:mb-0 ">
          <div className="bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0]
                          shadow-[0_4px_12px_rgba(123,44,191,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-full p-3 flex-shrink-0 mt-1">
            <Rocket className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-white font-bold text-lg leading-snug">Planning to improve<br />your focus?</p>
              <p className="text-[#8a7aaa] text-md mt-2">Start building your focus journey with Focusentrix.</p>
            </div>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0]
                        shadow-[0_4px_12px_rgba(123,44,191,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)]
                        hover:shadow-[0_6px_18px_rgba(123,44,191,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]
                        transition-all duration-300 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 text-sm w-fit mt-3"
            >
              Get Started <ChevronRight className="w-4 h-4 mb-0.5" />
            </Link>
          </div>
        </div>

        {/* Logo. Center area*/}
        <div className="flex flex-col lg:items-center gap-2 px-0 lg:px-10 mb-6 lg:mb-0 order-1 lg:order-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Focusentrix logo" className="w-auto h-16 lg:h-20 object-contain" />
          </div>
          <p className="text-[#8c57cb] text-xl lg:text-sm font-medium lg:text-center leading-snug mt-1">
            Stay locked in. Work<br />smarter. Achieve more.
          </p>
        </div>

        {/* social media icons and links. Right area*/}
        <div className="flex items-start gap-4 pl-0 lg:pl-10 order-3 lg:order-3">
          <div className="bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0]
                          shadow-[0_4px_12px_rgba(123,44,191,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-full p-3 flex-shrink-0 mt-1">
            <Bell className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-white font-bold text-lg leading-snug">Don't miss out on<br />updates</p>
              <p className="text-[#8a7aaa] text-md mt-2">Follow Focusentrix on social media.</p>
            </div>
            <div className="flex items-center gap-2">

              {/*add linkedin link here*/}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1e1535] hover:bg-[#9b59f5] border border-[#3d2060] hover:border-[#9b59f5] rounded-lg p-2 transition-colors duration-200"
              >
                <svg className="text-white w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* add youTube link here*/}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1e1535] hover:bg-[#9b59f5] border border-[#3d2060] hover:border-[#9b59f5] rounded-lg p-2 transition-colors duration-200"
              >
                <svg className="text-white w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 7s-.3-2-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.6 3 12 3 12 3s-4.6 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.6 21.7 12 21.7 12 21.7s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.7 1.2-2.7 1.2-2.7s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5v-7l8.1 3.5-8.1 3.5z" />
                </svg>
              </a>

              {/*add instagram link here*/}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1e1535] hover:bg-[#9b59f5] border border-[#3d2060] hover:border-[#9b59f5] rounded-lg p-2 transition-colors duration-200"
              >
                <svg className="text-white w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

            </div>
          </div>
        </div>

      </div>

      {/* copyright bottom*/}
      <div className="border-t border-[#1a1030] pt-6 text-center">
        <p className="text-[#5a4a7a] text-md font-medium lg:font-normal lg:text-sm">
          © 2026 FOCUSENTRIX. All rights reserved.
        </p>
      </div>
    </footer>
  )
}