"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Lock, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CareCard } from '@/components/ui/CareCard'
import { signIn } from 'next-auth/react'
import { auth } from '@/lib/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth'

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
  const [email, setEmail] = useState('')
  const [loginType, setLoginType] = useState<'phone'|'email'>('phone')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState('hin')
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)

  useEffect(() => {
    if (stepIndex === 0) {
      const timer = setTimeout(() => setStepIndex(1), 2500)
      return () => clearTimeout(timer)
    }
  }, [stepIndex])

  // Initialize RecaptchaVerifier once when the component mounts on client side
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible'
      })
    }
  }, [])

  const next = () => {
    if (stepIndex < STEPS.length - 1) setStepIndex(s => s + 1)
    else finish()
  }

  const handleSendOtp = async () => {
    const identifier = loginType === 'phone' ? phone : email
    if (!identifier) return

    setIsLoading(true)
    try {
      if (loginType === 'phone') {
        const phoneNumber = `+91${phone}` // assuming Indian number, update as needed
        const appVerifier = (window as any).recaptchaVerifier;
        const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        setConfirmationResult(result);
        next();
      } else {
        // Handle Email Link Authentication here in the future if needed
        alert("Firebase Email Auth is not fully configured in this snippet. Please use Phone Auth.");
      }
    } catch (e: any) {
      console.error(e);
      alert('Error sending OTP: ' + e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    const otpString = otp.join('')
    if (otpString.length < 6) return // Require 6 digit OTP
    
    setIsLoading(true)
    
    try {
      if (loginType === 'phone' && confirmationResult) {
        // Verify OTP with Firebase
        const result = await confirmationResult.confirm(otpString);
        // Get the Firebase ID token
        const idToken = await result.user.getIdToken();
        
        // Pass the ID token to our NextAuth backend
        const nextAuthResult = await signIn('credentials', {
          firebaseToken: idToken,
          redirect: false
        })
        
        if (nextAuthResult?.error) {
          alert('Failed to authenticate with server. Please try again.')
        } else {
          next()
        }
      } else {
        alert("Verification method not supported yet.");
      }
    } catch (e: any) {
      console.error(e);
      alert('Invalid OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const finish = () => {
    localStorage.setItem('nijo_onboarded', 'true')
    router.replace('/home')
  }

  const step = STEPS[stepIndex]

  const StatusBar = () => (
    <div className="w-full flex justify-between items-center px-6 pt-4 pb-2 absolute top-0 left-0">
      <span className="font-semibold text-sm">9:41</span>
      <div className="flex gap-1.5 items-center">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><path d="M1 10.5H3.5V7.5H1V10.5ZM6 10.5H8.5V5.5H6V10.5ZM11 10.5H13.5V3.5H11V10.5ZM16 10.5H18.5V0.5H16V10.5Z" fill="currentColor"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 2.5C5.5 2.5 3.2 3.5 1.5 5L8 11.5L14.5 5C12.8 3.5 10.5 2.5 8 2.5Z" fill="currentColor"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor"/><rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor"/><path d="M23 4V8C24.1046 8 25 7.1046 25 6C25 4.89543 24.1046 4 23 4Z" fill="currentColor"/></svg>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] transition-colors duration-300">
      <div className="w-full h-[100dvh] overflow-hidden relative flex flex-col bg-[var(--surface-1)]">
        <AnimatePresence mode="wait">
        
        {step === 'splash' && (
          <motion.div key="splash"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full h-full bg-[var(--surface-1)] flex flex-col items-center justify-center relative"
          >
            <div className="mb-6 relative flex items-center justify-center">
              <div className="w-[140px] h-[140px] brand-gradient-bg rounded-[40px] shadow-lg flex items-center justify-center">
                <svg width="60%" height="60%" viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M 20 50 L 80 50 M 50 25 L 50 75 M 50 25 L 30 50 M 50 75 L 70 50" />
                </svg>
              </div>
            </div>
            <h1 className="font-sans font-extrabold text-[44px] tracking-tight text-[#48807C] dark:text-[#5BA39E] mb-0 mt-4">Nijo</h1>
            <p className="text-[#A3A3A3] font-medium text-[17px] tracking-wide mt-1">your quiet companion</p>
          </motion.div>
        )}

        {step === 'welcome' && (
          <motion.div key="welcome"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full h-full bg-[var(--surface-1)] p-8 pt-20 flex flex-col text-left relative"
          >
            <div className="mb-6 mt-2 relative">
              <div className="w-[72px] h-[72px] brand-gradient-bg rounded-[22px] shadow-md flex items-center justify-center">
                <svg width="60%" height="60%" viewBox="0 0 100 100" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M 20 50 L 80 50 M 50 25 L 50 75 M 50 25 L 30 50 M 50 75 L 70 50" />
                </svg>
              </div>
            </div>
            
            <h2 className="font-sans font-bold text-[34px] tracking-tight leading-tight text-[var(--text-primary)] mb-3">Hi, I&apos;m Nijo.</h2>
            <p className="text-[var(--text-secondary)] text-[18px] leading-[1.4] mb-auto font-normal pr-4">
              A calm space to talk, reflect,<br/>and feel a little lighter —<br/>whenever you need it.
            </p>

            {/* Firebase Recaptcha Container */}
            <div id="recaptcha-container"></div>

            {loginType === 'phone' ? (
              <div className="flex items-center w-full mb-5 mt-8 h-[60px] bg-[var(--surface-2)] rounded-2xl border border-[var(--border-color)] relative px-5 focus-within:border-[var(--primary-start)] focus-within:ring-1 focus-within:ring-[var(--primary-start)] transition-all">
                <span className="font-medium text-[var(--text-primary)] text-[16px]">+91</span>
                <div className="w-px h-6 bg-[var(--border-color)] mx-4"></div>
                <input 
                  className="w-full h-full bg-transparent border-none focus:outline-none font-normal text-[16px] placeholder:text-[var(--text-secondary)] text-[var(--text-primary)]" 
                  placeholder="Phone number" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                />
              </div>
            ) : (
              <div className="flex items-center w-full mb-5 mt-8 h-[60px] bg-[var(--surface-2)] rounded-2xl border border-[var(--border-color)] relative px-5 focus-within:border-[var(--primary-start)] focus-within:ring-1 focus-within:ring-[var(--primary-start)] transition-all">
                <input 
                  className="w-full h-full bg-transparent border-none focus:outline-none font-normal text-[16px] placeholder:text-[var(--text-secondary)] text-[var(--text-primary)]" 
                  placeholder="Email address" 
                  type="email"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
            )}

            <button disabled={isLoading} className="w-full h-[60px] text-[17px] mb-6 rounded-full font-semibold brand-gradient-bg shadow-md transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50" onClick={handleSendOtp}>
              {isLoading ? 'Sending...' : 'Continue'}
            </button>
            
            <div className="flex items-center w-full mb-6 px-2">
              <div className="flex-1 h-px bg-[var(--border-color)]"></div>
              <span className="text-[14px] text-[var(--text-secondary)] px-4 font-normal">or</span>
              <div className="flex-1 h-px bg-[var(--border-color)]"></div>
            </div>
            
            <button className="w-full h-[60px] text-[17px] bg-[var(--surface-1)] rounded-full font-semibold border border-[var(--border-color)] text-[var(--text-primary)] mb-3 transition-all hover:scale-[1.02] active:scale-95 hover:bg-[var(--surface-2)]" onClick={() => setLoginType(loginType === 'phone' ? 'email' : 'phone')}>
              Continue with {loginType === 'phone' ? 'email' : 'phone'}
            </button>

            <button 
              className="w-full h-[60px] text-[17px] bg-[var(--surface-1)] rounded-full font-semibold border border-[var(--border-color)] text-[var(--text-primary)] mb-6 transition-all hover:scale-[1.02] active:scale-95 hover:bg-[var(--surface-2)] flex items-center justify-center gap-3" 
              onClick={() => signIn('google')}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
              </svg>
              Continue with Google
            </button>
          </motion.div>
        )}

        {step === 'verify' && (
          <motion.div key="verify"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full h-full bg-[var(--surface-1)] p-8 pt-20 flex flex-col text-left relative"
          >
            <div className="w-[44px] h-[44px] bg-[var(--surface-2)] rounded-full flex items-center justify-center border border-[var(--border-color)] cursor-pointer mb-8 text-[var(--text-primary)] hover:bg-[var(--border-color)] transition-colors" onClick={() => setStepIndex(1)}>
              <ChevronLeft size={20} strokeWidth={2} className="-ml-0.5" />
            </div>

            <h2 className="font-sans font-bold text-[34px] tracking-tight leading-tight text-[var(--text-primary)] mb-2">Enter the code</h2>
            <p className="text-[var(--text-secondary)] text-[18px] mb-0.5 font-normal">We sent a code to</p>
            <p className="font-semibold text-[var(--text-primary)] text-[18px] tracking-wide mb-10">{loginType === 'phone' ? `+91 ${phone}` : email}</p>
            
            <div className="flex gap-[8px] justify-between mb-8">
              {otp.map((val, i) => {
                const isActive = i === otp.findIndex(v => v === '') && !val;
                return (
                  <input key={i} 
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={val}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      if (!value) {
                        const newOtp = [...otp];
                        newOtp[i] = '';
                        setOtp(newOtp);
                        return;
                      }
                      const newOtp = [...otp];
                      newOtp[i] = value[value.length - 1];
                      setOtp(newOtp);
                      if (i < 5) {
                        document.getElementById(`otp-${i+1}`)?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !val && i > 0) {
                        document.getElementById(`otp-${i-1}`)?.focus();
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
                      if (pastedData) {
                        const newOtp = [...otp];
                        for (let j = 0; j < pastedData.length; j++) {
                          if (i + j < 6) newOtp[i + j] = pastedData[j];
                        }
                        setOtp(newOtp);
                        const nextFocusIndex = Math.min(i + pastedData.length, 5);
                        document.getElementById(`otp-${nextFocusIndex}`)?.focus();
                      }
                    }}
                    className={`w-[44px] h-[64px] rounded-[16px] flex flex-col items-center justify-center font-bold text-[26px] text-center text-[var(--text-primary)] bg-[var(--surface-2)] border-[1.5px] focus:outline-none focus:border-[var(--primary-start)] transition-colors shadow-sm ${isActive ? 'border-[var(--primary-start)]' : 'border-[var(--border-color)]'}`}
                  />
                )
              })}
            </div>

            <p className="text-[16px] text-[var(--text-secondary)] mb-auto font-normal">
              Didn&apos;t get it? <span className="text-[var(--primary-start)] cursor-pointer font-medium hover:underline" onClick={handleSendOtp}>Resend code</span>
            </p>

            <button disabled={isLoading} className="w-full h-[60px] text-[17px] mb-6 rounded-full font-semibold brand-gradient-bg shadow-md mt-auto transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50" onClick={handleVerifyOtp}>
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>
          </motion.div>
        )}

        {step === 'language' && (
          <motion.div key="language"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full h-[740px] bg-[var(--surface-1)] p-8 pt-24 flex flex-col text-left relative"
          >
            <StatusBar />
            <h2 className="font-sans font-bold text-[32px] leading-tight text-[var(--text-primary)] mb-3 mt-4">Choose your<br/>language</h2>
            <p className="text-[var(--text-secondary)] text-[16px] mb-10">You can change this anytime.</p>

            <div className="grid grid-cols-2 gap-[14px] mb-auto">
              {LANGUAGES.map((lang) => {
                const isActive = language === lang.id;
                return (
                  <div key={lang.id} onClick={() => setLanguage(lang.id)} 
                    className={`relative cursor-pointer p-5 rounded-2xl flex flex-col items-center justify-center transition-all bg-[var(--surface-2)]
                      ${isActive ? 'border-[1.5px] border-[var(--primary-start)] shadow-sm' : 'border border-[var(--border-color)] shadow-sm hover:border-[var(--text-secondary)]'}
                    `}
                  >
                    {isActive && (
                      <div className="absolute top-2 right-2 w-[18px] h-[18px] brand-gradient-bg rounded-full flex items-center justify-center text-white">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                    <span className={`text-[22px] font-bold mb-1 tracking-tight text-[var(--text-primary)]`}>{lang.native}</span>
                    <span className={`text-[13px] font-medium ${isActive ? 'text-[var(--primary-start)]' : 'text-[var(--text-secondary)]'}`}>{lang.english}</span>
                  </div>
                )
              })}
            </div>

            <button className="w-full h-[60px] text-[17px] mb-6 rounded-full font-semibold brand-gradient-bg shadow-md transition-transform hover:scale-[1.02] active:scale-95" onClick={next}>Continue</button>
          </motion.div>
        )}

        {step === 'privacy' && (
          <motion.div key="privacy"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full h-full bg-[var(--surface-1)] p-8 pt-20 flex flex-col text-left relative"
          >
            <div className="w-[72px] h-[72px] bg-[var(--surface-2)] rounded-[22px] flex items-center justify-center mb-6 mt-4 border border-[var(--border-color)] shadow-sm">
              <Lock className="text-[var(--primary-start)] w-8 h-8" strokeWidth={2.5} />
            </div>
            <h2 className="font-sans font-bold text-[34px] tracking-tight leading-tight text-[var(--text-primary)] mb-4">Your privacy,<br/>protected</h2>
            <p className="text-[var(--text-secondary)] text-[18px] mb-8 leading-[1.4] pr-2">
              We protect your data under<br/>India's <span className="font-bold text-[var(--text-primary)]">DPDP rules</span>.
            </p>

            <div className="flex flex-col gap-5 mb-8">
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-[var(--success)]/20 text-[var(--success)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} strokeWidth={3} />
                </div>
                <p className="text-[17px] text-[var(--text-secondary)] leading-[1.3] pr-2">Your chats & journals are private to you</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-[var(--success)]/20 text-[var(--success)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} strokeWidth={3} />
                </div>
                <p className="text-[17px] text-[var(--text-secondary)] leading-[1.3] pr-2">Export or delete your data anytime</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-[var(--success)]/20 text-[var(--success)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} strokeWidth={3} />
                </div>
                <p className="text-[17px] text-[var(--text-secondary)] leading-[1.3] pr-2">We never sell your information</p>
              </div>
            </div>

            <div className="mb-auto mt-2">
              <span 
                onClick={() => window.open('/privacy-policy', '_blank')}
                className="text-[16px] text-[var(--primary-start)] font-medium cursor-pointer hover:underline transition-all"
              >
                Read the full privacy policy ›
              </span>
            </div>

            <button className="w-full h-[60px] text-[17px] mb-6 rounded-full font-semibold brand-gradient-bg shadow-md mt-auto transition-transform hover:scale-[1.02] active:scale-95" onClick={next}>
              I agree
            </button>
          </motion.div>
        )}

        {step === 'disclaimer' && (
          <motion.div key="disclaimer"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full h-full bg-[var(--surface-1)] p-8 pt-20 flex flex-col text-left relative"
          >
            <h2 className="font-sans font-bold text-[34px] tracking-tight leading-[1.15] text-[var(--text-primary)] mb-4 mt-6">Nijo is a companion,<br/>not a clinic</h2>
            <p className="text-[var(--text-secondary)] text-[18px] mb-10 leading-[1.4] pr-2">
              Nijo is here to listen and help you<br/>reflect. It isn&apos;t a doctor or<br/>therapist, and can&apos;t give medical<br/>advice.
            </p>

            <div className="w-full bg-[var(--primary-start)]/10 border border-[var(--primary-start)]/20 rounded-[28px] p-6 mb-auto flex flex-col shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-full bg-[var(--primary-start)] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <h3 className="text-[var(--primary-start)] font-bold text-[18px] tracking-tight">If you're in crisis</h3>
              </div>
              <p className="text-[var(--text-secondary)] text-[17px] leading-[1.4] mb-5">
                You deserve real support right<br/>now. Help is available.
              </p>
              <button className="w-full h-[52px] rounded-full bg-[var(--primary-start)] text-white font-semibold text-[17px] transition-transform hover:scale-[1.02] active:scale-95 shadow-sm">
                Get help
              </button>
            </div>

            <button className="w-full h-[60px] text-[17px] mb-6 rounded-full font-semibold brand-gradient-bg shadow-md mt-auto transition-transform hover:scale-[1.02] active:scale-95" onClick={next}>
              I understand — continue
            </button>
          </motion.div>
        )}

      </AnimatePresence>
      </div>
    </div>
  )
}
