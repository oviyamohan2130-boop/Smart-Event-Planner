import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, MapPin, Users, DollarSign, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';

const STATUS_CONFIG = {
  upcoming: { label:'Upcoming', color:'#8b5cf6', bg:'rgba(139,92,246,0.15)', icon:Clock },
  confirmed: { label:'Confirmed', color:'#10b981', bg:'rgba(16,185,129,0.15)', icon:CheckCircle },
  completed: { label:'Completed', color:'#9ca3af', bg:'rgba(156,163,175,0.15)', icon:CheckCircle },
  cancelled: { label:'Cancelled', color:'#ef4444', bg:'rgba(239,68,68,0.15)', icon:XCircle },
};

export default function BookingsPage() {
  const { events, customers, darkMode } = useApp();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = filter==='all' ? events : events.filter(e=>e.status===filter);
  const tc = darkMode?'white':'#1e1b4b';
  const gc = darkMode?'rgba(255,255,255,0.04)':'rgba(139,92,246,0.04)';

  const orderDate = (id) => {
    const d = new Date(2026,0,1);
    d.setDate(d.getDate() + (id*17)%60);
    return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  };

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[['all','All Bookings',events.length,'#8b5cf6'],
          ['upcoming','Upcoming',events.filter(e=>e.status==='upcoming').length,'#06b6d4'],
          ['confirmed','Confirmed',events.filter(e=>e.status==='confirmed').length,'#10b981'],
          ['completed','Completed',events.filter(e=>e.status==='completed').length,'#9ca3af'],
        ].map(([f,l,v,c])=>(
          <button key={f} onClick={()=>setFilter(f)}
            className={`glass-card p-4 text-left transition-all ${filter===f?'ring-2 ring-purple-500':''}`}>
            <div className="text-2xl font-bold mb-1" style={{ color:c }}>{v}</div>
            <div className="text-sm text-gray-400">{l}</div>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="px-5 py-4 border-b flex justify-between items-center" style={{ borderColor:'rgba(255,255,255,0.06)' }}>
          <h3 className="font-semibold" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>Booking List</h3>
          <span className="badge" style={{ background:'rgba(139,92,246,0.2)', color:'#a78bfa' }}>{filtered.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Event</th><th>Category</th><th>Order Date</th><th>Event Date</th>
                <th>Guests</th><th>Budget</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => {
                const cfg = STATUS_CONFIG[e.status] || STATUS_CONFIG.upcoming;
                return (
                  <tr key={e.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img src={e.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
                        <div>
                          <div className="font-medium text-sm" style={{ color:tc }}>{e.name}</div>
                          <div className="text-xs text-gray-400 truncate max-w-32">{e.location.split(',')[0]}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge" style={{ background:'rgba(139,92,246,0.2)',color:'#a78bfa' }}>{e.category}</span></td>
                    <td className="text-gray-400 text-sm">{orderDate(e.id)}</td>
                    <td className="text-sm" style={{ color:tc }}>{e.date}</td>
                    <td className="text-sm" style={{ color:tc }}>{e.guests}/{e.maxGuests}</td>
                    <td className="text-green-400 font-medium text-sm">${e.budget.toLocaleString()}</td>
                    <td>
                      <span className="badge flex items-center gap-1 w-fit" style={{ background:cfg.bg, color:cfg.color }}>
                        <cfg.icon className="w-3 h-3" />{cfg.label}
                      </span>
                    </td>
                    <td>
                      <button onClick={()=>setSelected(e)} className="p-1.5 rounded-lg hover:bg-purple-500 hover:bg-opacity-10 transition-all text-purple-400">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={()=>setSelected(null)}>
          <div className="modal-content glass-card w-full max-w-lg mx-4 overflow-hidden" onClick={e=>e.stopPropagation()}
            style={{ background:darkMode?'#13111f':'white' }}>
            <img src={selected.image} alt="" className="w-full h-40 object-cover" />
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>{selected.name}</h3>
                <span className="badge" style={{ background:STATUS_CONFIG[selected.status]?.bg||'rgba(139,92,246,0.2)', color:STATUS_CONFIG[selected.status]?.color||'#a78bfa' }}>
                  {selected.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-4">{selected.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {[[Calendar,selected.date+' at '+selected.time,'Date & Time'],
                  [MapPin,selected.location,'Location'],
                  [Users,`${selected.guests}/${selected.maxGuests} guests`,'Capacity'],
                  [DollarSign,`$${selected.budget.toLocaleString()}`,'Budget'],
                ].map(([Icon,v,l])=>(
                  <div key={l} className="p-3 rounded-xl" style={{ background:gc }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-xs text-gray-500">{l}</span>
                    </div>
                    <div className="text-sm font-medium" style={{ color:tc }}>{v}</div>
                  </div>
                ))}
              </div>
              {selected.tasks?.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-400 mb-2">Tasks</div>
                  <div className="space-y-1">
                    {selected.tasks.map(t=>(
                      <div key={t.id} className="flex items-center gap-2 text-sm">
                        {t.done ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Clock className="w-4 h-4 text-gray-500" />}
                        <span className={t.done?'text-gray-500 line-through':'text-gray-300'}>{t.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button onClick={()=>setSelected(null)} className="btn-gradient w-full py-2.5 rounded-xl text-sm font-medium mt-4">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}