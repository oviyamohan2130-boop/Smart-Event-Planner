import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, X, Search, Mail, Phone, Users, DollarSign, Star, QrCode } from 'lucide-react';

function AddCustomerModal({ onClose }) {
  const { addCustomer, darkMode } = useApp();
  const [form, setForm] = useState({ name:'', email:'', phone:'' });
  const inp = f => ({ value:form[f], onChange:e=>setForm(p=>({...p,[f]:e.target.value})) });
  const submit = (e) => { e.preventDefault(); if(!form.name||!form.email) return; addCustomer(form); onClose(); };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card p-6 w-full max-w-md mx-4" onClick={e=>e.stopPropagation()} style={{ background:darkMode?'#13111f':'white' }}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-lg" style={{ color:darkMode?'white':'#1e1b4b', fontFamily:'Playfair Display,serif' }}>Add Customer</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          {[['name','Full Name','text','John Doe'],['email','Email','email','john@example.com'],['phone','Phone','tel','+1 555-0000']].map(([f,l,t,ph])=>(
            <div key={f}>
              <label className="text-sm text-gray-400 mb-1 block">{l}</label>
              <input type={t} className="form-input" placeholder={ph} {...inp(f)} required={f!=='phone'} />
            </div>
          ))}
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm border border-gray-600 text-gray-400">Cancel</button>
            <button type="submit" className="flex-1 btn-gradient py-2.5 rounded-xl text-sm font-medium">Add Customer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function QRModal({ customer, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card p-6 w-full max-w-xs mx-4 text-center" onClick={e=>e.stopPropagation()}>
        <h3 className="font-bold text-white mb-4" style={{ fontFamily:'Playfair Display,serif' }}>Entry QR Code</h3>
        <div className="bg-white p-4 rounded-xl inline-block mb-4">
          {/* QR code simulation using SVG pattern */}
          <svg width="150" height="150" viewBox="0 0 150 150">
            {Array.from({length:10},(_,i)=>Array.from({length:10},(_,j)=>(
              Math.random()>0.5 ? <rect key={`${i}-${j}`} x={i*15} y={j*15} width={13} height={13} fill="#1e1b4b" rx={1} /> : null
            )))}
            <rect x="0" y="0" width="45" height="45" fill="#1e1b4b" rx={2} />
            <rect x="3" y="3" width="39" height="39" fill="white" rx={1} />
            <rect x="8" y="8" width="29" height="29" fill="#1e1b4b" rx={1} />
            <rect x="105" y="0" width="45" height="45" fill="#1e1b4b" rx={2} />
            <rect x="108" y="3" width="39" height="39" fill="white" rx={1} />
            <rect x="113" y="8" width="29" height="29" fill="#1e1b4b" rx={1} />
            <rect x="0" y="105" width="45" height="45" fill="#1e1b4b" rx={2} />
            <rect x="3" y="108" width="39" height="39" fill="white" rx={1} />
            <rect x="8" y="113" width="29" height="29" fill="#1e1b4b" rx={1} />
          </svg>
        </div>
        <p className="text-sm text-gray-300 mb-1">{customer.name}</p>
        <p className="text-xs text-gray-500 mb-4">ID: EVT-{customer.id.toString().padStart(4,'0')}</p>
        <button onClick={onClose} className="btn-gradient w-full py-2 rounded-xl text-sm font-medium">Close</button>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  const { customers, darkMode } = useApp();
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [qrCustomer, setQrCustomer] = useState(null);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label:'Total Clients', value: customers.length, icon: Users, color:'#8b5cf6' },
    { label:'VIP Clients', value: customers.filter(c=>c.status==='vip').length, icon: Star, color:'#f59e0b' },
    { label:'Total Revenue', value: `$${(customers.reduce((s,c)=>s+c.totalSpent,0)/1000).toFixed(1)}k`, icon: DollarSign, color:'#10b981' },
  ];

  const tc = darkMode ? 'white' : '#1e1b4b';
  const gc = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(139,92,246,0.04)';

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s,i) => (
          <div key={i} className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background:`${s.color}22` }}>
              <s.icon className="w-5 h-5" style={{ color:s.color }} />
            </div>
            <div>
              <div className="text-xl font-bold" style={{ color:tc }}>{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input className="form-input pl-10" placeholder="Search customers..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-gradient flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      {/* Customer cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="glass-card p-4 hover:-translate-y-1 transition-transform cursor-pointer">
            <div className="flex items-start gap-3 mb-3">
              <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="font-semibold truncate" style={{ color:tc }}>{c.name}</div>
                  <span className="badge ml-1 flex-shrink-0"
                    style={{ background:c.status==='vip'?'rgba(245,158,11,0.2)':'rgba(34,197,94,0.15)', color:c.status==='vip'?'#fbbf24':'#34d399' }}>
                    {c.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">Since {c.joined}</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-gray-400 mb-3">
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-purple-400" /><span className="truncate">{c.email}</span></div>
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-pink-400" /><span>{c.phone}</span></div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {[['Events',c.events,'#8b5cf6'],['Spent',`$${c.totalSpent.toLocaleString()}`,'#10b981']].map(([l,v,col])=>(
                <div key={l} className="p-2 rounded-lg text-center" style={{ background:gc }}>
                  <div className="font-bold text-sm" style={{ color:col }}>{v}</div>
                  <div className="text-xs text-gray-400">{l}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all hover:opacity-80"
                style={{ background:'rgba(139,92,246,0.15)', color:'#a78bfa' }}>
                <Mail className="w-3 h-3" /> Email
              </button>
              <button onClick={() => setQrCustomer(c)}
                className="flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all hover:opacity-80"
                style={{ background:'rgba(16,185,129,0.15)', color:'#34d399' }}>
                <QrCode className="w-3 h-3" /> QR Entry
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Table view */}
      <div className="glass-card overflow-hidden">
        <div className="px-4 py-3 border-b" style={{ borderColor:'rgba(255,255,255,0.06)' }}>
          <h3 className="font-semibold" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>Customer List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr><th>Customer</th><th>Contact</th><th>Events</th><th>Total Spent</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <img src={c.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <span className="font-medium" style={{ color:tc }}>{c.name}</span>
                    </div>
                  </td>
                  <td className="text-gray-400">{c.email}</td>
                  <td style={{ color:tc }}>{c.events}</td>
                  <td className="text-green-400 font-medium">${c.totalSpent.toLocaleString()}</td>
                  <td>
                    <span className="badge" style={{ background:c.status==='vip'?'rgba(245,158,11,0.2)':'rgba(34,197,94,0.15)', color:c.status==='vip'?'#fbbf24':'#34d399' }}>
                      {c.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => setQrCustomer(c)} className="text-xs text-purple-400 hover:text-pink-400 transition-colors flex items-center gap-1">
                      <QrCode className="w-3 h-3" /> QR Code
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && <AddCustomerModal onClose={() => setShowAdd(false)} />}
      {qrCustomer && <QRModal customer={qrCustomer} onClose={() => setQrCustomer(null)} />}
    </div>
  );
}