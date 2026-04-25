import { useState, useEffect, useRef } from 'react'
import { User, AlertTriangle, SkipBack, SkipForward, Pause, Play, Volume2, Plus, Flame, Settings, Trash2, Handshake, LogOut, Timer, Music2, ListCheck } from 'lucide-react'
import logo from '../assets/focusentrixclear2.png'
import { Link } from 'react-router-dom'
import rainSrc from '../assets/music/rainfall.mp3'
import classicalSrc from '../assets/music/classicalmusic.mp3'
import zenSrc from '../assets/music/zengarden.mp3'


//music goes here
const tracks = [
  { label: 'Rainfall', src: rainSrc },
  { label: 'Classical Music', src: classicalSrc },
  { label: 'Zen Garden', src: zenSrc },
]


//navigation bar made for this page
function DashboardNavbar() {
  return (
    <nav className="relative sticky top-0 py-2 z-50 bg-[#0a0a0f]">
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px]">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#9b59f5] to-transparent opacity-80 blur-[1px]" />
      </div>
      <div className="w-full h-16 flex items-center justify-center">
        <img src={logo} alt="Focusentrix logo" className="w-auto h-10 object-contain" />
      </div>
    </nav>
  )
}


//stat cards at the top
function StatCard({ label, value, sub, badge, icon, iconColor }) {
  return (
    <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl px-5 py-4 flex flex-col gap-1 flex-1 h-24">
      <div className="flex items-center justify-between">
        <span className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">{label}</span>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="bg-[#1e1040] border border-[#3d2060] text-[#9b59f5] text-[10px] font-bold px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
          {icon && <span className={iconColor}>{icon}</span>}
        </div>
      </div>
      <p className="text-white text-xl font-bold">{value}</p>
      {sub && <p className="text-[#8a7aaa] text-xs">{sub}</p>}
    </div>
  )
}



//footer for this page
function DashboardFooter() {
  return (
    <footer className="border-t border-[#1a1030] bg-[#0a0a0f] py-10 pb-7">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 lg:divide-x lg:divide-[#1a1030] mb-8">

        {/* logo */}
        <div className="flex flex-col lg:items-center gap-2 px-0 lg:px-10 mb-6 lg:mb-0">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Focusentrix logo" className="w-auto h-16 lg:h-20 object-contain" />
          </div>
          <p className="text-[#8c57cb] text-xl lg:text-sm font-medium lg:text-center leading-snug mt-1">
            Stay locked in. Work<br />smarter. Achieve more.
          </p>
        </div>

        {/* socials */}
        <div className="flex items-start gap-4 pl-0 lg:pl-10">
          <div className="bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0]
                          shadow-[0_4px_12px_rgba(123,44,191,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-full p-3 flex-shrink-0 mt-1">
            <svg className="text-white w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-white font-bold text-lg leading-snug">Don't miss out on<br />updates</p>
              <p className="text-[#8a7aaa] text-md mt-2">Follow Focusentrix on social media.</p>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="bg-[#1e1535] hover:bg-[#9b59f5] border border-[#3d2060] hover:border-[#9b59f5] rounded-lg p-2 transition-colors duration-200">
                <svg className="text-white w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="bg-[#1e1535] hover:bg-[#9b59f5] border border-[#3d2060] hover:border-[#9b59f5] rounded-lg p-2 transition-colors duration-200">
                <svg className="text-white w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 7s-.3-2-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.6 3 12 3 12 3s-4.6 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.6 21.7 12 21.7 12 21.7s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.7 1.2-2.7 1.2-2.7s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5v-7l8.1 3.5-8.1 3.5z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="bg-[#1e1535] hover:bg-[#9b59f5] border border-[#3d2060] hover:border-[#9b59f5] rounded-lg p-2 transition-colors duration-200">
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
      <div className="border-t border-[#1a1030] pt-6 text-center">
        <p className="text-[#5a4a7a] text-md font-medium lg:font-normal lg:text-sm">
          © 2026 FOCUSENTRIX. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default function Dashboard() {

  const [sessionState, setSessionState] = useState('idle')
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [phase, setPhase] = useState(1)
  const intervalRef = useRef(null)

  const [showConfig, setShowConfig] = useState(false)
  const [customMinutes, setCustomMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [totalPhases, setTotalPhases] = useState(4)

  const startTimer = () => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(intervalRef.current); intervalRef.current = null; return 0 }
        return t - 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  const handleMainButton = () => {
    if (sessionState === 'idle') {
      setSessionState('running'); setTimeLeft(customMinutes * 60); startTimer()
    } else if (sessionState === 'running') {
      setSessionState('break'); stopTimer(); setTimeLeft(breakMinutes * 60); startTimer()
    } else if (sessionState === 'break') {
      setSessionState('running'); stopTimer(); setTimeLeft(customMinutes * 60); setPhase(p => p + 1); startTimer()
    }
  }

  const handleEndSession = () => {
    stopTimer(); setSessionState('idle'); setTimeLeft(customMinutes * 60); setPhase(1)
  }

  useEffect(() => () => stopTimer(), [])

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const totalTime = sessionState === 'break' ? breakMinutes * 60 : customMinutes * 60
  const progress = 1 - timeLeft / totalTime
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress)

  const mainButtonLabel =
    sessionState === 'idle' ? '+ Start Session' :
      sessionState === 'running' ? 'Take a Break' : 'Resume Session'

  const phaseLabel =
    sessionState === 'break' ? 'BREAK TIME' :
      sessionState === 'running' ? `WORK PHASE ${phase} OF ${totalPhases}` : 'READY TO START'

  const audioRef = useRef(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [volume, setVolume] = useState(60)

  useEffect(() => {
    if (!audioRef.current) return
    const src = tracks[trackIndex].src
    if (!src) return
    audioRef.current.src = src
    audioRef.current.load()
    if (musicPlaying) audioRef.current.play()
  }, [trackIndex])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100
  }, [volume])

  useEffect(() => {
    if (!audioRef.current) return
    const src = tracks[trackIndex].src
    if (!src) return
    if (musicPlaying) {
      audioRef.current.src = audioRef.current.src || src
      audioRef.current.play().catch(() => { })
    } else {
      audioRef.current.pause()
    }
  }, [musicPlaying])

  const handlePlayPause = () => setMusicPlaying(!musicPlaying)
  const handlePrev = () => setTrackIndex((trackIndex - 1 + tracks.length) % tracks.length)
  const handleNext = () => setTrackIndex((trackIndex + 1) % tracks.length)

  const [tasks, setTasks] = useState([
    { id: 1, label: 'Finding color palette', done: true },
    { id: 2, label: 'Exploring UI designs', done: true },
    { id: 3, label: 'Start making initial design', done: false },
    { id: 4, label: 'Make it responsive design', done: false },
  ])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks([...tasks, { id: Date.now(), label: newTask.trim(), done: false }])
    setNewTask('')
  }

  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id))

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const donedays = [true, true, true, true, true, false, false]

  return (
    <>
      <DashboardNavbar />

      <div className="bg-[#0a0a0f] min-h-screen text-white">
        <audio ref={audioRef} loop />

        <div className="w-full px-10 pt-10 pb-24">

          {/* welcome row */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-black flex items-center gap-3">Hello, User <Handshake className="w-5 h-5 text-[#8c57cb]" /></h1>
              <p className="text-[#5a4a7a] text-sm font-semibold mt-0.5">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <button className="group flex items-center gap-2 border border-[#665395] hover:border-red-500 text-[#8a7aaa] hover:text-red-400 text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200">
              Logout <LogOut className="w-4 h-4 mb-0.5 text-[#8c57cb] group-hover:text-red-400 opacity-75 transform scale-x-[-1]" />
            </button>
          </div>


          {/* stat cards and pomodoro time */}
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_224px] gap-4 mb-4 items-start">

            <StatCard label="Focus score" value="87%" sub="+12% this week" />
            <StatCard label="Sessions today" value="3" sub="1 active" />
            <StatCard label="Total focus time" value="2h 14m" sub="Today" />
            <StatCard
              label="Recent Alerts"
              value="User left the frame"
              icon={<AlertTriangle className="w-4 h-4" />}
              iconColor="text-orange-400"
            />

            {/* pomodoro timer */}
            <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl px-6 py-5 flex flex-col items-center gap-3 relative row-span-2">

              <button
                onClick={() => setShowConfig(!showConfig)}
                className="absolute top-5 right-3 text-[#5a4a7a] hover:text-[#9b59f5] transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mr-3">
                <Timer className="text-[#9b59f5] w-4 h-4 mb-0.5" />
                <p className="text-[#5a4a7a] text-[12px] font-bold uppercase tracking-widest">Pomodoro Timer</p>
              </div>
              <p className="text-[#8a7aaa] text-[9px] font-medium uppercase tracking-widest">{phaseLabel}</p>

              {showConfig && (
                <div className="w-full bg-[#13102a] border border-[#2a1a40] rounded-xl p-4 flex flex-col gap-3 text-left">
                  <p className="text-white text-xs font-bold mb-1">Configure Session</p>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#5a4a7a] text-[10px] uppercase tracking-widest">Sessions</label>
                    <input type="number" min="1" max="10" value={totalPhases}
                      onChange={e => setTotalPhases(Number(e.target.value))}
                      className="bg-[#0e0b1e] border border-[#2a1a40] rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-[#9b59f5] transition-colors duration-200" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#5a4a7a] text-[10px] uppercase tracking-widest">Session (min)</label>
                    <input type="number" min="1" max="120" value={customMinutes}
                      onChange={e => { const v = Number(e.target.value); setCustomMinutes(v); if (sessionState === 'idle') setTimeLeft(v * 60) }}
                      className="bg-[#0e0b1e] border border-[#2a1a40] rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-[#9b59f5] transition-colors duration-200" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[#5a4a7a] text-[10px] uppercase tracking-widest">Break (min)</label>
                    <input type="number" min="1" max="30" value={breakMinutes}
                      onChange={e => setBreakMinutes(Number(e.target.value))}
                      className="bg-[#0e0b1e] border border-[#2a1a40] rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-[#9b59f5] transition-colors duration-200" />
                  </div>
                  <button onClick={() => setShowConfig(false)}
                    className="w-full bg-[#9b59f5] hover:bg-[#7c3de0] text-white text-xs font-semibold py-2 rounded-lg transition-colors duration-200">
                    Save
                  </button>
                </div>
              )}

              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r={radius} fill="none" stroke="#1e1535" strokeWidth="6" />
                  <circle cx="64" cy="64" r={radius} fill="none"
                    stroke={sessionState === 'break' ? '#22c55e' : '#9b59f5'}
                    strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={dashOffset}
                    strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear' }} />
                </svg>
                <span className="text-white text-xl font-black relative z-10">{formatTime(timeLeft)}</span>
              </div>

              <button onClick={handleMainButton}
                className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors duration-200
                  ${sessionState === 'running'
                    ? 'bg-[#1e1535] border border-[#3d2060] text-white hover:border-[#9b59f5]'
                    : 'bg-[#9b59f5] hover:bg-[#7c3de0] text-white'}`}>
                {mainButtonLabel}
              </button>

              <button onClick={handleEndSession} disabled={sessionState === 'idle'}
                className="w-full py-2 rounded-lg text-xs font-semibold border border-red-900 text-red-400 hover:bg-red-900/20 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed">
                End Session
              </button>
            </div>

            {/* camera monitoring*/}
            <div className="col-span-4 bg-[#0e0b1e] border border-[#1e1535] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#1e1535]">
                <p className="text-white font-bold text-sm uppercase tracking-wider">Camera Monitoring</p>
                <p className="text-[#5a4a7a] text-xs font-medium mt-1">Real Time Attention Tracking (Webcam Active)</p>
              </div>
              <div className="h-100 flex flex-col items-center justify-center gap-3 bg-[#080612]">
                <User className="text-[#3d2060] w-12 h-12" />
                <p className="text-[#5a4a7a] text-sm">
                  Status: <span className="text-[#9b59f5]">Calibrated & Monitoring</span>
                </p>
              </div>
            </div>

          </div>

          {/* tasks right column */}
          <div className="grid grid-cols-[1fr_220px] gap-4">

            {/* tasks */}
            <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl px-6 py-5">
              <p className="text-white font-semibold text-lg mb-3">Add Quick Task:</p>
              <div className="flex gap-3 mb-5">
                <input type="text" placeholder="Add new task" value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTask()}
                  className="flex-1 bg-[#13102a] border border-[#2a1a40] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200" />
                <button onClick={addTask}
                  className="bg-[#1e1535] border border-[#3d2060] hover:border-[#9b59f5] text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors duration-200 flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Add Task
                </button>
              </div>
              {/* <p className="text-[#8a7aaa] text-lg font-semibold mt-10 mb-3">To do list</p> */}
              <div className="flex items-center gap-2 mt-10 mb-3">
                <ListCheck className="text-[#9b59f5] w-4 h-4 mb-0.5" />
                <p className="text-[#5a4a7a] text-lg font-semibold">To do list</p>
              </div>
              <div className="flex flex-col divide-y divide-[#1e1535]">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between py-4">
                    <span className={`text-lg font-medium ${task.done ? 'text-[#5a4a7a] line-through' : 'text-white'}`}>
                      {task.label}
                    </span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleTask(task.id)}>
                        {task.done
                          ? <div className="w-8 h-8 rounded-lg border border-[#9b59f5] bg-[#1e1040] flex items-center justify-center">
                            <span className="text-[#9b59f5] text-sm">✓</span>
                          </div>
                          : <div className="w-8 h-8 rounded-lg border border-[#2a1a40] hover:border-[#9b59f5] transition-colors duration-200" />
                        }
                      </button>
                      <button onClick={() => deleteTask(task.id)} className="text-[#5a4a7a] hover:text-red-400 transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* right column */}
            <div className="flex flex-col gap-4">

              {/* background music */}
              <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl px-5 py-5 flex flex-col gap-4">
                {/* <p className="text-[#5a4a7a] text-[12px] font-bold uppercase tracking-widest">Background Music</p> */}
                <div className="flex items-center gap-2 mr-3">
                  <Music2 className="text-[#9b59f5] w-4 h-4 mb-0.5" />
                  <p className="text-[#5a4a7a] text-[12px] font-bold uppercase tracking-widest">Background Music</p>
                </div>
                <div className="flex flex-col gap-2">
                  {tracks.map((track, i) => (
                    <button key={track.label} onClick={() => setTrackIndex(i)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-200
                        ${trackIndex === i ? 'bg-[#1e1040] text-white' : 'text-[#8a7aaa] hover:text-white'}`}>
                      {track.label}
                      {trackIndex === i && <span className="text-[#9b59f5] text-xs">✓</span>}
                    </button>
                  ))}
                </div>
                {!tracks[trackIndex].src && (
                  <p className="text-[#5a4a7a] text-[10px] text-center leading-relaxed">
                    Import your audio file in Dashboard.jsx to enable playback
                  </p>
                )}
                <div className="flex items-center justify-center gap-4">
                  <button onClick={handlePrev} className="text-[#5a4a7a] hover:text-white transition-colors duration-200">
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button onClick={handlePlayPause}
                    className="w-9 h-9 rounded-full bg-[#1e1040] border border-[#3d2060] hover:border-[#9b59f5] flex items-center justify-center transition-colors duration-200">
                    {musicPlaying
                      ? <Pause className="text-white w-4 h-4" />
                      : <Play className="text-white w-4 h-4" />
                    }
                  </button>
                  <button onClick={handleNext} className="text-[#5a4a7a] hover:text-white transition-colors duration-200">
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="text-[#5a4a7a] w-3 h-3 flex-shrink-0" />
                  <input type="range" min="0" max="100" value={volume}
                    onChange={e => setVolume(Number(e.target.value))}
                    className="flex-1 h-1 accent-[#9b59f5] cursor-pointer" />
                </div>
              </div>

              {/* streak */}
              <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl px-5 py-5 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Flame className="text-[#9b59f5] w-4 h-4" />
                  <p className="text-[#5a4a7a] text-[12px] font-bold uppercase tracking-widest">Current Streak</p>
                </div>
                <p className="text-white text-2xl font-black">12 Days</p>
                <div className="flex items-center justify-between w-full">
                  {days.map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center
                        ${donedays[i] ? 'bg-[#9b59f5]' : 'bg-[#1e1535] border border-[#2a1a40]'}`}>
                        {donedays[i] && <span className="text-white text-[8px]">✓</span>}
                      </div>
                      <span className="text-[#5a4a7a] text-[9px]">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="py-18 pb-0 px-4">
          <DashboardFooter />
        </div>
      </div >
    </>
  )
}