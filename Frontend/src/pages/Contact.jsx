import { useState } from 'react'
import { Mail } from 'lucide-react'
import Footer from '../components/Footer'
import logo from '../assets/focusentrixclear.png'


export default function Contact() {
  // form state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // will handle form submission logic here
    console.log(form)
  }

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white">

      {/* contact section
        large card with two columns
        left has a heading, companys email, and socialmedia links
        contact form
      */}
      <section className="w-full px-16 pt-20 pb-24">
        <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-3xl px-16 py-14 relative overflow-hidden">

          {/* logo in the background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
            <div className="relative flex items-center justify-center">
                <div className="absolute w-100 h-100 rounded-full bg-[#4a1a90] opacity-40 blur-3xl" />
                <div className="absolute w-100 h-100 rounded-full border border-dashed border-[#3d2060]" />
                <img src={logo} alt="" className="w-100 h-100 object-contain relative z-10" />
            </div>
            </div>
          <div className="relative grid grid-cols-2 gap-20 items-start">

            {/* left  heading,  contact info , and social*/}
            <div className="flex flex-col gap-8 pt-4">

              {/* label heading*/}
              <div className="flex flex-col gap-3">
                <span className="text-[#9b59f5] text-xs font-semibold tracking-widest uppercase">Get In Touch</span>
                <h1 className="text-4xl font-black leading-tight">Let's Talk Focus</h1>
                <p className="text-[#8a7aaa] text-sm leading-relaxed max-w-sm">
                  Have questions, feedback, or want to partner with us? We'd love to hear from you.
                  Our team responds within 24 hours.
                </p>
              </div>

              {/* compnay email*/}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg border border-[#2a1a40] flex items-center justify-center flex-shrink-0">
                  <Mail className="text-[#9b59f5] w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-white text-sm">focusentrixcreativestudio@gmail.com</p>
                </div>
              </div>

              {/* follow us socialmedia icons*/}
              <div className="flex flex-col gap-3">
                <p className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">Follow Us</p>
                <div className="flex items-center gap-3">
                  {/* linkedin*/}
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-[#2a1a40] hover:border-[#9b59f5] flex items-center justify-center transition-colors duration-200">
                    <svg className="text-white w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  {/* youtube*/}
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-[#2a1a40] hover:border-[#9b59f5] flex items-center justify-center transition-colors duration-200">
                    <svg className="text-white w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 7s-.3-2-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.6 3 12 3 12 3s-4.6 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.6 21.7 12 21.7 12 21.7s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.7 1.2-2.7 1.2-2.7s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5v-7l8.1 3.5-8.1 3.5z"/>
                    </svg>
                  </a>
                  {/* instagram*/}
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-[#2a1a40] hover:border-[#9b59f5] flex items-center justify-center transition-colors duration-200">
                    <svg className="text-white w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* right contact form*/}
            <div className="bg-[#13102a] border border-[#2a1a40] rounded-2xl p-8">
              <h2 className="text-white font-bold text-lg mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* user first and last name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={handleChange}
                      className="bg-[#0e0b1e] border border-[#2a1a40] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={handleChange}
                      className="bg-[#0e0b1e] border border-[#2a1a40] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* users email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-[#0e0b1e] border border-[#2a1a40] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200"
                  />
                </div>

                {/* subject of email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="bg-[#0e0b1e] border border-[#2a1a40] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200"
                  />
                </div>

                {/* users message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#5a4a7a] text-xs font-semibold uppercase tracking-widest">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us how we help..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="bg-[#0e0b1e] border border-[#2a1a40] rounded-xl px-4 py-3 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200 resize-none"
                  />
                </div>

                {/* submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#9b59f5] hover:bg-[#7c3de0] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm flex items-center justify-center gap-2 mt-2"
                >
                  Send Message <span>→</span>
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />

    </div>
  )
}