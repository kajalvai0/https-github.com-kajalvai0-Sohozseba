
import React, { useState } from 'react';
import { Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, lang }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  if (!isOpen) return null;

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) setStep('otp');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate verification
    alert(lang === 'en' ? 'Successfully Logged In!' : 'সফলভাবে লগইন করা হয়েছে!');
    onClose();
  };

  const updateOtp = (val: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    // Auto-focus next input
    if (val && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300 relative overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">
            <i className="fa-solid fa-shield-halved text-2xl"></i>
          </div>
          <h2 className="text-2xl font-black text-slate-800">
            {step === 'phone' 
              ? (lang === 'en' ? 'Secure Login' : 'নিরাপদ লগইন')
              : (lang === 'en' ? 'Verify OTP' : 'OTP যাচাই করুন')}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {step === 'phone'
              ? (lang === 'en' ? 'Enter your mobile number to get started' : 'শুরু করতে আপনার মোবাইল নম্বর দিন')
              : (lang === 'en' ? `Code sent to +880 ${phone}` : `কোডটি +৮৮০ ${phone} নম্বরে পাঠানো হয়েছে`)}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 border-r border-slate-200 pr-3">+880</span>
              <input
                autoFocus
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="1712-345678"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-20 pr-4 font-bold text-lg focus:border-blue-500 focus:bg-white transition-all outline-none"
                maxLength={10}
                required
              />
            </div>
            <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
              {lang === 'en' ? 'Send OTP' : 'OTP পাঠান'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-8">
            <div className="flex justify-between gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  value={digit}
                  onChange={(e) => updateOtp(e.target.value, idx)}
                  className="w-12 h-14 bg-slate-50 border-2 border-slate-100 rounded-xl text-center font-black text-xl text-blue-600 focus:border-blue-500 focus:bg-white outline-none"
                  required
                />
              ))}
            </div>
            <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
              {lang === 'en' ? 'Verify & Login' : 'যাচাই করুন ও লগইন করুন'}
            </button>
            <div className="text-center">
              <button type="button" onClick={() => setStep('phone')} className="text-sm font-bold text-blue-600 hover:underline">
                {lang === 'en' ? 'Change Phone Number' : 'মোবাইল নম্বর পরিবর্তন করুন'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
