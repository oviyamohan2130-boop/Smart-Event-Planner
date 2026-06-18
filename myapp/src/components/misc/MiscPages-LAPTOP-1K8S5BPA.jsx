import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, MapPin, Phone, Check, CreditCard, Upload, Image as Img, X, Send, Sparkles } from 'lucide-react';

// ─── VENDORS ────────────────────────────────────────────────────────────────
export function VendorsPage() {
  const { vendors, darkMode } = useApp();
  const [filter, setFilter] = useState('All');
  const cats = ['All',...new Set(vendors.map(v=>v.category))];
  const filtered = filter==='All'?vendors:vendors.filter(v=>v.category===filter);
  const tc = darkMode?'white':'#1e1b4b';

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex gap-2 flex-wrap">
        {cats.map(c=>(
          <button key={c} onClick={()=>setFilter(c)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${filter===c?'btn-gradient text-white':'text-gray-400 hover:text-purple-400'}`}
            style={{ background:filter===c?undefined:'rgba(255,255,255,0.05)', border:'1px solid rgba(139,92,246,0.2)' }}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(v=>(
          <div key={v.id} className="glass-card overflow-hidden hover:-translate-y-1 transition-transform">
            <img src={v.image} alt={v.name} className="w-full h-36 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold" style={{ color:tc }}>{v.name}</h3>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  <Star className="w-3.5 h-3.5 fill-current" />{v.rating}
                </div>
              </div>
              <span className="badge mb-2" style={{ background:'rgba(139,92,246,0.2)',color:'#a78bfa' }}>{v.category}</span>
              <div className="text-sm text-gray-400 mb-3">{v.price}</div>
              <div className="text-xs text-gray-500 mb-3">{v.contact}</div>
              <button className="btn-gradient w-full py-2 rounded-xl text-sm font-medium">Book Vendor</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── QUOTES/PACKAGES ─────────────────────────────────────────────────────────
export function QuotesPage() {
  const { packages, darkMode } = useApp();
  const tc = darkMode?'white':'#1e1b4b';
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold gradient-text" style={{ fontFamily:'Playfair Display,serif' }}>Event Packages</h2>
        <p className="text-gray-400 mt-2">Choose the perfect package for your event</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {packages.map(p=>(
          <div key={p.id} className={`glass-card p-6 relative overflow-hidden transition-all hover:-translate-y-2 ${p.popular?'ring-2 ring-purple-500':''}`}>
            {p.popular && (
              <div className="absolute top-4 right-4 badge btn-gradient text-white">⭐ Popular</div>
            )}
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4`}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-1" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>{p.name}</h3>
            <div className="text-3xl font-bold gradient-text mb-4">${p.price.toLocaleString()}</div>
            <div className="space-y-2 mb-6">
              {p.features.map(f=>(
                <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />{f}
                </div>
              ))}
            </div>
            <button className={`w-full py-2.5 rounded-xl text-sm font-medium ${p.popular?'btn-gradient':'border border-purple-500 text-purple-400 hover:bg-purple-500 hover:bg-opacity-10 transition-all'}`}>
              Get Quote
            </button>
          </div>
        ))}
      </div>
      {/* Custom quote */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-3" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>📋 Request Custom Quote</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="form-input" placeholder="Event type" />
          <input type="number" className="form-input" placeholder="Number of guests" />
          <input className="form-input" placeholder="Budget range" />
          <input type="date" className="form-input" />
          <textarea className="form-input md:col-span-2" rows={3} placeholder="Special requirements..." />
        </div>
        <button className="btn-gradient px-6 py-2.5 rounded-xl text-sm font-medium mt-4 flex items-center gap-2">
          <Send className="w-4 h-4" /> Request Quote
        </button>
      </div>
    </div>
  );
}

