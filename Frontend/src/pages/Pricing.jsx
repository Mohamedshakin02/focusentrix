import { useState } from 'react'
import Footer from '../components/Footer'

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
          ? ' text-white bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0] hover:cursor-pointer hover:shadow-[0_6px_18px_rgba(123,44,191,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]'
          : 'bg-transparent border border-[#3d2060] text-white hover:border-[#9b59f5] hover:cursor-pointer'
        }`}>
        {cta}
      </button>
    </div>
  )
}
export default function Pricing() {

  // controls the pricing whether it shows monthly or yearly rate
  const [isYearly, setIsYearly] = useState(false)

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
      plan: 'Enterprise',
      monthlyPrice: '$29',
      yearlyPrice: '$23',
      period: 'per month',
      features: ['Everything in Pro', 'Up to 10 members', 'Team dashboard', 'Admin controls', 'Priority support', 'Custom reports'],
      cta: 'Contact sales',
      highlighted: false,
    },
  ]

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-white container mx-auto px-4 sm:px-6 lg:px-30">

      {/* PRICING  
        Three tiers of pricing that can be toggled monthly/yearly
        Toggle state is managed by the isYearly useState hook*/}
      <section className="relative border-t border-[#1a1030]">

        {/* glowing effect */}
        <div className="
                        pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
                        w-[50vw] h-[50vw]
                        lg:w-[300px] lg:h-[300px]
                        bg-[#9b59f5] opacity-20 lg:opacity-15 blur-[90px] sm:blur-[110px] lg:blur-[120px]
        " />

        <div className="w-full px-4 pt-12 pb-0">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-2">Pricing</h2>
            <p className="text-[#9b59f5] text-lg font-semibold mb-6">Simple, transparent plans</p>

            <div className="w-12 h-1 bg-[#9b59f5] rounded-full mt-3 mb-7 mx-auto" />

            {/* toggle */}
            <div className="inline-flex items-center gap-3 bg-[#13102a] border border-[#2a1a40] rounded-full px-5 py-2">
              <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-white' : 'text-[#8a7aaa]'}`}>
                Monthly
              </span>

              {/* Clicking flips isYearly*/}
              <div
                onClick={() => setIsYearly(!isYearly)}
                className="w-11 h-6 bg-gradient-to-b from-[#7A34F0] via-[#6229C1] to-[#501CA0]
                    shadow-[0_4px_12px_rgba(123,44,191,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)]
                    rounded-full relative cursor-pointer transition-all duration-300"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <PricingCard key={i} {...p} isYearly={isYearly} />
            ))}
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