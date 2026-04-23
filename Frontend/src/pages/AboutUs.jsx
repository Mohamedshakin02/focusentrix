import { Link } from 'react-router-dom'
import logo from '../assets/focusentrixclear.png'
import { Target, Eye, Users, BarChart2, User } from 'lucide-react'
import Footer from '../components/Footer'




// teamMemberCard
// shows a team member with picture, name, and role
// ─────────────────────────────────────────────
function TeamMemberCard({ name, role }) {
  return (
    <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-[#3d2060] transition-colors duration-200">
      {/* empty for now. add imgs once you get them*/}
      <div className="w-14 h-14 rounded-full bg-[#1e1040] border border-[#3d2060] flex items-center justify-center">
        <User className="text-[#9b59f5] w-6 h-6" />
        </div>
      <div className="text-center">
        <p className="text-white font-semibold text-sm">{name}</p>
        <p className="text-[#8a7aaa] text-xs mt-0.5">{role}</p>
      </div>
    </div>
  )
}

// mission card, vision, who we serve
// left column card with icon, purple title, and description
function MissionCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl p-6 flex items-start gap-4 hover:border-[#3d2060] transition-colors duration-200 flex-1">
      <div className="bg-[#1e1040] rounded-xl p-3 flex-shrink-0">
        <Icon className="text-[#9b59f5] w-6 h-6" />
      </div>
      <div>
        <h3 className="text-[#9b59f5] font-bold text-base mb-2">{title}</h3>
        <p className="text-[#8a7aaa] text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

// our team
export default function AboutUs() {
  const team = [
    { name: 'Mohamed Elmustafa', role: 'Founder and Developer' },
    { name: 'Mohamed Shakin', role: 'Developer' },
    { name: 'Maryam Manzoor', role: 'Marketing' },
    { name: 'Najam Tahir', role: 'Designer' },
    { name: 'Anshara', role: 'Marketing' },
    { name: 'Mohid Wasseem', role: 'Designer' },
  ]

  //market insights
  const insights = [
    'Avg person distracted every 8–12 min',
    'Remote work increases digital distractions',
    'Lack of focus tools leads to burnout',
    'Productivity software market expanding fast',
  ]

  const served = [
    'Students & Teenagers',
    'Remote Workers',
    'Young Professionals',
    'Digital Natives lives',
  ]

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white">

      {/* hero header
          two columns left has label, heading and paragraph
          right has the logo with glow
      */}
      <section className="w-full px-30 pt-20 pb-16">
        <div className="grid grid-cols-2 gap-12 items-center">

          {/* left heading*/}
          <div className="flex flex-col gap-5">
            <div className="inline-block px-1 py-1 w-fit">
                <span className="text-[#9b59f5] text-m font-semibold tracking-widest uppercase">About Us</span>
            </div>
            <h1 className="text-6xl font-black leading-tight">
              Who We <span className="text-[#9b59f5]">Are</span>
            </h1>
            <p className="text-[#9b59f5] font-bold text-lg">Built by Students, Built for Everyone</p>
            <p className="text-[#8a7aaa] text-base leading-relaxed max-w-md">
              Focusentrix Creative Studios is an innovative technology
              startup dedicated to improving productivity in the digital age.
              We believe focus is the new competitive advantage.
            </p>
          </div>

          {/*right logo with glow*/}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-100 h-100 rounded-full bg-[#4a1a90] opacity-20 blur-3xl" />
            <div className="absolute w-100 h-100 rounded-full border border-dashed border-[#3d2060] opacity-100" />
            <div className="relative w-100 h-100 flex items-center justify-center">
              <img
                src={logo}
                alt="Focusentrix logo"
                className="w-100 h-100 object-contain"
              />
            </div>
          </div>

        </div>
      </section>

      {/*main section of the page
          two column layout
          left has our mission, vision, and who We Serve cards
          right has team grid and Market Insights
      */}
      <section className="w-full px-30 pb-24">
        <div className="grid grid-cols-2 gap-6 items-stretch">

          {/*left column flex col with flex-1 cards so they stretch to fill height */}
          <div className="flex flex-col gap-4 h-full">

            <MissionCard icon={Target} title="Our Mission">
              To help every student, developer, and creator do their deepest work by building a platform
              that fights distraction intelligently and gives you the data to understand your own focus patterns.
            </MissionCard>

            <MissionCard icon={Eye} title="Our Vision">
              To help every student, developer, and creator do their deepest work by building a platform
              that fights distraction intelligently and gives you the data to understand your own focus patterns.
            </MissionCard>

            {/* who we serve card*/}
            <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl p-6 flex items-start gap-4 hover:border-[#3d2060] transition-colors duration-200 flex-1">
              <div className="bg-[#1e1040] rounded-xl p-3 flex-shrink-0">
                <Users className="text-[#9b59f5] w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[#9b59f5] font-bold text-base mb-3">Who We Serve</h3>
                <ul className="flex flex-col gap-2">
                  {served.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#8a7aaa] text-sm">
                      <div className="w-4 h-4 rounded-full border border-[#9b59f5] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#9b59f5] text-[8px]">✓</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* right column has team and market insights*/}
          <div className="flex flex-col gap-4">

            {/* our team card */}
            <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#9b59f5]" />
                <h3 className="text-white font-bold text-base">Our Team — WD Team 19</h3>
              </div>
              {/* 3 column team grid */}
              <div className="grid grid-cols-3 gap-3">
                {team.map((member, i) => (
                  <TeamMemberCard key={i} {...member} />
                ))}
              </div>
            </div>

            {/* market insights card */}
            <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="text-[#9b59f5] w-5 h-5" />
                <h3 className="text-[#9b59f5] font-bold text-base">Market Insights</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {insights.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[#8a7aaa] text-sm">
                    <span className="text-[#9b59f5] mt-0.5 ml-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />

    </div>
  )
}