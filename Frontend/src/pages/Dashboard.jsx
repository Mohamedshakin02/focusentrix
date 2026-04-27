import { useState, useEffect, useRef } from 'react'
import { User, AlertTriangle, SkipBack, SkipForward, Pause, Play, Volume2, Plus, Flame, Settings, Trash2, Handshake, LogOut, Timer, Music2, ListCheck, CameraOff } from 'lucide-react'
import logo from '../assets/focusentrixclear2.png'
import logo2 from '../assets/focusentrixclear.png'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import rainSrc from '../assets/music/rainfall.mp3'
import classicalSrc from '../assets/music/classicalmusic.mp3'
import zenSrc from '../assets/music/zengarden.mp3'
import distractionSound from '../assets/music/distraction.mp3'
import useFaceFocusTracker from '../utils/useFaceFocusTracker'
import Webcam from "react-webcam";
import { CustomizedToast } from "../utils/toast";
import axios from "axios"


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
function DashboardFooter({ username, handleLogout }) {
  return (
    <footer className="border-t border-[#1a1030] bg-[#0a0a0f] py-10 pb-7">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-0 lg:divide-x lg:divide-[#1a1030] mb-8">

        {/* Left area*/}
        <div className="flex items-start gap-4 pr-0 lg:pr-10  mb-2 lg:mb-0 order-2 lg:order-1 mb-2 lg:mb-0">
          <div className="bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0]
                          shadow-[0_4px_12px_rgba(123,44,191,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-full p-3 flex-shrink-0 mt-1">
            <User className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-white font-bold text-lg leading-snug">Hello, <br />{username}</p>
              <p className="text-[#8a7aaa] text-md mt-2">Welcome back! Stay focused and make today your most productive session.</p>
            </div>
            <button className="w-fit mt-2 group flex items-center gap-2 border border-[#665395] hover:border-red-500 text-[#8a7aaa] hover:text-red-400 text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mb-0.5 text-[#8c57cb] group-hover:text-red-400 opacity-75 transform scale-x-[-1]" /> Logout
            </button>
          </div>
        </div>

        {/* logo */}
        <div className="flex flex-col lg:items-center gap-2 px-0 lg:px-10 mb-6 lg:mb-0 order-1 lg:order-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Focusentrix logo" className="w-auto h-16 lg:h-20 object-contain" />
          </div>
          <p className="text-[#8c57cb] text-xl lg:text-sm font-medium lg:text-center leading-snug mt-1">
            Stay locked in. Work<br />smarter. Achieve more.
          </p>
        </div>

        {/* socials */}
        <div className="flex items-start gap-4 pl-0 lg:pl-10 order-3 lg:order-3">
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

  const username = localStorage.getItem("username") || "User"

  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)

  // clears local storage and redirects to home page on logout
  const handleLogout = () => {
    setLoggingOut(true)

    setTimeout(() => {
      localStorage.clear() // 
      navigate("/")
    }, 3000)
  }

  const [recentAlert, setRecentAlert] = useState("All Good")

  //face focus tracking states and refs
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const webcamRef = useRef(null)
  const [videoElement, setVideoElement] = useState(null)
  const [cameraStatus, setCameraStatus] = useState("idle")

  const { status, isFocused, alert } =
    useFaceFocusTracker(webcamRef)


  useEffect(() => {
    const interval = setInterval(() => {
      if (webcamRef.current?.video) {
        setVideoElement(webcamRef.current.video)
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [cameraStatus])


  const faceLandmarkerRef = useRef(null)
  const lastState = useRef("focused")
  const lastChangeTime = useRef(Date.now())

  const [focusTime, setFocusTime] = useState(0)
  const [distractedTime, setDistractedTime] = useState(0)

  const [finalFocusScore, setFinalFocusScore] = useState(null)
  const totalTrackedTime = focusTime + distractedTime

  const liveFocusScore =
    totalTrackedTime === 0
      ? 100
      : Math.round((focusTime / totalTrackedTime) * 100)

  const [sessionsToday, setSessionsToday] = useState(0)
  const sessionCompletedRef = useRef(false);

  const [todayFocusTime, setTodayFocusTime] = useState(0)

  const formatFocusTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`
    return `${minutes}m ${secs}s`
  }

  const [streak, setStreak] = useState(null)

  // Fetches today's session count for the logged-in user from MongoDB
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const userId = localStorage.getItem("userId")

        const res = await axios.get(
          `http://localhost:5000/api/session/today/${userId}`
        )

        setSessionsToday(res.data.count)
        setTodayFocusTime(res.data.focusTime)
      } catch (err) {
        console.log("Failed to fetch sessions today")
        setSessionsToday(0)
        setTodayFocusTime(0)
      }
    }

    fetchSessions()
  }, [])


  const distractionAudioRef = useRef(null)

  useEffect(() => {
    distractionAudioRef.current = new Audio(distractionSound)
  }, [])

  const distractionStartRef = useRef(null)
  const alertIntervalRef = useRef(null);

  const lastAlertRef = useRef(null)

  // shows toast and browser notifications and plays alert sound based on the alert and focus status from the face focus tracker
  useEffect(() => {
    if (status === "loading") return;

    // stop everything if session not running
    if (sessionState !== "running") {
      distractionStartRef.current = null;

      if (alertIntervalRef.current) {
        clearInterval(alertIntervalRef.current);
        alertIntervalRef.current = null;
      }

      lastAlertRef.current = null

      return;
    }

    // If user is focused, stop tracking
    if (isFocused) {
      distractionStartRef.current = null;

      if (alertIntervalRef.current) {
        clearInterval(alertIntervalRef.current);
        alertIntervalRef.current = null;
      }

      lastAlertRef.current = null;

      return;
    }

    // Start tracking distraction time
    if (!distractionStartRef.current) {
      distractionStartRef.current = Date.now();
    }

    // Start alert loop
    if (!alertIntervalRef.current) {
      alertIntervalRef.current = setInterval(() => {
        const now = Date.now()

        if (!lastAlertRef.current) {
          lastAlertRef.current = now
          return
        }

        const diff = now - lastAlertRef.current

        if (diff >= 30000) {
          CustomizedToast.error("You are still distracted!")

          showBrowserNotification(
            "Focusentrix Alert",
            "You are distracted for too long"
          )

          if (distractionAudioRef.current) {
            distractionAudioRef.current.currentTime = 0
            distractionAudioRef.current.play().catch(() => { })
          }

          lastAlertRef.current = now
        }
      }, 1000)
    }

    return () => {
      if (alertIntervalRef.current) {
        clearInterval(alertIntervalRef.current);
        alertIntervalRef.current = null;
      }
    };
  }, [isFocused, status, sessionState]);

  useEffect(() => {
    if (!isFocused) {
      console.log("User distracted")
    }
  }, [isFocused])


  useEffect(() => {
    if (sessionState !== 'running') return

    const interval = setInterval(() => {
      if (isFocused) {
        setFocusTime(prev => prev + 1)
      } else {
        setDistractedTime(prev => prev + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isFocused, sessionState])

  useEffect(() => {
    setRecentAlert(alert)
  }, [alert])

  useEffect(() => {
    if (timeLeft !== 0) return;

    const handleSessionEnd = async () => {

      // WORK SESSION ENDED
      if (sessionState === "running") {

        stopTimer();
        stopCamera(); // turn off camera

        // If last phase → reset everything
        if (phase >= totalPhases) {

          completeSession();
          await updateStreak()
          setSessionState("idle");
          setPhase(1);
          setTimeLeft(customMinutes * 60);

          return;
        }

        // Otherwise go to break
        setSessionState("break");
        setTimeLeft(breakMinutes * 60);
        startTimer();

        notifyUser(
          "Focusentrix",
          "One work session is completed"
        )
      }

      // BREAK ENDED
      else if (sessionState === "break") {

        stopTimer();

        // If last phase already completed → end session
        if (phase >= totalPhases) {
          setSessionState("idle");
          setPhase(1);
          setTimeLeft(customMinutes * 60);
          stopCamera();
          stopTimer();
          return;
        }

        // otherwise continue next work phase
        setSessionState("running");
        setPhase(prev => prev + 1);
        setTimeLeft(customMinutes * 60);

        startTimer();

        notifyUser(
          "Focusentrix",
          "Next session is started"
        )
      }
    }

    handleSessionEnd();

  }, [timeLeft]);

  useEffect(() => {
    if (sessionState === "idle") {
      stopCamera()
    }
  }, [sessionState])

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

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

  const completeSession = async () => {
    if (sessionCompletedRef.current) return;
    sessionCompletedRef.current = true;

    const userId = localStorage.getItem("userId");

    try {
      await axios.post("http://localhost:5000/api/session/increment", {
        userId,
        focusTime: focusTime
      });

      const res = await axios.get(
        `http://localhost:5000/api/session/today/${userId}`
      );

      setSessionsToday(res.data.count);
      setTodayFocusTime(res.data.focusTime);

    } catch (err) {
      console.log("Failed to update session");
    }
  };

  const checkCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
      return "granted"
    } catch {
      return "denied"
    }
  }


  useEffect(() => {
    const checkPermission = async () => {
      try {
        const permission = await navigator.permissions.query({ name: "camera" })
        if (permission.state === "denied") {
          setCameraStatus("denied")
        }
      } catch {

      }
    }

    checkPermission()
  }, [])

  const handleMainButton = async () => {

    // Block session to start if camera setting is denied
    if (sessionState === 'idle') {

      sessionCompletedRef.current = false;

      const permission = await checkCameraPermission()

      if (permission === "denied") {
        setCameraStatus("denied")
        CustomizedToast.error("Turn on camera access to start session")
        return
      }

      setFocusTime(0)
      setDistractedTime(0)

      setCameraStatus("active")
      setSessionState('running')
      setTimeLeft(customMinutes * 60)
      startTimer()

      notifyUser("Focusentrix", "Session started. Stay focused!")
    }

    else if (sessionState === 'running') {
      setSessionState('break')
      stopTimer()
      setTimeLeft(breakMinutes * 60)
      startTimer()

      notifyUser("Focusentrix", "Break time started")
    }

    else if (sessionState === 'break') {

      notifyUser("Focusentrix", "Next session is started")

      // checks if last phase reached, if yes then reset everything to initial state
      if (phase >= totalPhases) {
        stopTimer()
        setSessionState('idle')
        setPhase(1)
        setTimeLeft(customMinutes * 60)

        notifyUser("Focusentrix", "Session is completed")
        return
      }

      // otherwise continue next cycle
      setSessionState('running')
      stopTimer()
      setTimeLeft(customMinutes * 60)
      setPhase(p => p + 1)
      startTimer()


    }
  }

  useEffect(() => {
    if (sessionState !== "running") return;

    const startCamera = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true })
        setCameraStatus("active")
      } catch (err) {
        setCameraStatus("denied")
      }
    }

    startCamera()

    return () => {
      stopCamera()
    }
  }, [sessionState])

  const handleEndSession = async () => {
    stopTimer();
    setSessionState('idle');
    setTimeLeft(customMinutes * 60);
    setPhase(1)

    const total = focusTime + distractedTime

    const score =
      total === 0 ? 100 : Math.round((focusTime / total) * 100)

    setFinalFocusScore(score)
    await updateStreak()

    const userId = localStorage.getItem("userId");

    try {
      await axios.post("http://localhost:5000/api/session/increment", {
        userId,
        focusTime: focusTime
      });

      // refresh UI after update
      const res = await axios.get(
        `http://localhost:5000/api/session/today/${userId}`
      );

      setSessionsToday(res.data.count);
      setTodayFocusTime(res.data.focusTime);

    } catch (err) {
      console.log("Failed to update session");
    }

    distractionStartRef.current = null;

    if (alertIntervalRef.current) {
      clearInterval(alertIntervalRef.current);
      alertIntervalRef.current = null;
    }

    notifyUser(
      "Focusentrix",
      "Session is Ended"
    )
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

  // function to show browser notifications for focus alerts
  const showBrowserNotification = (title, message) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: message,
        icon: logo2,
      });
    }
  }

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

  // const addTask = () => {
  //   if (!newTask.trim()) return
  //   setTasks([...tasks, { id: Date.now(), label: newTask.trim(), done: false }])
  //   setNewTask('')
  // }

  // const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  // const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id))

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const today = new Date()
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(today.getDate() - (6 - i))
    return d.toISOString().split("T")[0]
  })

  const activeDays = streak?.activeDays || []

  const weekStatus = last7Days.map(date =>
    activeDays.includes(date)
  )

  const stopCamera = () => {
    const webcam = webcamRef.current

    if (webcam && webcam.video && webcam.video.srcObject) {
      const stream = webcam.video.srcObject
      stream.getTracks().forEach(track => track.stop())
      webcam.video.srcObject = null
    }

    webcamRef.current = null
    setCameraStatus("idle")
  }


  // Request notification permission 
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const notifyUser = (title, message) => {
    CustomizedToast.success(message)

    showBrowserNotification(title, message)
  }



  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const userId = localStorage.getItem("userId")

        const res = await axios.get(
          `http://localhost:5000/api/streak/${userId}`
        )

        setStreak(res.data)
      } catch (err) {
        console.log("Failed to fetch streak")
      }
    }

    fetchStreak()
  }, [])

  const updateStreak = async () => {
    try {
      const userId = localStorage.getItem("userId")

      await axios.post("http://localhost:5000/api/streak/update", {
        userId,
      })

      const streakRes = await axios.get(
        `http://localhost:5000/api/streak/${userId}`
      )

      setStreak(streakRes.data)
    } catch (err) {
      console.log("Failed to update streak")
    }
  }

  // Fetch tasks for the logged-in user from MongoDB
  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem("userId");

      try {
        const res = await axios.get(`http://localhost:5000/api/tasks/${userId}`);
        setTasks(res.data);
      } catch (err) {
        console.log("Failed to fetch tasks");
      }
    };

    fetchTasks();
  }, []);

  // Adds a new task to MongoDB and updates UI
  const addTask = async () => {
    if (!newTask.trim()) return;

    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        userId,
        label: newTask,
      });

      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      console.log("Failed to add task");
    }
  };

  // Toggles task completion status in MongoDB and updates UI
  const toggleTask = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`);

      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.log("Failed to update task");
    }
  };

  // Deletes task from MongoDB and updates UI
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);

      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.log("Failed to delete task");
    }
  };


  return (
    <>

      {/* Show loading screen when logging out*/}
      {loggingOut && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-[9999]">
          <div className="w-12 h-12 border-4 border-[#9b59f5] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <DashboardNavbar />

      <div className="bg-[#0a0a0f] min-h-screen text-white relative overflow-hidden">

        {/* glowing effect */}
        <div className="pointer-events-none absolute -top-32 -left-32 
                        w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] 
                       bg-[#9b59f5] opacity-10 blur-[140px]" />

        <div className="pointer-events-none absolute bottom-0 right-0 
                        w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] 
                      bg-[#6229C1] opacity-10 blur-[160px]" />


        {/* Audio element used to play background music.
            The ref (audioRef) allows control from React (play, pause, volume, track change).
             The 'loop' attribute ensures the music keeps playing continuously. */}
        <audio ref={audioRef} loop />

        <div className="w-full px-10 pt-10 pb-24">

          {/* welcome row */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-black flex items-center gap-3">Hello, {username} <Handshake className="w-5 h-5 text-[#8c57cb]" /></h1>
              <p className="text-[#5a4a7a] text-sm font-semibold mt-0.5">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <button className="group flex items-center gap-2 border border-[#665395] hover:border-red-500 text-[#8a7aaa] hover:text-red-400 text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200" onClick={handleLogout}>
              Logout <LogOut className="w-4 h-4 mb-0.5 text-[#8c57cb] group-hover:text-red-400 opacity-75 transform scale-x-[-1]" />
            </button>
          </div>


          {/* stat cards and pomodoro time */}
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_224px] gap-4 mb-4 items-start">

            <StatCard
              label="Focus score"
              value={
                sessionState === "running"
                  ? `${liveFocusScore}%`
                  : finalFocusScore !== null
                    ? `${finalFocusScore}%`
                    : "0%"
              }
              sub={
                sessionState === "running"
                  ? "Live tracking"
                  : "Last session"
              }
            />
            <StatCard label="Sessions today" value={sessionsToday} sub="Today’s completed sessions" />
            <StatCard label="Total focus time" value={formatFocusTime(todayFocusTime)} sub="Today" />
            <StatCard
              label="Recent Alerts"
              value={recentAlert}
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
              <div className="w-full flex items-center justify-center bg-[#080612] p-4">
                <div className="w-full max-w-3xl h-100 aspect-video rounded-xl overflow-hidden border border-[#1e1535] relative bg-[#080612]">

                  {/* Webcam only when active */}
                  {cameraStatus === "active" && (
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      mirrored={true}
                      screenshotFormat="image/jpeg"
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* CAMERA DENIED (highest priority) */}
                  {cameraStatus === "denied" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#080612] text-red-400 text-sm font-medium">
                      <CameraOff className="w-10 h-10" />
                      <p>Camera permission denied</p>
                    </div>
                  )}

                  {/* IDLE */}
                  {cameraStatus !== "denied" && sessionState === "idle" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080612] text-[#5a4a7a] text-sm font-medium gap-2">
                      <User className="text-[#3d2060] w-12 h-12" />
                      <div>Start session to enable focus monitoring</div>
                    </div>
                  )}

                  {/* BREAK */}
                  {cameraStatus !== "denied" && sessionState === "break" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#080612] text-[#5a4a7a] text-sm font-medium">
                      Break time — relax
                    </div>
                  )}

                  {/* RUNNING */}
                  {cameraStatus === "active" && sessionState === "running" && (
                    <div className="absolute bottom-2 left-2 right-2 flex justify-center">
                      <div className="bg-[#080612] backdrop-blur-md px-3 py-1 rounded-lg text-xs text-white">
                        Focus Status:{" "}
                        <span className={isFocused ? "text-green-400" : "text-red-400"}>
                          {status === "loading"
                            ? "Loading..."
                            : isFocused
                              ? "Focused"
                              : "Distracted"}
                        </span>
                      </div>
                    </div>
                  )}

                </div>
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
                  <div key={task._id} className="flex items-center justify-between py-4">
                    <span className={`text-lg font-medium ${task.done ? 'text-[#5a4a7a] line-through' : 'text-white'}`}>
                      {task.label}
                    </span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleTask(task._id)}>
                        {task.done
                          ? <div className="w-8 h-8 rounded-lg border border-[#9b59f5] bg-[#1e1040] flex items-center justify-center">
                            <span className="text-[#9b59f5] text-sm">✓</span>
                          </div>
                          : <div className="w-8 h-8 rounded-lg border border-[#2a1a40] hover:border-[#9b59f5] transition-colors duration-200" />
                        }
                      </button>
                      <button onClick={() => deleteTask(task._id)} className="text-[#5a4a7a] hover:text-red-400 transition-colors duration-200">
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
                <p className="text-white text-2xl font-black">
                  {streak?.streakCount || 0} Days
                </p>
                <div className="flex items-center justify-between w-full">
                  {weekStatus.map((done, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center
      ${done ? 'bg-[#9b59f5]' : 'bg-[#1e1535] border border-[#2a1a40]'}`}>
                        {done && <span className="text-white text-[8px]">✓</span>}
                      </div>
                      <span className="text-[#5a4a7a] text-[9px]">{days[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-30">
          <DashboardFooter username={username} handleLogout={handleLogout} />
        </div>
      </div >
    </>
  )
}