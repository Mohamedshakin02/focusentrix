import logo from '../assets/focusentrixclear.png'
import { Webcam, Bell, BarChart2, Target, CheckSquare } from 'lucide-react'
import Footer from '../components/Footer'


// FeatureRow
// each feature is its own card
// left: icon + title + description
// right: a unique visual widget per card
function FeatureRow({ icon: Icon, title, description, widget }) {
  return (
    <div className="flex items-center justify-between bg-[#0e0b1e] border border-[#1e1535] rounded-2xl px-10 py-8 gap-12">
      {/* left: icon, title, description */}
      <div className="flex items-start gap-6 flex-1">
        <div className="bg-[#1e1040] rounded-2xl p-4 flex-shrink-0">
          <Icon className="text-[#9b59f5] w-7 h-7" />
        </div>
        <div>
          <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
          <p className="text-[#8a7aaa] text-sm leading-relaxed max-w-xs">{description}</p>
        </div>
      </div>

      {/* right: unique visual widget */}
      <div className="flex-shrink-0">
        {widget}
      </div>
    </div>
  )
}

// real time camera monitoring widget
function CameraWidget() {
  return (
    <div className="relative w-56 h-32 flex items-center justify-center">
      {/* Camera scan frame corners */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-28 relative">
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#9b59f5]" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#9b59f5]" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#9b59f5]" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#9b59f5]" />
          {/* Camera icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Webcam className="text-[#9b59f5] w-10 h-10 opacity-80" />
          </div>
        </div>
      </div>
      {/* Live badge */}
      <div className="absolute bottom-0 right-0 flex items-center gap-1.5 bg-[#13102a] border border-[#2a1a40] rounded-full px-3 py-1.5">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-white text-xs font-medium">Live Monitoring</span>
      </div>
    </div>
  )
}


// instant distraction alerts
function BellWidget() {
  return (
    <div className="relative w-56 h-32 flex items-center justify-center">
      {/*ringing bell with ripple effect */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-16 h-16 rounded-full border border-[#9b59f5] opacity-20 animate-ping" />
        <div className="absolute w-24 h-24 rounded-full border border-[#9b59f5] opacity-10 animate-ping" style={{ animationDelay: '0.3s' }} />
        <Bell className="text-[#9b59f5] w-12 h-12 relative z-10" />
      </div>
      {/* stay focused tag/badge */}
      <div className="absolute bottom-0 right-0 flex items-center gap-1.5 bg-[#13102a] border border-[#2a1a40] rounded-full px-3 py-1.5">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-white text-xs font-medium">Stay Focused</span>
      </div>
    </div>
  )
}



// focus analytics weidget
function AnalyticsWidget() {
  // Simple SVG sparkline
  // generated using claude code
  return (
    <div className="w-56 h-32 bg-[#13102a] border border-[#2a1a40] rounded-2xl p-4 flex flex-col justify-between">
      <div>
        <p className="text-[#8a7aaa] text-xs mb-1">Focus Score</p>
        <p className="text-white text-2xl font-bold">87%</p>
      </div>
      {/* sparkline */}
      <svg viewBox="0 0 160 40" className="w-full h-10">
        <polyline
          points="0,35 20,28 40,30 60,18 80,22 100,10 120,14 140,8 160,12"
          fill="none"
          stroke="#9b59f5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="0,35 20,28 40,30 60,18 80,22 100,10 120,14 140,8 160,12 160,40 0,40"
          fill="url(#grad)"
          opacity="0.15"
        />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9b59f5" />
            <stop offset="100%" stopColor="#9b59f5" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}




// goal widget
function GoalWidget() {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const progress = 0.75 // 75% of 90 min done

  return (
    <div className="w-56 h-32 bg-[#13102a] border border-[#2a1a40] rounded-2xl p-4 flex items-center gap-4">
      <div>
        <p className="text-[#8a7aaa] text-xs mb-1">Daily Goal</p>
        <p className="text-white text-xl font-bold">90 mins</p>
        {/* small check row */}
        <div className="flex items-center gap-1 mt-2">
          <div className="w-4 h-4 rounded-full bg-[#9b59f5] flex items-center justify-center">
            <span className="text-white text-[8px]">✓</span>
          </div>
          <div className="flex-1 h-1 bg-[#2a1a40] rounded-full">
            <div className="w-3/4 h-full bg-[#9b59f5] rounded-full" />
          </div>
        </div>
      </div>
      {/*circle chart */}
      <svg width="64" height="64" viewBox="0 0 64 64" className="flex-shrink-0">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="#1e1535" strokeWidth="6" />
        <circle
          cx="32" cy="32" r={radius}
          fill="none"
          stroke="#9b59f5"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
        />
      </svg>
    </div>
  )
}

// habit tracking widget
function HabitWidget() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const done  = [true, true, true, true, true, false, false]

  return (
    <div className="w-56 h-32 bg-[#13102a] border border-[#2a1a40] rounded-2xl p-4 flex flex-col justify-between">
      <div>
        <p className="text-[#8a7aaa] text-xs mb-1">Current Streak</p>
        <p className="text-white text-2xl font-bold">12 Days</p>
      </div>
      <div className="flex items-center gap-2">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center
              ${done[i] ? 'bg-[#9b59f5]' : 'bg-[#1e1535] border border-[#2a1a40]'}`}>
              {done[i] && <span className="text-white text-[8px]">✓</span>}
            </div>
            <span className="text-[#5a4a7a] text-[9px]">{d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


// features, main page component
// you can adjust the features here and add more as needed
export default function Features() {
  const features = [
    {
      icon: Webcam,
      title: 'Real time camera monitoring',
      description: 'Detects focus loss during sessions using live camera analysis.',
      widget: <CameraWidget />,
    },
    {
      icon: Bell,
      title: 'Instant distraction alerts',
      description: 'Audio and visual alerts snap you back to focus before you lose momentum.',
      widget: <BellWidget />,
    },
    {
      icon: BarChart2,
      title: 'Focus analytics',
      description: 'Track your focus score, session history, and distraction patterns over time.',
      widget: <AnalyticsWidget />,
    },
    {
      icon: Target,
      title: 'Session goal setting',
      description: 'Set focus goals for each session and track your streaks and achievements.',
      widget: <GoalWidget />,
    },
    {
      icon: CheckSquare,
      title: 'Habit tracking',
      description: 'Build better daily focus habits with weekly reports and progress insights.',
      widget: <HabitWidget />,
    },
  ]


  //hero code
  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white">

      {/* hero section
          two-column: left has label + heading + description,
          right has the Focusentrix logo with glow.
        */}
      <section className="w-full px-30 pt-20 pb-16">
        <div className="grid grid-cols-2 gap-12 items-center">

          {/* left heading */}
          <div className="flex flex-col gap-5">
            <p className="text-[#9b59f5] text-sm font-semibold tracking-widest uppercase">Features</p>
            <h1 className="text-5xl font-black leading-tight">
              Everything You Need<br />to Stay in the Zone
            </h1>
            <p className="text-[#8a7aaa] text-base leading-relaxed max-w-sm">
              Five core capabilities designed to detect, analyze,
              and improve your focus all in real time.
            </p>
          </div>

          {/* right section logo with glow */}
          <div className="relative flex items-center justify-center">
            {/* glow behind logo */}
            <div className="absolute w-120 h-120 rounded-full bg-[#4a1a90] opacity-20 blur-3xl" />

            {/* dashed orbit ring around logo */}
            <div className="absolute w-100 h-100 rounded-full border border-dashed border-[#3d2060] opacity-100" />

            {/* logo on the right*/}
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

      {/* FEATURE ROWS
          one card per feature. Each has icon+text on the left
          and a uniqu widget on the right.
        */}
      <section className="w-full px-30 pb-24 grid grid-cols-2 gap-4">
        {features.map((f, i) => (
          <FeatureRow key={i} {...f} />
        ))}
      </section>

      {/*FOOTER*/}
      <Footer />

    </div>
  )
}