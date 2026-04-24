import { useState, useEffect, useRef } from 'react'
import { User, AlertTriangle, SkipBack, SkipForward, Pause, Play, Volume2, Plus, Flame, X, Settings, Trash2 } from 'lucide-react'
import Footer from '../components/Footer'
import logo from '../assets/focusentrixclear2.png'
import { Link } from 'react-router-dom'

const tracks = [
  { label: 'Rain', src: null },
  { label: 'Lo-fi Beats', src: null },
  { label: 'Zen Garden',  src: null },
]

// logo only navbar just for the dashboard
function DashboardNavbar() {
  return (
    <nav className="relative sticky top-0 py-2 z-50 bg-[#0a0a0f]">
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px]">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#9b59f5] to-transparent opacity-80 blur-[1px]" />
      </div>
      <div className="w-full h-16 flex items-center justify-center">
        <Link to="/" className="flex items-center no-underline">
          <img src={logo} alt="Focusentrix logo" className="w-auto h-10 object-contain" />
        </Link>
      </div>
    </nav>
  )
}

function StatCard({ label, value, sub, badge, icon, iconColor }) {
  return (
    <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl px-5 py-4 flex flex-col gap-1 flex-1 h-26">
      <div className="flex items-center justify-between">
        <span className="text-[#5a4a7a] text-xs uppercase tracking-widest">{label}</span>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="bg-[#1e1040] border border-[#3d2060] text-[#9b59f5] text-[10px] font-bold px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
          {icon && <span className={iconColor}>{icon}</span>}
        </div>
      </div>
      <p className="text-white text-2xl font-black">{value}</p>
      {sub && <p className="text-[#8a7aaa] text-xs">{sub}</p>}
    </div>
  )
}

export default function Dashboard() {

  const [sessionState, setSessionState]   = useState('idle')
  const [timeLeft, setTimeLeft]           = useState(25 * 60)
  const [phase, setPhase]                 = useState(1)
  const intervalRef                       = useRef(null)

  const [showConfig, setShowConfig]       = useState(false)
  const [customMinutes, setCustomMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes]   = useState(5)
  const [totalPhases, setTotalPhases]     = useState(4)

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

  const totalTime     = sessionState === 'break' ? breakMinutes * 60 : customMinutes * 60
  const progress      = 1 - timeLeft / totalTime
  const radius        = 54
  const circumference = 2 * Math.PI * radius
  const dashOffset    = circumference * (1 - progress)

  const mainButtonLabel =
    sessionState === 'idle'    ? '+ Start Session' :
    sessionState === 'running' ? 'Take a Break' : 'Resume Session'

  const phaseLabel =
    sessionState === 'break'   ? 'BREAK TIME' :
    sessionState === 'running' ? `WORK PHASE ${phase} OF ${totalPhases}` : 'READY TO START'

  const audioRef                            = useRef(null)
  const [trackIndex, setTrackIndex]         = useState(0)
  const [musicPlaying, setMusicPlaying]     = useState(false)
  const [volume, setVolume]                 = useState(60)

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
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [musicPlaying])

  const handlePlayPause = () => setMusicPlaying(!musicPlaying)
  const handlePrev = () => setTrackIndex((trackIndex - 1 + tracks.length) % tracks.length)
  const handleNext = () => setTrackIndex((trackIndex + 1) % tracks.length)

  const [monitoring, setMonitoring] = useState(true)
  const [paused, setPaused]         = useState(false)

  const [tasks, setTasks] = useState([
    { id: 1, label: 'Finding color palette',       done: true },
    { id: 2, label: 'Exploring UI designs',        done: true },
    { id: 3, label: 'Start making initial design', done: false },
    { id: 4, label: 'Make it responsive design',   done: false },
  ])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks([...tasks, { id: Date.now(), label: newTask.trim(), done: false }])
    setNewTask('')
  }

  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id))

  const days     = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const donedays = [true, true, true, true, true, false, false]

  return (
    <>
      <DashboardNavbar />

      <div className="bg-[#0a0a0f] min-h-screen text-white">
        <audio ref={audioRef} loop />

        <div className="w-full px-10 pt-10 pb-24">

          {/* welcome row with logout button */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-black">Good morning, Alex 👋</h1>
              <p className="text-[#5a4a7a] text-sm mt-0.5">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <button className="flex items-center gap-2 border border-[#2a1a40] hover:border-red-500 text-[#8a7aaa] hover:text-red-400 text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200">
              Logout
            </button>
          </div>

          {/* stat cards + timer row */}
          <div className="flex gap-4 mb-6 items-stretch">

            <StatCard label="Focus score" value="87%" sub="+12% this week" badge="Pro" />
            <StatCard label="Sessions today" value="3" sub="1 active" />
            <StatCard label="Total focus time" value="2h 14m" sub="Today" />
            <StatCard
              label="Recent Alerts"
              value="User left the frame"
              icon={<AlertTriangle className="w-4 h-4" />}
              iconColor="text-orange-400"
            />

            {/* pomodoro timer card */}
            <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl px-6 py-5 flex flex-col items-center gap-3 w-56 flex-shrink-0 relative">

              {/* gear icon right side */}
              <button
                onClick={() => setShowConfig(!showConfig)}
                className="absolute top-4 right-4 text-[#5a4a7a] hover:text-[#9b59f5] transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
              </button>

              <p className="text-[#5a4a7a] text-[10px] font-semibold uppercase tracking-widest">Pomodoro Timer</p>
              <p className="text-[#8a7aaa] text-[9px] uppercase tracking-widest">{phaseLabel}</p>

              {/* config panel */}
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

              {/* ring countdown */}
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
          </div>

          {/* main content grid */}
          <div className="grid grid-cols-[1fr_220px] gap-4">

            {/* left column */}
            <div className="flex flex-col gap-4">

              {/* camera monitoring */}
              <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#1e1535]">
                  <p className="text-white font-bold text-sm uppercase tracking-wider">Camera Monitoring</p>
                  <p className="text-[#5a4a7a] text-xs mt-0.5">Real Time Attention Tracking (Webcam Active)</p>
                </div>
                <div className="h-64 flex flex-col items-center justify-center gap-3 bg-[#080612]">
                  <User className="text-[#3d2060] w-12 h-12" />
                  <p className="text-[#5a4a7a] text-sm">
                    Status: <span className="text-[#9b59f5]">Calibrated & Monitoring</span>
                  </p>
                </div>
              </div>

              {/* tasks */}
              <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl px-6 py-5">
                <p className="text-white font-semibold text-sm mb-3">Add Quick Task:</p>
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
                <p className="text-[#8a7aaa] text-sm mb-3">To do list</p>
                <div className="flex flex-col divide-y divide-[#1e1535]">
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between py-4">
                      <span className={`text-lg font-semibold ${task.done ? 'text-[#5a4a7a] line-through' : 'text-white'}`}>
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
            </div>

            {/* right column */}
            <div className="flex flex-col gap-4">

              {/* background music */}
              <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl px-5 py-5 flex flex-col gap-4">
                <p className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">Background Music</p>
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

              {/* streak card */}
              <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl px-5 py-5 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Flame className="text-[#9b59f5] w-4 h-4" />
                  <p className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">Current Streak</p>
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

        <Footer />
      </div>
    </>
  )
}