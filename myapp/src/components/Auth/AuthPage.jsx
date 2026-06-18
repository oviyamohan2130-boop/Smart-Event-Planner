import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, EyeOff, Mail, Lock, User, Phone, Sparkles, Calendar, Users, TrendingUp } from 'lucide-react';
import { API, post } from '../../utils/api';

const features = [
  { icon: Calendar, label: "Smart Event Planning", desc: "AI-powered scheduling" },
  { icon: Users, label: "Guest Management", desc: "RSVP & seat arrangement" },
  { icon: TrendingUp, label: "Budget Analytics", desc: "Real-time expense tracking" },
];

export default function AuthPage() {
  const { login } = useApp();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', confirm:'' });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Min 6 characters';
    if (mode === 'register') {
      if (!form.name) e.name = 'Name is required';
      if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError('');

    try {
      if (mode === 'login') {
        // → POST http://localhost:8081/api/auth/login
        const data = await post(API.AUTH.LOGIN, {
          email: form.email,
          password: form.password,
        });
        if (data?.token) localStorage.setItem('token', data.token);
        login({
          name: data?.name || form.email.split('@')[0],
          email: form.email,
          role: data?.role || 'user',
          avatar: data?.avatar || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&q=80',
          ...data,
        });
      } else {
        // → POST http://localhost:8081/api/auth/register
        const data = await post(API.AUTH.REGISTER, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        });
        if (data?.token) localStorage.setItem('token', data.token);
        login({
          name: form.name,
          email: form.email,
          role: 'user',
          avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&q=80',
          ...data,
        });
      }
    } catch (err) {
      setServerError(err.message || 'Cannot connect. Is Spring Boot running on port 8081?');
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = () => login({
    name: 'John Doe', email: 'demo@eventpro.com', role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&q=80',
  });

  const inp = (field) => ({
    value: form[field],
    onChange: e => { setForm(p=>({...p,[field]:e.target.value})); setErrors(p=>({...p,[field]:''})); setServerError(''); }
  });

  return (
    <div className="min-h-screen flex" style={{ background: '#0a0918' }}>

      {/* Left hero panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(135deg, #1a0533 0%, #0d1b4b 50%, #0a1628 100%)' }}>
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 animate-float pointer-events-none"
          style={{ background:'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="absolute bottom-32 right-10 w-48 h-48 rounded-full opacity-15 animate-float pointer-events-none"
          style={{ background:'radial-gradient(circle, #ec4899, transparent)', animationDelay:'3s' }} />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl btn-gradient flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white" style={{ fontFamily:'Playfair Display,serif' }}>EventPro</div>
            <div className="text-purple-300 text-xs">Smart Event Planner</div>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight" style={{ fontFamily:'Playfair Display,serif' }}>
              Plan Your Perfect <span className="gradient-text">Events</span> with AI
            </h1>
            <p className="text-gray-400 mt-3 text-lg">From birthdays to grand weddings — manage everything with intelligence.</p>
          </div>
          <div className="space-y-3">
            {features.map((f,i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl" style={{ background:'rgba(255,255,255,0.05)' }}>
                <div className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{f.label}</div>
                  <div className="text-gray-400 text-xs">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white border-opacity-10">
            {[['500+','Events'],['98%','Satisfaction'],['50+','Vendors']].map(([n,l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-bold gradient-text">{n}</div>
                <div className="text-gray-400 text-xs mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Connection info */}
        <div className="relative z-10 p-3 rounded-xl" style={{ background:'rgba(124,58,237,0.1)', border:'1px solid rgba(139,92,246,0.3)' }}>
          <p className="text-xs font-mono space-y-0.5">
            <span className="block text-purple-300">🌐 Frontend → <span className="text-blue-400">http://localhost:3002</span></span>
            <span className="block text-purple-300">🔗 Backend  → <span className="text-green-400">http://localhost:8081</span></span>
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white" style={{ fontFamily:'Playfair Display,serif' }}>EventPro</span>
          </div>

          <div className="glass-card p-8">
            {/* Mode tabs */}
            <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background:'rgba(255,255,255,0.05)' }}>
              {['login','register'].map(m => (
                <button key={m} onClick={() => { setMode(m); setErrors({}); setServerError(''); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize
                    ${mode===m ? 'btn-gradient text-white' : 'text-gray-400 hover:text-white'}`}>
                  {m}
                </button>
              ))}
            </div>

            {/* Server error banner */}
            {serverError && (
              <div className="mb-4 p-3 rounded-xl text-xs flex items-start gap-2"
                style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'#fca5a5' }}>
                ⚠️ {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode==='register' && (
                <Field label="Full Name" icon={<User className="w-4 h-4"/>} error={errors.name}>
                  <input type="text" className="form-input pl-10" placeholder="John Doe" {...inp('name')} />
                </Field>
              )}
              <Field label="Email Address" icon={<Mail className="w-4 h-4"/>} error={errors.email}>
                <input type="email" className="form-input pl-10" placeholder="you@example.com" {...inp('email')} />
              </Field>
              {mode==='register' && (
                <Field label="Phone Number" icon={<Phone className="w-4 h-4"/>}>
                  <input type="tel" className="form-input pl-10" placeholder="+91 98765 43210" {...inp('phone')} />
                </Field>
              )}
              <Field label="Password" icon={<Lock className="w-4 h-4"/>} error={errors.password}
                suffix={
                  <button type="button" onClick={() => setShow(p=>!p)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-purple-400">
                    {show ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                  </button>
                }>
                <input type={show?'text':'password'} className="form-input pl-10 pr-10" placeholder="••••••••" {...inp('password')} />
              </Field>
              {mode==='register' && (
                <Field label="Confirm Password" icon={<Lock className="w-4 h-4"/>} error={errors.confirm}>
                  <input type="password" className="form-input pl-10" placeholder="••••••••" {...inp('confirm')} />
                </Field>
              )}

              <button type="submit" disabled={loading}
                className="btn-gradient w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-70">
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>Connecting to server...</>
                  : mode==='login' ? 'Sign In' : 'Create Account'
                }
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background:'rgba(255,255,255,0.1)' }} />
                <span className="text-xs text-gray-500">or</span>
                <div className="flex-1 h-px" style={{ background:'rgba(255,255,255,0.1)' }} />
              </div>

              <button type="button" onClick={demoLogin}
                className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
                style={{ background:'rgba(139,92,246,0.08)', border:'1px solid rgba(139,92,246,0.3)', color:'#a78bfa' }}>
                <Sparkles className="w-4 h-4" />
                Demo Mode (No Backend Needed)
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-5">
              {mode==='login' ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => { setMode(mode==='login'?'register':'login'); setErrors({}); setServerError(''); }}
                className="text-purple-400 hover:text-pink-400 font-medium transition-colors">
                {mode==='login' ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, error, suffix, children }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-300 font-medium">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-3 text-gray-400">{icon}</div>
        {children}
        {suffix}
      </div>
      {error && <p className="text-red-400 text-xs">⚠ {error}</p>}
    </div>
  );
}