// ─── PAYMENTS ────────────────────────────────────────────────────────────────
export function PaymentsPage() {
  const { events, darkMode } = useApp();
  const tc = darkMode?'white':'#1e1b4b';
  const gc = darkMode?'rgba(255,255,255,0.04)':'rgba(139,92,246,0.04)';
  const total = events.reduce((s,e)=>s+e.budget,0);
  const paid = Math.round(total*0.6);
  const pending = total-paid;

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="grid grid-cols-3 gap-4">
        {[['Total',`$${total.toLocaleString()}`,'#8b5cf6'],['Paid',`$${paid.toLocaleString()}`,'#10b981'],['Pending',`$${pending.toLocaleString()}`,'#f59e0b']].map(([l,v,c])=>(
          <div key={l} className="glass-card p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color:c }}>{v}</div>
            <div className="text-sm text-gray-400">{l}</div>
          </div>
        ))}
      </div>

      {/* Payment method mock */}
      <div className="glass-card p-5">
        <h3 className="font-semibold mb-4" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>💳 Payment Summary</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Event</th><th>Total</th><th>Paid</th><th>Remaining</th><th>Status</th></tr></thead>
            <tbody>
              {events.map(e=>{
                const p = Math.round(e.budget*0.6);
                const r = e.budget-p;
                return (
                  <tr key={e.id}>
                    <td><span className="font-medium text-sm" style={{ color:tc }}>{e.name}</span></td>
                    <td className="text-sm text-gray-300">${e.budget.toLocaleString()}</td>
                    <td className="text-green-400 font-medium text-sm">${p.toLocaleString()}</td>
                    <td className="text-yellow-400 text-sm">${r.toLocaleString()}</td>
                    <td><span className="badge" style={{ background:'rgba(245,158,11,0.2)',color:'#fbbf24' }}>Partial</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mock payment form */}
      <div className="glass-card p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>
          <CreditCard className="w-5 h-5 text-purple-400" /> Make Payment
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs text-gray-400 block mb-1">Card Number</label>
            <input className="form-input font-mono" placeholder="1234 5678 9012 3456" maxLength={19} />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Expiry</label>
            <input className="form-input" placeholder="MM/YY" />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">CVV</label>
            <input className="form-input" placeholder="•••" maxLength={3} type="password" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-gray-400 block mb-1">Amount ($)</label>
            <input type="number" className="form-input" placeholder="0.00" />
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button className="flex-1 py-3 rounded-xl text-sm font-medium border" style={{ borderColor:'rgba(139,92,246,0.3)', color:'#a78bfa' }}>Save Card</button>
          <button className="flex-1 btn-gradient py-3 rounded-xl text-sm font-medium">Pay Now</button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-3">🔒 Secured by 256-bit SSL encryption</p>
      </div>
    </div>
  );
}

// ─── MEDIA GALLERY ───────────────────────────────────────────────────────────
export function MediaPage() {
  const { events, darkMode } = useApp();
  const tc = darkMode?'white':'#1e1b4b';
  const imgs = [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&q=80',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
    'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&q=80',
    'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
  ];

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="glass-card p-4 border-2 border-dashed text-center cursor-pointer hover:border-purple-500 transition-all"
        style={{ borderColor:'rgba(139,92,246,0.3)' }}>
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-500" />
        <p className="text-sm text-gray-400">Upload photos & videos for your events</p>
        <button className="btn-gradient px-5 py-2 rounded-xl text-sm font-medium mt-3">Upload Media</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {imgs.map((src,i)=>(
          <div key={i} className="relative group overflow-hidden rounded-xl cursor-pointer">
            <img src={src} alt="" className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
              <Img className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FEEDBACK ────────────────────────────────────────────────────────────────
export function FeedbackPage() {
  const { feedback, addFeedback, events, user, darkMode } = useApp();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [form, setForm] = useState({ event:'', comment:'' });
  const tc = darkMode?'white':'#1e1b4b';

  const avgRating = (feedback.reduce((s,f)=>s+f.rating,0)/feedback.length).toFixed(1);

  const submit = () => {
    if(!form.event||!form.comment||!rating) return;
    addFeedback({ customer:user?.name||'Guest', event:form.event, rating, comment:form.comment, avatar:user?.avatar||'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80' });
    setForm({event:'',comment:''}); setRating(0);
  };

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Average rating */}
      <div className="glass-card p-6 text-center">
        <div className="text-5xl font-bold gradient-text mb-2" style={{ fontFamily:'Playfair Display,serif' }}>{avgRating}</div>
        <div className="flex justify-center gap-1 mb-2">
          {[1,2,3,4,5].map(s=>(
            <Star key={s} className={`w-6 h-6 ${s<=Math.round(avgRating)?'text-yellow-400 fill-current':'text-gray-600'}`} />
          ))}
        </div>
        <p className="text-gray-400 text-sm">Based on {feedback.length} reviews</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Reviews */}
        <div className="space-y-3">
          <h3 className="font-semibold" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>Customer Reviews</h3>
          {feedback.map(f=>(
            <div key={f.id} className="glass-card p-4">
              <div className="flex items-start gap-3 mb-2">
                <img src={f.avatar} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-sm" style={{ color:tc }}>{f.customer}</div>
                    <span className="text-xs text-gray-500">{f.date}</span>
                  </div>
                  <div className="flex gap-0.5 mt-1 mb-2">
                    {[1,2,3,4,5].map(s=>(
                      <Star key={s} className={`w-3 h-3 ${s<=f.rating?'text-yellow-400 fill-current':'text-gray-600'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">{f.comment}</p>
                  <div className="text-xs text-purple-400 mt-1">{f.event}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add review */}
        <div className="glass-card p-5 h-fit">
          <h3 className="font-semibold mb-4" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>Leave a Review</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Select Event</label>
              <select className="form-input" value={form.event} onChange={e=>setForm(p=>({...p,event:e.target.value}))}>
                <option value="">Choose event...</option>
                {events.map(e=><option key={e.id} value={e.name}>{e.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Your Rating</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(s=>(
                  <button key={s} onMouseEnter={()=>setHover(s)} onMouseLeave={()=>setHover(0)} onClick={()=>setRating(s)}>
                    <Star className={`w-8 h-8 transition-colors ${s<=(hover||rating)?'text-yellow-400 fill-current':'text-gray-600'}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Your Review</label>
              <textarea className="form-input" rows={4} placeholder="Share your experience..." value={form.comment} onChange={e=>setForm(p=>({...p,comment:e.target.value}))} />
            </div>
            <button onClick={submit} className="btn-gradient w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS ────────────────────────────────────────────────────────────────
export function SettingsPage() {
  const { user, toggleDark, darkMode } = useApp();
  const tc = darkMode?'white':'#1e1b4b';

  return (
    <div className="space-y-5 animate-fade-up max-w-2xl">
      {/* Profile */}
      <div className="glass-card p-5">
        <h3 className="font-semibold mb-4" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>👤 Profile Settings</h3>
        <div className="flex items-center gap-4 mb-4">
          <img src={user?.avatar} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-purple-500" />
          <button className="btn-gradient px-4 py-2 rounded-xl text-sm font-medium">Change Photo</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[['Full Name',user?.name||'John Doe','text'],['Email',user?.email||'john@demo.com','email'],['Phone','+1 555-0000','tel'],['Role','Admin','text']].map(([l,v,t])=>(
            <div key={l}>
              <label className="text-xs text-gray-400 block mb-1">{l}</label>
              <input type={t} defaultValue={v} className="form-input" />
            </div>
          ))}
        </div>
        <button className="btn-gradient px-6 py-2 rounded-xl text-sm font-medium mt-4">Save Changes</button>
      </div>

      {/* Preferences */}
      <div className="glass-card p-5">
        <h3 className="font-semibold mb-4" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>🎨 Preferences</h3>
        <div className="space-y-3">
          {[
            ['Dark Mode', 'Enable dark theme', darkMode, toggleDark],
            ['Email Notifications', 'Receive event reminders via email', true, ()=>{}],
            ['SMS Alerts', 'Get SMS for important updates', false, ()=>{}],
            ['Auto-Schedule', 'AI generates event timeline automatically', true, ()=>{}],
          ].map(([l,d,val,fn])=>(
            <div key={l} className="flex items-center justify-between p-3 rounded-xl" style={{ background:'rgba(255,255,255,0.03)' }}>
              <div>
                <div className="text-sm font-medium" style={{ color:tc }}>{l}</div>
                <div className="text-xs text-gray-500">{d}</div>
              </div>
              <button onClick={fn} className={`w-11 h-6 rounded-full transition-all relative ${val?'bg-purple-600':'bg-gray-700'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${val?'right-0.5':'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="glass-card p-5">
        <h3 className="font-semibold mb-4" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>🔐 Security</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Current Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">New Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
          <button className="btn-gradient px-6 py-2 rounded-xl text-sm font-medium">Update Password</button>
        </div>
      </div>
    </div>
  );
}