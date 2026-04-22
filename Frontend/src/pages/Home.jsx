import { Link } from 'react-router-dom'
import logo from '../assets/focusentrixclear.png'
import { Webcam, Bell, Target, Music, CheckSquare, BarChart2, UserPlus, Rocket, ClipboardList } from 'lucide-react'
import { useState } from 'react' //used for the monthly/yearly function in the price section
import Footer from '../components/Footer'


// small cards that are displayed around the focusentrix logo in the hero section
function HeroFeatureCard({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 bg-[#1a1025] border border-[#3d2060] rounded-xl px-4 py-3 w-52 h-20">
      <Icon className="text-[#9b59f5] w-6 h-6 flex-shrink-0" />
      <span className="text-white text-sm font-medium leading-tight">{title}</span>
    </div>
  )
}

// single row of what we offer in the "what we offer" section
// shows an icon, title, and a short descprtion. Has a hover effect
function OfferItem({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-4 bg-[#13102a] border border-[#2a1a40] rounded-xl px-6 py-5 hover:border-[#9b59f5] transition-colors duration-200 cursor-pointer group">
      
      {/* icon container */}
      <div className="bg-[#1e1535] rounded-lg p-3 flex-shrink-0">
        <Icon className="text-[#9b59f5] w-5 h-5" />
      </div>

      {/* text content*/}
      <div className="flex-1">
        <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
        <p className="text-[#8a7aaa] text-sm leading-relaxed">{description}</p>
      </div>

      {/* hover effect*/}
      <span className="text-[#5a4a7a] group-hover:text-[#9b59f5] text-xl mt-1 transition-colors duration-200">+</span>
    </div>
  )
}

//this is for the "Getting started" section. 
//its a single step that makes adjusments to all as needed
function StepCard({ number, icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
        {/* step number*/}
      <div className="w-12 h-12 rounded-full border-2 border-[#9b59f5] flex items-center justify-center text-[#9b59f5] font-bold text-sm">
        {number}
      </div>

      {/* step icon*/}
      <Icon className="text-[#9b59f5] w-8 h-8" />
      <h3 className="text-white font-bold text-base">{title}</h3>
      <p className="text-[#8a7aaa] text-sm leading-relaxed">{description}</p>
    </div>
  )
}

//pricing tier card which accepts both monthly and yearly prices.
//user is able to switch between them based on the isYearly prop
function PricingCard({ plan, monthlyPrice, yearlyPrice, period, features, cta, highlighted, isYearly }) {

    //shows the yearly or monthly prices depening on the toggle state
  const price = isYearly ? yearlyPrice : monthlyPrice

  return (
    //most popular badge highlighting the popular pick
    <div className={`relative rounded-2xl p-6 flex flex-col gap-4
      ${highlighted
        ? 'bg-[#1a1035] ring-2 ring-[#9b59f5]'
        : 'bg-[#13102a] border border-[#2a1a40]'
      }`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#9b59f5] text-white text-xs font-semibold px-4 py-1 rounded-full">
          Most popular
        </div>
      )}

      {/* plan name and price*/}
      <div>
        <p className="text-[#8a7aaa] text-sm mb-1">{plan}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-white text-4xl font-bold">{price}</span>
          <span className="text-[#8a7aaa] text-sm">{period}</span>
        </div>
        {/* shows savings label when yearly */}
        {isYearly && plan !== 'Free' && (
          <p className="text-green-400 text-xs mt-1">Billed annually, Save 20%</p>
        )}
      </div>

      {/* features list*/}
      <ul className="space-y-2 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-[#c0b0e0] text-sm">
            <span className="text-[#9b59f5]">✓</span>
            {f}
          </li>
        ))}
      </ul>


      <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200
        ${highlighted
          ? 'bg-[#9b59f5] text-white hover:bg-[#7c3de0]'
          : 'bg-transparent border border-[#3d2060] text-white hover:border-[#9b59f5]'
        }`}>
        {cta}
      </button>
    </div>
  )
}


// home, main page components
// sections here are HERO, What we offer, Getting started, Pricing, and footer
export default function Home() {

    // controls the pricing whether it shows monthly or yearly rate
    const [isYearly, setIsYearly] = useState(false)


    // features we offer. Can add more data and it will adjust as needed
  const offers = [
    { icon: Webcam,      title: 'Real-time camera monitoring', description: 'Detects focus loss during sessions using live camera analysis.' },
    { icon: Bell,        title: 'Instant distraction alerts',  description: 'Audio and visual alerts snap you back to focus before you lose momentum.' },
    { icon: BarChart2,   title: 'Focus analytics',             description: 'Track your focus score, session history, and distraction patterns over time.' },
    { icon: Target,      title: 'Session goal setting',        description: 'Set focus goals for each session and track your streaks and achievements.' },
    { icon: CheckSquare, title: 'Habit tracking',              description: 'Build better daily focus habits with weekly reports and progress insights.' },
    ]

    //getting started step by step guide. Can add more steps as needed
  const steps = [
    { number: '01', icon: UserPlus, title: 'Create Account', description: 'Sign up free in under 60 seconds. No credit card needed for the free plan.' },
    { number: '02', icon: ClipboardList, title: 'Set Your Task', description: "Enter what you're working on and set a target focus duration for your session." },
    { number: '03', icon: Webcam, title: 'Enable Camera', description: "Allow camera access. Focusentrix monitors your attention — data stays private on your device." },
    { number: '04', icon: Rocket, title: 'Start & Stay Focused', description: 'Get real-time alerts when you lose focus. Build your streak and earn achievements.' },
  ]

  //plans pricing and  features unlocked
  const plans = [
    {
        plan: 'Free', 
        monthlyPrice: '$0', 
        yearlyPrice: '$0',
        period: 'forever',
        features: ['Basic focus metrics', 'Session timer', 'Session history', 'Distraction alerts', 'Focus analytics'],
        cta: 'Get started', 
        highlighted: false,
    },
    {
        plan: 'Pro', 
        monthlyPrice: '$12', 
        yearlyPrice: '$10',
        period: 'per month',
        features: ['Everything in Free', 'Unlimited sessions', 'Camera monitoring', 'Detailed analytics', 'Focus goals', 'Priority support', 'Streak features'],
        cta: 'Upgrade to Pro', 
        highlighted: true, //this plan gets the most popular badge with the purple ring
    },
    {
        plan: 'Team', 
        monthlyPrice: '$29', 
        yearlyPrice: '$23',
        period: 'per month',
        features: ['Everything in Pro', 'Up to 10 members', 'Team dashboard', 'Admin controls', 'Priority support', 'Custom reports'],
        cta: 'Contact sales', 
        highlighted: false,
    },
    ]


  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white">

      {/* HERO section, 2 column layout
        Left area has Headline, Right area has the logo surrounded by the 4 feature cards.*/}
      <section className="w-full px-30 pt-20 pb-24">
        <div className="grid grid-cols-2 gap-12 items-center">

            {/* left column*/}
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl font-black leading-tight">
              Stay locked in.<br />
              Work smarter.<br />
              <span className="text-[#9b59f5]">Achieve more.</span>
            </h1>
            <p className="text-[#8a7aaa] text-lg leading-relaxed max-w-md">
              Focusentrix uses real time camera monitoring to detect distractions
              and keep you in the zone so every session counts.
            </p>
            <div>
              <button className="inline-flex items-center gap-2 bg-[#9b59f5] hover:bg-[#7c3de0] text-white font-semibold px-7 py-4 rounded-xl transition-colors duration-200 text-base">
                Get Started <span>›</span>
              </button>
            </div>
          </div>

            {/* right column*/}
          <div className="relative flex items-center justify-center">
            {/*glow behind logo*/}
            <div className="absolute w-72 h-72 rounded-full bg-[#4a1a90] opacity-20 blur-3xl" />
            <div className="relative flex flex-col gap-1">
                {/*the top row of cards*/}
              <div className="flex gap-50 justify-center">
                <HeroFeatureCard icon={Webcam} title="Real-Time Monitoring" />
                <HeroFeatureCard icon={Bell} title="Instant Smart Alerts" />
              </div>

              {/* center logo*/}
              <div className="flex justify-center py-4">
                <img 
                    src={logo}
                    alt="Focusentrix logo"
                    className="w-100 h-100 object-contain"
                />
              </div>

              {/*the bottom row of cards */}
              <div className="flex gap-50 justify-center">
                <HeroFeatureCard icon={Target} title="Session Goal Setting" />
                <HeroFeatureCard icon={Music} title="Backgroundd Music" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHAT WE OFFER, two column layout
        Left has heading, right has the list of items */}
      <section className="border-t border-[#1a1030] py-24">
        <div className="w-full px-30">
          <div className="grid grid-cols-2 gap-16 items-start">

            {/*Left column, heading and descriptions */}
            <div className="flex flex-col gap-5">
              <p className="text-[#9b59f5] text-sm font-semibold tracking-widest uppercase">What we offer</p>
              <h2 className="text-4xl font-black leading-snug">Everything You Need<br />to Stay in the Zone</h2>
              <div className="w-12 h-1 bg-[#9b59f5] rounded-full" />
              <p className="text-[#8a7aaa] text-base leading-relaxed">
                Five core capabilities designed to detect, analyze, and improve your focus all in real time.
              </p>
            </div>

            {/* right, list of offer items. These are rendered from the offers array*/}
            <div className="flex flex-col gap-3">
              {offers.map((o, i) => <OfferItem key={i} {...o} />)}
            </div>
          </div>
        </div>
      </section>

      {/* GETTING STARTED, four column grid of steps card that guides the user */}
      <section className="py-24 border-t border-[#1a1030]">
        <div className="w-full px-30">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-3">Getting Started</h2>
            <p className="text-[#9b59f5] text-lg font-medium">Up and Running in 4 Simple Steps</p>
          </div>

          {/* steps cards rendered from the steps array*/}
          <div className="grid grid-cols-4 gap-8">
            {steps.map((s, i) => <StepCard key={i} {...s} />)}
          </div>
        </div>
      </section>

      {/* PRICING  
        Three tiers of pricing that can be toggled monthly/yearly
        Toggle state is managed by the isYearly useState hook*/}
        <section className="py-24 border-t border-[#1a1030]">
        <div className="w-full px-10">
            <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-2">Pricing</h2>
            <p className="text-[#9b59f5] text-lg font-medium mb-6">Simple, transparent plans</p>

            {/* toggle */}
            <div className="inline-flex items-center gap-3 bg-[#13102a] border border-[#2a1a40] rounded-full px-5 py-2">
                <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-white' : 'text-[#8a7aaa]'}`}>
                Monthly
                </span>

                {/* Clicking flips isYearly*/}
                <div 
                onClick={() => setIsYearly(!isYearly)}
                className="w-11 h-6 bg-[#9b59f5] rounded-full relative cursor-pointer transition-all duration-300"
                >

                {/* sliding dot that moves between monthly and yearly*/}
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300
                    ${isYearly ? 'right-1' : 'left-1'}`} 
                />
                </div>

                <span className={`text-sm transition-colors ${isYearly ? 'text-white' : 'text-[#8a7aaa]'}`}>
                Yearly
                </span>
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Save 20%</span>
            </div>
            </div>

            {/* pricing cards rendered from the planes array*/}
            <div className="grid grid-cols-3 gap-6">
            {plans.map((p, i) => (
                <PricingCard key={i} {...p} isYearly={isYearly} />
            ))}
            </div>
        </div>
        </section>

        {/* footer import from components*/}
        <Footer />
    </div>
  )
}