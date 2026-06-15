"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Lock, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CareCard } from '@/components/ui/CareCard'

const STEPS = ['splash', 'welcome', 'verify', 'language', 'privacy', 'disclaimer']

const LANGUAGES = [
  { id: 'hi', native: 'हिंदी', english: 'Hindi' },
  { id: 'hin', native: 'Hinglish', english: 'Hindi + English', recommended: true },
  { id: 'ml', native: 'മലയാളം', english: 'Malayalam' },
  { id: 'en', native: 'English', english: 'English' }
]

export default function OnboardingPage() {
  const router = useRouter()
  const [stepIndex, setStepIndex] = useState(0)
  const [phone, setPhone] = useState('')
  const [language, setLanguage] = useState('hin')

  useEffect(() => {
    if (stepIndex === 0) {
      const timer = setTimeout(() => setStepIndex(1), 2500)
      return () => clearTimeout(timer)
    }
  }, [stepIndex])

  const next = () => {
    if (stepIndex < STEPS.length - 1) setStepIndex(s => s + 1)
    else finish()
  }

  const finish = () => {
    localStorage.setItem('nijo_onboarded', 'true')
    router.replace('/home')
  }

  const step = STEPS[stepIndex]

  const LogoIcon = ({ size = 32 }: { size?: number }) => (
    <div className="bg-gradient-to-tr from-[var(--primary-start)] to-[var(--primary-end)] rounded-[22%] flex items-center justify-center shadow-lg shadow-orange-500/30" style={{ width: size, height: size }}>
      <svg width="60%" height="60%" viewBox="450 160 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="#fff" strokeWidth="12" strokeLinejoin="round">
          <path d="M600 215 l40 40 -10 70 -55 0 0 -40 35 0"></path>
          <path d="M515 310 l70 35 130 0 40 25 -40 25 -130 0 -70 35"></path>
          <path d="M600 405 l-40 -40 10 -70 55 0 0 40 -35 0"></path>
        </g>
      </svg>
    </div>
  )

  const StatusBar = () => (
    <div className="w-full flex justify-between items-center px-6 pt-4 pb-2 absolute top-0 left-0">
      <span className="font-semibold text-sm">9:41</span>
      <div className="flex gap-1.5 items-center">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><path d="M1 10.5H3.5V7.5H1V10.5ZM6 10.5H8.5V5.5H6V10.5ZM11 10.5H13.5V3.5H11V10.5ZM16 10.5H18.5V0.5H16V10.5Z" fill="black"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 2.5C5.5 2.5 3.2 3.5 1.5 5L8 11.5L14.5 5C12.8 3.5 10.5 2.5 8 2.5Z" fill="black"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="black"/><rect x="2" y="2" width="18" height="8" rx="2" fill="black"/><path d="M23 4V8C24.1046 8 25 7.1046 25 6C25 4.89543 24.1046 4 23 4Z" fill="black"/></svg>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-2)] md:bg-[#FFF0E5]">
      <div className="w-full max-w-[360px] h-[100dvh] md:h-[740px] md:rounded-[40px] md:shadow-2xl md:border border-[var(--border-color)] overflow-hidden relative flex flex-col bg-[var(--surface-2)]">
        <AnimatePresence mode="wait">
        
        {step === 'splash' && (
          <motion.div key="splash"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full h-full bg-[#FCFAF8] flex flex-col items-center justify-center relative"
          >
            <div className="mb-6 relative flex items-center justify-center">
              <div className="w-[140px] h-[140px] bg-gradient-to-br from-[#FF4500] to-[#FFA500] rounded-[40px] shadow-[0_24px_50px_rgba(255,149,0,0.35)] flex items-center justify-center">
                <svg width="60%" height="60%" viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinejoin="miter" strokeLinecap="square">
                  <path d="M 50 15 L 50 45 L 85 45 L 75 55 L 15 55 L 25 45 Z" />
                  <path d="M 50 85 L 50 55 L 15 55 L 25 45 L 85 45 L 75 55 Z" />
                  <path d="M 15 45 L 85 45 M 15 55 L 85 55 M 50 15 L 50 85" strokeWidth="5" />
                </svg>
              </div>
            </div>
            <h1 className="font-sans font-extrabold text-[44px] tracking-tight text-[#48807C] mb-0 mt-4">Nijo</h1>
            <p className="text-[#A3A3A3] font-medium text-[17px] tracking-wide mt-1">your quiet companion</p>
          </motion.div>
        )}

        {step === 'welcome' && (
          <motion.div key="welcome"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full h-full bg-[#FCFAF8] p-8 pt-20 flex flex-col text-left relative md:rounded-[40px]"
          >
            <div className="mb-6 mt-2 relative">
              <div className="w-[72px] h-[72px] bg-gradient-to-br from-[#FF4500] to-[#FFA500] rounded-[22px] shadow-[0_12px_24px_rgba(255,149,0,0.3)] flex items-center justify-center">
                <svg width="60%" height="60%" viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinejoin="miter" strokeLinecap="square">
                  <path d="M 50 15 L 50 45 L 85 45 L 75 55 L 15 55 L 25 45 Z" />
                  <path d="M 50 85 L 50 55 L 15 55 L 25 45 L 85 45 L 75 55 Z" />
                  <path d="M 15 45 L 85 45 M 15 55 L 85 55 M 50 15 L 50 85" strokeWidth="6" />
                </svg>
              </div>
            </div>
            
            <h2 className="font-sans font-bold text-[34px] tracking-tight leading-tight text-[#1C1A17] mb-3">Hi, I'm Nijo.</h2>
            <p className="text-[#847F78] text-[18px] leading-[1.4] mb-auto font-normal pr-4">
              A calm space to talk, reflect,<br/>and feel a little lighter —<br/>whenever you need it.
            </p>

            <div className="flex items-center w-full mb-5 mt-8 h-[60px] bg-white rounded-2xl border border-[#EBE8E3] relative px-5">
              <span className="font-medium text-[#1C1A17] text-[16px]">+91</span>
              <div className="w-px h-6 bg-[#EBE8E3] mx-4"></div>
              <input 
                className="w-full h-full bg-transparent border-none focus:outline-none font-normal text-[16px] placeholder:text-[#A39E98] text-[#1C1A17]" 
                placeholder="Phone number" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
              />
            </div>

            <button className="w-full h-[60px] text-[17px] mb-6 rounded-full font-semibold bg-[#ED752A] text-white shadow-[0_4px_14px_rgba(237,117,42,0.3)] transition-transform hover:scale-[1.02] active:scale-95" onClick={next}>
              Continue
            </button>
            
            <div className="flex items-center w-full mb-6 px-2">
              <div className="flex-1 h-px bg-[#EBE8E3]"></div>
              <span className="text-[14px] text-[#A39E98] px-4 font-normal">or</span>
              <div className="flex-1 h-px bg-[#EBE8E3]"></div>
            </div>
            
            <button className="w-full h-[60px] text-[17px] bg-white rounded-full font-semibold border border-[#EBE8E3] text-[#1C1A17] mb-6 transition-transform hover:scale-[1.02] active:scale-95 hover:bg-gray-50" onClick={next}>
              Continue with email
            </button>
          </motion.div>
        )}

        {step === 'verify' && (
          <motion.div key="verify"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full h-full bg-[#FCFAF8] p-8 pt-20 flex flex-col text-left relative md:rounded-[40px]"
          >
            <div className="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center border border-[#EBE8E3] cursor-pointer mb-8 text-[#1C1A17]" onClick={() => setStepIndex(1)}>
              <ChevronLeft size={20} strokeWidth={2} className="-ml-0.5" />
            </div>

            <h2 className="font-sans font-bold text-[34px] tracking-tight leading-tight text-[#1C1A17] mb-2">Enter the code</h2>
            <p className="text-[#847F78] text-[18px] mb-0.5 font-normal">We sent a 6-digit code to</p>
            <p className="font-semibold text-[#1C1A17] text-[18px] tracking-wide mb-10">+91 98765 •• 210</p>
            
            <div className="flex gap-[8px] justify-between mb-8">
              {['4', '9', '2', '', '', ''].map((val, i) => {
                const isActive = i === 0;
                return (
                  <div key={i} className={`w-[44px] h-[64px] rounded-full flex flex-col items-center justify-center font-bold text-[26px] text-[#1C1A17] bg-white border-[1.5px] ${isActive ? 'border-[#ED752A]' : 'border-[#EBE8E3]'}`}>
                    {val}
                    {i === 3 && <div className="w-px h-6 bg-[#A39E98] animate-pulse" />}
                  </div>
                )
              })}
            </div>

            <p className="text-[16px] text-[#847F78] mb-auto font-normal">
              Didn't get it? <span className="text-[#ED752A] cursor-pointer font-medium">Resend in 0:24</span>
            </p>

            <button className="w-full h-[60px] text-[17px] mb-6 rounded-full font-semibold bg-[#ED752A] text-white shadow-[0_4px_14px_rgba(237,117,42,0.3)] mt-auto transition-transform hover:scale-[1.02] active:scale-95" onClick={next}>
              Verify
            </button>
          </motion.div>
        )}

        {step === 'language' && (
          <motion.div key="language"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-[360px] h-[740px] bg-[var(--surface-2)] p-8 pt-24 rounded-[40px] shadow-sm flex flex-col text-left relative"
          >
            <StatusBar />
            <h2 className="font-sans font-bold text-[32px] leading-tight text-[var(--text-primary)] mb-3 mt-4">Choose your<br/>language</h2>
            <p className="text-[var(--text-secondary)] text-[16px] mb-10">You can change this anytime.</p>

            <div className="grid grid-cols-2 gap-[14px] mb-auto">
              {LANGUAGES.map((lang) => {
                const isActive = language === lang.id;
                return (
                  <div key={lang.id} onClick={() => setLanguage(lang.id)} 
                    className={`relative cursor-pointer p-5 rounded-2xl flex flex-col items-center justify-center transition-all bg-white
                      ${isActive ? 'border-[1.5px] border-[var(--primary-start)] bg-[var(--surface-2)] shadow-sm' : 'border border-transparent shadow-sm hover:border-[var(--border-color)]'}
                    `}
                  >
                    {isActive && (
                      <div className="absolute top-2 right-2 w-[18px] h-[18px] bg-[var(--primary-start)] rounded-full flex items-center justify-center text-white">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                    <span className={`text-[22px] font-bold mb-1 tracking-tight ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'}`}>{lang.native}</span>
                    <span className={`text-[13px] font-medium ${isActive ? 'text-[var(--primary-start)]' : 'text-[var(--text-secondary)]'}`}>{lang.english}</span>
                  </div>
                )
              })}
            </div>

            <Button className="w-full h-[56px] text-[16px] mb-4 rounded-full font-semibold shadow-md shadow-orange-500/20" onClick={next}>Continue</Button>
          </motion.div>
        )}

        {step === 'privacy' && (
          <motion.div key="privacy"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full h-full bg-[#FCFAF8] p-8 pt-20 flex flex-col text-left relative md:rounded-[40px]"
          >
            <div className="w-[72px] h-[72px] bg-[#FDF0E5] rounded-[22px] flex items-center justify-center mb-6 mt-4">
              <Lock className="text-[#ED752A] w-8 h-8" strokeWidth={2.5} />
            </div>
            <h2 className="font-sans font-bold text-[34px] tracking-tight leading-tight text-[#1C1A17] mb-4">Your privacy,<br/>protected</h2>
            <p className="text-[#847F78] text-[18px] mb-8 leading-[1.4] pr-2">
              We protect your data under<br/>India's <span className="font-bold text-[#1C1A17]">DPDP rules</span>.
            </p>

            <div className="flex flex-col gap-5 mb-8">
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-[#E5F2F0] text-[#48807C] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} strokeWidth={3} />
                </div>
                <p className="text-[17px] text-[#57534E] leading-[1.3] pr-2">Your chats & journals are private to you</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-[#E5F2F0] text-[#48807C] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} strokeWidth={3} />
                </div>
                <p className="text-[17px] text-[#57534E] leading-[1.3] pr-2">Export or delete your data anytime</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-[#E5F2F0] text-[#48807C] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} strokeWidth={3} />
                </div>
                <p className="text-[17px] text-[#57534E] leading-[1.3] pr-2">We never sell your information</p>
              </div>
            </div>

            <div className="mb-auto mt-2">
              <span 
                onClick={() => window.open('/privacy-policy', '_blank')}
                className="text-[16px] text-[#ED752A] font-medium cursor-pointer hover:underline transition-all"
              >
                Read the full privacy policy ›
              </span>
            </div>

            <button className="w-full h-[60px] text-[17px] mb-6 rounded-full font-semibold bg-[#ED752A] text-white shadow-[0_4px_14px_rgba(237,117,42,0.3)] mt-auto transition-transform hover:scale-[1.02] active:scale-95" onClick={next}>
              I agree
            </button>
          </motion.div>
        )}

        {step === 'disclaimer' && (
          <motion.div key="disclaimer"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full h-full bg-[#FCFAF8] p-8 pt-20 flex flex-col text-left relative md:rounded-[40px]"
          >
            <h2 className="font-sans font-bold text-[34px] tracking-tight leading-[1.15] text-[#1C1A17] mb-4 mt-6">Nijo is a companion,<br/>not a clinic</h2>
            <p className="text-[#847F78] text-[18px] mb-10 leading-[1.4] pr-2">
              Nijo is here to listen and help you<br/>reflect. It isn't a doctor or<br/>therapist, and can't give medical<br/>advice.
            </p>

            <div className="w-full bg-[#FCF0EE] border border-[#F6DFDC] rounded-[28px] p-6 mb-auto flex flex-col shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#C85B4D] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <h3 className="text-[#9C3B31] font-bold text-[18px] tracking-tight">If you're in crisis</h3>
              </div>
              <p className="text-[#A56259] text-[17px] leading-[1.4] mb-5">
                You deserve real support right<br/>now. Help is available.
              </p>
              <button className="w-full h-[52px] rounded-full bg-[#C85B4D] text-white font-semibold text-[17px] transition-transform hover:scale-[1.02] active:scale-95 shadow-sm">
                Get help
              </button>
            </div>

            <button className="w-full h-[60px] text-[17px] mb-6 rounded-full font-semibold bg-[#ED752A] text-white shadow-[0_4px_14px_rgba(237,117,42,0.3)] mt-auto transition-transform hover:scale-[1.02] active:scale-95" onClick={next}>
              I understand — continue
            </button>
          </motion.div>
        )}

      </AnimatePresence>
      </div>
    </div>
  )
}
