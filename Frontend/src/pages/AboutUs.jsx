import { Link } from 'react-router-dom'
import logo from '../assets/focusentrixclear.png'
import { Target, Eye, Users, BarChart2, User } from 'lucide-react'
import Footer from '../components/Footer'

// teamMemberCard
// shows a team member with picture, name, and role
function TeamMemberCard({ name, role }) {
  return (
    <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-[#3d2060] transition-colors duration-200">
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
    <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl p-6 flex items-start gap-4 hover:border-[#3d2060] transition-colors duration-200 h-full">
      <div className="bg-[#1e1040] rounded-xl p-3 flex-shrink-0">
        <Icon className="text-[#9b59f5] w-6 h-6" />
      </div>
      <div>
        <h3 className="text-[#9b59f5] font-bold text-md mb-2">{title}</h3>
        <p className="text-[#8a7aaa] text-md leading-relaxed">{children}</p>
      </div>
    </div>
  )
}


export default function AboutUs() {

  // our team
  const team = [
    { name: 'Mohamed Elmustafa', role: 'Founder and Developer' },
    { name: 'Mohamed Shakin', role: 'Developer and Designer' },
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

  //who we serve
  const served = [
    'Students & Teenagers',
    'Remote Workers',
    'Young Professionals',
    'Digital Natives lives',
  ]

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white container mx-auto px-4 sm:px-6 lg:px-30">

      {/* hero header
          two columns left has label, heading and paragraph
          right has the logo with glow
      */}

      <section className="w-full pt-12 pb-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* left heading*/}
          <div>
            <span className="text-[#9b59f5] text-md font-semibold tracking-widest uppercase">About Us</span>

            <h1 className="text-4xl sm:text-6xl font-black mt-2">
              Who <span className="text-[#9b59f5]">We Are</span>
            </h1>

            <p className="text-[#9b59f5] font-bold text-lg mt-2">
              Built by Students, Built for Everyone
            </p>

            <p className="text-[#8a7aaa] text-lg font-medium leading-relaxed max-w-md mt-5">
              Focusentrix Creative Studios is an innovative technology
              startup dedicated to improving productivity in the digital age.
              We believe focus is the new competitive advantage.
            </p>
          </div>

          {/* right section logo with glow */}
          <div className="relative hidden lg:flex items-center justify-center lg:pt-10 xl:pr-15">
            {/* glow behind logo */}
            <div className="absolute w-[220px] h-[220px] lg:w-[30vw] lg:h-[30vw] xl:w-[60vw] xl:h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-[#4a1a90] opacity-30 blur-3xl" />

            {/* dashed orbit ring around logo */}
            <div className="absolute w-100 h-100 rounded-full border border-dashed border-[#3d2060] opacity-100" />

            {/* logo on the right*/}
            <div className="relative w-100 h-100 flex items-center justify-center">
              <img
                src={logo}
                alt="Focusentrix logo"
                className="w-32 h-32 sm:w-40 sm:h-40 xl:w-80 xl:h-80 object-contain"
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
      <section className="w-full lg:mt-5 pb-0 px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Mission Card */}
          <div className="order-1">
            <MissionCard icon={Target} title="Our Mission">
              To help every student, developer, and creator do their deepest work by building a platform
              that fights distraction intelligently and gives you the data to understand your own focus patterns.
            </MissionCard>
          </div>

          {/* Team (spans 2 rows on desktop) Card*/}
          <div className="order-4 lg:order-2 bg-[#0e0b1e] border border-[#1e1535] rounded-2xl p-6 lg:row-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#9b59f5]" />
              <h3 className="text-white font-bold text-base">Our Team — WD Team 19</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {team.map((member, i) => (
                <TeamMemberCard key={i} {...member} />
              ))}
            </div>
          </div>

          {/* Vision Card*/}
          <div className="order-2 lg:order-3">
            <MissionCard icon={Eye} title="Our Vision">
              To help every student, developer, and creator do their deepest work by building a platform
              that fights distraction intelligently and gives you the data to understand your own focus patterns.
            </MissionCard>
          </div>

          {/* Who We Serve Card*/}
          <div className="order-3 lg:order-4 bg-[#0e0b1e] border border-[#1e1535] rounded-2xl p-6 flex items-start gap-4">
            <div className="bg-[#1e1040] rounded-xl p-3 flex-shrink-0">
              <Users className="text-[#9b59f5] w-6 h-6" />
            </div>

            <div>
              <h3 className="text-[#9b59f5] font-bold text-base mb-3">Who We Serve</h3>
              <ul className="flex flex-col gap-2">
                {served.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#8a7aaa] text-md">
                    <div className="w-4 h-4 rounded-full border border-[#9b59f5] flex items-center justify-center">
                      <span className="text-[#9b59f5] text-[8px]">✓</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Market Insights Card*/}
          <div className="order-5 bg-[#0e0b1e] border border-[#1e1535] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#1e1040] rounded-xl p-3 flex-shrink-0">
                <BarChart2 className="text-[#9b59f5] w-5 h-5" />
              </div>
              <h3 className="text-[#9b59f5] font-bold text-md">Market Insights</h3>
            </div>

            <ul className="flex flex-col gap-3">
              {insights.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-[#8a7aaa] text-md">
                  <span className="text-[#9b59f5] mt-0.5 ml-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <div className="py-18 pb-0 px-4">
        <Footer />
      </div>

    </div>
  )
}