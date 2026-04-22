import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react'
import Footer from '../components/Footer'


// FAQItem
// FAQS are put in a single row. clicking toggles the answer open/closed.
function FAQItem({ number, question, answer, isOpen, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer rounded-2xl border px-6 py-5 transition-colors duration-200
        ${isOpen
          ? 'bg-[#0e0b1e] border-[#9b59f5]'
          : 'bg-[#0e0b1e] border-[#1e1535] hover:border-[#3d2060]'
        }`}
    >
      <div className="flex items-center justify-between gap-4">
        {/* number of question and question */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-[#1e1040] flex items-center justify-center flex-shrink-0">
            <span className="text-[#9b59f5] text-xs font-bold">{number}</span>
          </div>
          <span className="text-white font-semibold text-base">{question}</span>
        </div>

        {/* chevron arrow toggle */}
        <div className="w-8 h-8 rounded-full border border-[#2a1a40] flex items-center justify-center flex-shrink-0">
          {isOpen
            ? <ChevronUp className="text-[#9b59f5] w-4 h-4" />
            : <ChevronDown className="text-[#8a7aaa] w-4 h-4" />
          }
        </div>
      </div>

      {/* answer
      only shown when open */}
      {isOpen && (
        <p className="text-[#8a7aaa] text-sm leading-relaxed mt-4 ml-12">
          {answer}
        </p>
      )}
    </div>
  )
}



//FAQs data. Add questions here as needed if they come up
export default function FAQs() {
  // this tracks which FAQ item is currently open. null = all closed
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'What is Focusentrix?',
      answer: 'Focusentrix is a smart system that helps you track and improve your focus using real-time detection through your camera.',
    },
    {
      question: 'How does the focus detection work?',
      answer: 'Focusentrix uses your device camera to analyse your face and gaze in real time. When it detects you are distracted or looking away, it instantly sends you an alert to bring you back on track.',
    },
    {
      question: 'Do I need to install anything?',
      answer: 'No installation is required. Focusentrix runs entirely in your browser. Just sign up, allow camera access, and start your first session.',
    },
    {
      question: 'Will it work in various lighting conditions?',
      answer: 'Yes. Focusentrix is designed to work in a range of lighting environments. For best results, ensure your face is reasonably well lit from the front.',
    },
    {
      question: 'What happens if I look away?',
      answer: 'You will receive an instant audio and visual alert to snap you back into focus. The distraction is also logged so you can review your patterns later.',
    },
    {
      question: 'Does it record my video?',
      answer: 'No. Focusentrix never records, stores, or transmits your video. All processing happens locally on your device in real time.',
    },
    {
      question: 'Is it free to use?',
      answer: 'Yes, Focusentrix offers a free plan with core features. Upgrade to Pro or Team for unlimited sessions, detailed analytics, and more.',
    },
    {
      question: 'Why should I use Focusentrix?',
      answer: 'Focusentrix helps you build deep work habits by making distraction visible. With real-time alerts, streak tracking, and focus analytics, you will work smarter and achieve more every session.',
    },
  ]

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white">

      {/* HERO section
          full width heading with label, title and paragraph text.
      ──────────────────────────────────────────────── */}
      <section className="w-full px-30 pt-20 pb-12">
        <div className="inline-block px-1 py-1 mb-1">
          <span className="text-[#9b59f5] text-base font-semibold tracking-widest uppercase">FAQ's</span>
        </div>
        <h1 className="text-6xl font-black leading-tight mb-3">
          Got <span className="text-[#9b59f5]">Questions?</span>
        </h1>
        <p className="text-white font-semibold text-lg mb-2">Everything You Need to Know About Focusentrix</p>
        <p className="text-[#8a7aaa] text-base leading-relaxed max-w-lg">
          Clear answers to help you understand how our system works
          and improves your focus in real time.
        </p>
      </section>

      {/* FAQs rows stlying
          stretches across the page.
          adjust width here
      */}
      <section className="w-full px-30 pb-10">
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              number={i + 1}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* cards below FAQs side by side
          "privacy" card on the left, "still need help" on the right.
        */}
      <section className="w-full px-30 pb-24">
        <div className="grid grid-cols-2 gap-6">

          {/* privacy card */}
          <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl p-8 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="bg-[#1e1040] rounded-xl p-3">
                <ShieldCheck className="text-[#9b59f5] w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-lg">Your Privacy Matters</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {[
                'No video is recorded or stored',
                'All processing happens in real-time',
                'Your data never leaves your device',
                '100% private and secure',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 pl-3 text-[#8a7aaa] text-sm">
                  <div className="w-5 h-5 rounded-full border border-[#9b59f5] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#9b59f5] text-[9px]">✓</span>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* still need help card */}
          <div className="bg-[#0e0b1e] border border-[#1e1535] rounded-2xl p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold text-xl">Still need help?</h3>
              <p className="text-[#8a7aaa] text-sm leading-relaxed">
                Can't find the answer you're looking for? We're here to help.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#9b59f5] hover:bg-[#7c3de0] text-white font-semibold px-5 py-3 rounded-xl transition-colors duration-200 text-sm w-fit mt-6"
            >
              Contact Support <span>›</span>
            </Link>
          </div>

        </div>
      </section>

      {/* footer */}
      <Footer />

    </div>
  )
}