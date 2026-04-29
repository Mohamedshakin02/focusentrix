import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, User, Lock, CreditCard, Shield, Eye, EyeOff, ShieldCheck, Zap, RefreshCw, HeadphonesIcon, Package } from 'lucide-react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'


export default function Checkout() {
    const [showPassword, setShowPassword] = useState(false)

    //form state
    const [form, setForm] = useState({
        email: '',
        fullName: '',
        password: '',
        cardNumber: '',
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // format card number with spaces every 4 digits
    const handleCardInput = (e) => {
        const raw = e.target.value.replace(/\D/g, '').slice(0, 16)
        const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw
        setForm({ ...form, cardNumber: formatted })
    }

    // trust badge items below the form
    const trustBadges = [
        { icon: Shield, title: 'Secure Payments', desc: 'Encrypted and safe transactions.' },
        { icon: Zap, title: 'Instant Access', desc: 'Get started immediately after purchase.' },
        { icon: RefreshCw, title: 'Money Back', desc: '14-day satisfaction guarantee.' },
        { icon: HeadphonesIcon, title: '24/7 Support', desc: "We're here to help whenever you need." },
    ]

    return (
        <>

            <Navbar />

            <div className="bg-[#0a0a0f] min-h-screen text-white container mx-auto px-4 sm:px-6 lg:px-30">

                {/*HERO
            left has heading and  subtitle
            right has credit card and lock illustration (SVG)
            */}
                <section className="w-full px-4 pt-16 pb-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/*left */}
                        <div className="flex flex-col gap-4">
                            <h1 className="text-5xl lg:text-6xl font-black leading-tight">Checkout</h1>
                            <div className="w-12 h-1 bg-[#9b59f5] rounded-full" />

                            <p className="text-base">
                                <span className="text-[#9b59f5] font-semibold">Secure your Focus.</span>
                                <span className="text-white font-semibold"> Complete your purchase.</span>
                            </p>

                            <p className="text-[#8a7aaa] text-sm leading-relaxed max-w-md">
                                You're just one step away from unlocking a smarter,
                                distraction-free experience.
                            </p>
                        </div>

                        {/* right  illustrated card and lock graphic, svg from claude */}
                        <div className="flex items-center justify-center relative">
                            {/*glow */}
                            <div className="absolute w-72 h-72 rounded-full bg-[#4a1a90] opacity-25 blur-3xl" />
                            {/*dashed orbit */}
                            <div className="absolute w-64 h-64 rounded-full border border-dashed border-[#3d2060] opacity-40" />
                            {/*decorative dots */}
                            <div className="absolute top-4 right-16 w-2 h-2 rounded-full bg-[#9b59f5] opacity-60" />
                            <div className="absolute bottom-8 left-20 w-1.5 h-1.5 rounded-full bg-[#9b59f5] opacity-40" />
                            <div className="absolute top-16 left-8 w-1 h-1 rounded-full bg-[#9b59f5] opacity-30" />

                            {/*credit card and lock SVG illustration */}
                            <div className="relative z-10">
                                <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* card body */}
                                    <rect x="20" y="20" width="200" height="130" rx="16" fill="url(#cardGrad)" />
                                    {/* card shine */}
                                    <rect x="20" y="20" width="200" height="130" rx="16" fill="url(#cardShine)" opacity="0.3" />
                                    {/* card chip */}
                                    <rect x="44" y="54" width="36" height="28" rx="5" fill="#c084fc" opacity="0.6" />
                                    <line x1="44" y1="68" x2="80" y2="68" stroke="#7c3aed" strokeWidth="1.5" />
                                    <line x1="62" y1="54" x2="62" y2="82" stroke="#7c3aed" strokeWidth="1.5" />
                                    {/* card number dashes */}
                                    <rect x="44" y="100" width="24" height="8" rx="4" fill="#c084fc" opacity="0.5" />
                                    <rect x="78" y="100" width="24" height="8" rx="4" fill="#c084fc" opacity="0.5" />
                                    <rect x="112" y="100" width="24" height="8" rx="4" fill="#c084fc" opacity="0.5" />
                                    <rect x="146" y="100" width="24" height="8" rx="4" fill="#c084fc" opacity="0.5" />
                                    {/* wifi/tap symbol */}
                                    <path d="M198 58 Q208 48 218 58" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
                                    <path d="M193 63 Q208 43 223 63" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                                    <circle cx="208" cy="68" r="3" fill="#c084fc" opacity="0.7" />

                                    {/* lock body */}
                                    <rect x="170" y="110" width="80" height="70" rx="12" fill="url(#lockGrad)" />
                                    {/* lock shackle */}
                                    <path d="M190 110 L190 92 Q210 72 230 92 L230 110" stroke="#9b59f5" strokeWidth="10" strokeLinecap="round" fill="none" />
                                    {/* lock keyhole */}
                                    <circle cx="210" cy="142" r="10" fill="#1e1040" />
                                    <rect x="206" y="148" width="8" height="14" rx="3" fill="#1e1040" />
                                    {/* shield icon on lock */}
                                    <path d="M204 136 L210 132 L216 136 L216 142 Q210 146 204 142 Z" fill="#9b59f5" opacity="0.6" />

                                    <defs>
                                        <linearGradient id="cardGrad" x1="20" y1="20" x2="220" y2="150" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" stopColor="#3b0764" />
                                            <stop offset="100%" stopColor="#6d28d9" />
                                        </linearGradient>
                                        <linearGradient id="cardShine" x1="20" y1="20" x2="120" y2="80" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                                        </linearGradient>
                                        <linearGradient id="lockGrad" x1="170" y1="110" x2="250" y2="180" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" stopColor="#4c1d95" />
                                            <stop offset="100%" stopColor="#7c3aed" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CHECKOUT FORM CARD 
             billing info, security note, plan summary, google pay button
            */}
                <section className="w-full px-4 pb-12">
                    <div className="max-w-6xl mx-auto bg-[#0e0b1e] border border-[#1e1535] rounded-3xl px-6 sm:px-10 py-8 flex flex-col gap-6">

                        {/*form header */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-start justify-between mb-4 md:mb-0">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#1e1040] border border-[#3d2060] rounded-xl p-3">
                                    <User className="text-[#9b59f5] w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-white font-bold text-lg">Billing Information</h2>
                                    <p className="text-[#8a7aaa] text-sm">Enter your details to get started.</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center gap-1.5">
                                    <Lock className="text-[#9b59f5] w-3.5 h-3.5" />
                                    <span className="text-white text-sm font-semibold">Secure Checkout</span>
                                </div>
                                <span className="text-[#5a4a7a] text-xs">Your data is safe with us.</span>
                            </div>
                        </div>

                        {/*form fields */}
                        <div className="flex flex-col gap-7">

                            {/*email */}
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Email Address:</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a4a7a] w-4 h-4" />
                                    <input
                                        type="email" name="email" placeholder="youremail@example.com"
                                        value={form.email} onChange={handleChange}
                                        className="w-full bg-[#13102a] border border-[#2a1a40] rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200"
                                    />
                                </div>
                            </div>

                            {/*full name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Full Name:</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a4a7a] w-4 h-4" />
                                    <input
                                        type="text" name="fullName" placeholder="John Doe"
                                        value={form.fullName} onChange={handleChange}
                                        className="w-full bg-[#13102a] border border-[#2a1a40] rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200"
                                    />
                                </div>
                            </div>

                            {/*password */}
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Password:</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a4a7a] w-4 h-4" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password" placeholder="Create a strong password"
                                        value={form.password} onChange={handleChange}
                                        className="w-full bg-[#13102a] border border-[#2a1a40] rounded-xl pl-11 pr-12 py-3.5 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5a4a7a] hover:text-white transition-colors duration-200"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/*credit card number */}
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Credit Card Number:</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a4a7a] w-4 h-4" />
                                    <input
                                        type="text" name="cardNumber" placeholder="1234 5678 9012 3456"
                                        value={form.cardNumber} onChange={handleCardInput}
                                        className="w-full bg-[#13102a] border border-[#2a1a40] rounded-xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-[#3d2060] focus:outline-none focus:border-[#9b59f5] transition-colors duration-200 tracking-widest"
                                    />
                                </div>
                            </div>
                        </div>

                        {/*security note */}
                        <div className="bg-[#13102a] border border-[#2a1a40] rounded-2xl px-6 py-5 flex items-center gap-5">
                            <div className="w-12 h-12 rounded-full bg-[#1e1040] border border-[#3d2060] flex items-center justify-center flex-shrink-0">
                                <ShieldCheck className="text-[#9b59f5] w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Your security is our priority</p>
                                <p className="text-[#8a7aaa] text-sm leading-relaxed mt-0.5">
                                    We use industry-standard encryption to keep your information safe and secure.
                                </p>
                            </div>
                        </div>

                        {/*plan summary */}
                        <div className="bg-[#13102a] border border-[#2a1a40] rounded-2xl px-6 py-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#1e1040] border border-[#3d2060] flex items-center justify-center flex-shrink-0">
                                    <Package className="text-[#9b59f5] w-4 h-4" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-white font-bold text-sm">Focusentrix Pro Plan</p>
                                        <span className="bg-[#9b59f5] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Monthly</span>
                                    </div>
                                    <p className="text-[#8a7aaa] text-xs mt-0.5">Everything you need to stay focused and productive.</p>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-[#8a7aaa] text-xs">Total</p>
                                <p className="text-white font-black text-2xl">$12 <span className="text-[#8a7aaa] text-sm font-normal">/ month</span></p>
                            </div>
                        </div>

                        {/*divider */}
                        <div className="flex items-center gap-3 my-1">
                            <div className="flex-1 h-px bg-[#1e1535]" />
                            <span className="text-[#5a4a7a] text-xs">or continue with</span>
                            <div className="flex-1 h-px bg-[#1e1535]" />
                        </div>

                        {/*google Pay button, copied svg from claude */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-bold py-4 rounded-2xl transition-colors duration-200 text-base"
                        >
                            {/* google G logo SVG */}
                            <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            {/*google pay wordmark */}
                            <svg height="22" viewBox="0 0 41 17" xmlns="http://www.w3.org/2000/svg">
                                <text x="0" y="14" fontFamily="Arial" fontWeight="700" fontSize="14" fill="#000">Pay</text>
                            </svg>
                        </button>

                    </div>
                </section>

                {/* badges below the form*/}
                <section className="w-full px-4 sm:px-6 lg:px-20 pb-20">
                    <div className="max-w-6xl mx-auto bg-[#0e0b1e] border border-[#1e1535] rounded-2xl py-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
                            {trustBadges.map(({ icon: Icon, title, desc }, i) => (
                                <div key={i} className="flex flex-col items-center text-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#1e1040] border border-[#3d2060] flex items-center justify-center">
                                        <Icon className="text-[#9b59f5] w-4 h-4" />
                                    </div>
                                    <p className="text-white font-semibold text-sm">{title}</p>
                                    <p className="text-[#8a7aaa] text-xs leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* footer import from components*/}
                <div className='py-0 xl:pb-0 px-4'>
                    <Footer />
                </div>
            </div>


        </>
    )
}