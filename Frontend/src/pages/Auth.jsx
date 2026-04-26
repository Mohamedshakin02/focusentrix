import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Webcam, Bell, Trophy, BarChart2, Globe, ArrowRight } from 'lucide-react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { CustomizedToast } from "../utils/toast";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google'

// login and signup page
// two columns used 
// right has the login/signup form with tab toggle.
export default function Auth() {

  // for navigation after login/signup
  const navigate = useNavigate()

  const googleBtnRef = useRef()

  // loading state for form submission
  const [loading, setLoading] = useState(false)


  // toggles between login and signup
  const [mode, setMode] = useState('login')

  // login form state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })

  // signup form state
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' })

  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  const handleSignupChange = (e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginForm
      )

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("username", res.data.user.name)
      localStorage.setItem("userId", res.data.user._id)

      CustomizedToast.success("Login successful")

      setLoginForm({ email: "", password: "" })

      navigate("/dashboard")

    } catch (err) {
      const status = err.response?.status
      const msg = err.response?.data?.message

      if (status === 401) {
        CustomizedToast.error("Incorrect email or password")
      }
      else if (status === 404) {
        CustomizedToast.error("User not found")
      }
      else {
        CustomizedToast.error(msg || "Login failed")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        signupForm
      )

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("username", res.data.user.name)
      localStorage.setItem("userId", res.data.user._id)

      CustomizedToast.success("Account created successfully")

      setSignupForm({ name: "", email: "", password: "" })

      navigate("/dashboard")

    } catch (err) {
      CustomizedToast.error("Signup failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true)

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          credential: credentialResponse.credential
        }
      )

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("username", res.data.user.name)
      localStorage.setItem("userId", res.data.user._id)

      CustomizedToast.success("Google login successful")

      navigate("/dashboard")

    } catch (err) {
      const msg = err.response?.data?.message

      if (msg === "User not found") {
        CustomizedToast.error("No account found. Please sign up first.")
      } else {
        CustomizedToast.error("Google login failed")
      }

      setLoading(false)
    }
  }



  // features shown on the left side of the card
  const features = [
    { icon: Webcam, label: 'Real-time camera-based focus detection' },
    { icon: Bell, label: 'Instant distraction alerts & smart nudges' },
    { icon: Trophy, label: 'Gamified progress with levels & achievements' },
    { icon: BarChart2, label: 'Personalized weekly focus reports' },
    { icon: Globe, label: 'No software install — 100% browser-based' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-white">
        <div className="w-14 h-14 border-4 border-[#9b59f5] border-t-transparent rounded-full animate-spin mb-4"></div>
      </div>
    )
  }

  return (
    <>

      <Navbar />

      <div className="bg-[#0a0a0f] min-h-screen text-white container mx-auto px-4 sm:px-6 lg:px-30">

        {/* login/signp card
        centered card with two columns inside.
        Left has the branding and features
        Right has the login/signup form
      */}
        <section className="w-full px-4 pt-14 pb-0 flex items-center justify-center">
          <div className="w-full bg-[#0e0b1e] border border-[#1e1535] rounded-3xl overflow-hidden relative">

            {/* purple glow at top left */}
            <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#4a1a90] opacity-20 blur-3xl pointer-events-none" />
            {/* purple glow at bottom right */}
            <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-[#9b59f5] opacity-10 blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2">

              {/* left of card */}
              <div className="flex flex-col gap-8 px-8 lg:px-12 py-12 pb-0 lg:pb-16 lg:py-16 border-r border-[#1e1535]">
                <div>
                  <h2 className="text-2xl md:text-4xl font-black leading-tight">
                    Your <span className="text-[#9b59f5]">Focus</span><br />
                    Journey Starts Here
                  </h2>
                </div>

                {/* features list */}
                <div className="hidden lg:flex">
                  <ul className="flex flex-col gap-4">
                    {features.map(({ icon: Icon, label }, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#1e1040] border border-[#2a1a40] flex items-center justify-center flex-shrink-0">
                          <Icon className="text-[#9b59f5] w-4 h-4" />
                        </div>
                        <span className="text-[#c0b0e0] text-sm">{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* right of card form*/}
              <div className="flex flex-col justify-center px-8 lg:px-12 py-12 pt-8 lg:pb-16 lg:py-18">

                {/* tab toggle between login and sign up */}
                <div className="flex gap-6 mb-8 border-b border-[#1e1535]">
                  <button
                    onClick={() => setMode('login')}
                    className={`pb-3 text-sm font-semibold transition-colors duration-200 border-b-2 -mb-px
                    ${mode === 'login'
                        ? 'text-white border-[#9b59f5]'
                        : 'text-[#5a4a7a] border-transparent hover:text-white'
                      }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setMode('signup')}
                    className={`pb-3 text-sm font-semibold transition-colors duration-200 border-b-2 -mb-px
                    ${mode === 'signup'
                        ? 'text-white border-[#9b59f5]'
                        : 'text-[#5a4a7a] border-transparent hover:text-white'
                      }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* login form*/}
                {mode === 'login' && (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white font-bold text-2xl">Welcome Back</h3>
                    <p className="text-[#8a7aaa] text-sm mb-4">Log in to continue your focus streak</p>

                    <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">Email Address:</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={loginForm.email}
                          onChange={handleLoginChange}
                          required
                          className="bg-[#13102a] border border-[#2a1a40] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">Password:</label>
                        <input
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          required
                          className="bg-[#13102a] border border-[#2a1a40] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200"
                        />

                      </div>

                      {/*login button */}
                      <button
                        type="submit"
                        className="w-full text-white font-semibold py-3.5 mt-2 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2
                        bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0]
                        shadow-[0_4px_12px_rgba(123,44,191,0.4)]
                        hover:shadow-[0_6px_18px_rgba(123,44,191,0.6)]"
                      >
                        Log In <ArrowRight className="w-4 h-4 mb-0.5" />
                      </button>

                      {/*divider */}
                      <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-[#1e1535]" />
                        <span className="text-[#5a4a7a] text-xs">or continue with</span>
                        <div className="flex-1 h-px bg-[#1e1535]" />
                      </div>

                      {/* google button */}
                      <button
                        type="button"
                        onClick={() => document.querySelector("div[role='button']").click()}
                        className="w-full bg-[#13102a] border border-[#2a1a40] hover:border-[#9b59f5] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm flex items-center justify-center gap-3"
                      >
                        {/* svg copied from claude code */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Log in with Google
                      </button>



                      <div id="googleBtn" style={{ display: "none" }}>
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => console.log("Google login failed")}
                        />
                      </div>


                      <p className="text-center text-[#5a4a7a] text-xs mt-1">
                        Don't have an account?{' '}
                        <button type="button" onClick={() => setMode('signup')} className="text-[#9b59f5] hover:underline">
                          Sign up free
                        </button>
                      </p>

                    </form>
                  </div>
                )}

                {/* signup form*/}
                {mode === 'signup' && (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white font-bold text-2xl">Create Account</h3>
                    <p className="text-[#8a7aaa] text-sm mb-4">Start your focus journey for free</p>

                    <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">Full Name:</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your name"
                          value={signupForm.name}
                          onChange={handleSignupChange}
                          required
                          className="bg-[#13102a] border border-[#2a1a40] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">Email Address:</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={signupForm.email}
                          onChange={handleSignupChange}
                          required
                          className="bg-[#13102a] border border-[#2a1a40] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">Password:</label>
                        <input
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={signupForm.password}
                          onChange={handleSignupChange}
                          required
                          className="bg-[#13102a] border border-[#2a1a40] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200"
                        />
                      </div>

                      {/*signup button */}
                      <button
                        type="submit"
                        className="w-full text-white font-semibold py-3.5 mt-2 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2
                        bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0]
                        shadow-[0_4px_12px_rgba(123,44,191,0.4)]
                        hover:shadow-[0_6px_18px_rgba(123,44,191,0.6)]"
                      >
                        Create Account <ArrowRight className="w-4 h-4 mb-0.5" />
                      </button>

                      {/*divider */}
                      <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-[#1e1535]" />
                        <span className="text-[#5a4a7a] text-xs">or continue with</span>
                        <div className="flex-1 h-px bg-[#1e1535]" />
                      </div>

                      {/*google button */}
                      <button
                        type="button"
                        onClick={() => document.querySelector("div[role='button']").click()}
                        className="w-full bg-[#13102a] border border-[#2a1a40] hover:border-[#9b59f5] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm flex items-center justify-center gap-3"
                      >

                        {/* svg copied from claude code */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Sign up with Google
                      </button>

                      <div id="googleBtn" style={{ display: "none" }}>
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => console.log("Google login failed")}
                        />
                      </div>


                      <p className="text-center text-[#5a4a7a] text-xs mt-1">
                        Already have an account?{' '}
                        <button type="button" onClick={() => setMode('login')} className="text-[#9b59f5] hover:underline">
                          Log in
                        </button>
                      </p>

                    </form>
                  </div>
                )}

              </div>
            </div>
          </div >
        </section >

        {/* FOOTER */}
        < div className="py-18 pb-0 px-4" >
          <Footer />
        </div >

      </div >
    </>
  )
}