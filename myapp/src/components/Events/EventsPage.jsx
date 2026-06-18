import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, X, Search, Clock, MapPin, Users, DollarSign, Trash2, Brain, CheckSquare, Square } from 'lucide-react';

const API_URL = 'http://localhost:8081/api/events';
const CATEGORIES = ['Birthday','Wedding','Corporate','Party','Workshop','Meeting','Conference','Other'];

const AI_BUDGETS = {
  Birthday: { base: 1500, tips: ["🎂 Cake: $200-400","🎈 Decorations: $300-600","🎵 Music: $200-500"] },
  Wedding: { base: 25000, tips: ["💐 Flowers: $2000-5000","🍽️ Catering: $8000-15000","📸 Photography: $2000-5000"] },
  Corporate: { base: 8000, tips: ["🎤 AV Setup: $1000-3000","🍱 Catering: $30-80/head","🏛️ Venue: $2000-6000"] },
  Party: { base: 2000, tips: ["🎉 Venue: $500-2000","🥂 Bar: $20-50/head","🎧 DJ: $500-1500"] },
  Workshop: { base: 3500, tips: ["📋 Materials: $50/person","☕ Refreshments: $20/person","💻 AV: $500-1500"] },
  Meeting: { base: 500, tips: ["📊 AV: $200-600","☕ Catering: $15-30/head","🏢 Venue: $100-400"] },
  Conference: { base: 15000, tips: ["🎤 Speakers: $1000-5000","📱 Event App: $500-2000","🏛️ Venue: $5000-12000"] },
  Other: { base: 2000, tips: ["Plan based on attendance","Get 3 vendor quotes","Buffer 15% for surprises"] },
};

const CHECKLISTS = {
  Birthday: ["Book venue","Order birthday cake","Send invitations","Arrange decorations","Plan menu/catering","Book photographer","Arrange party favors","Set up music/entertainment"],
  Wedding: ["Book venue","Hire wedding planner","Select wedding dress/attire","Book caterer","Book photographer & videographer","Send invitations","Arrange florist","Book DJ/band","Arrange transport","Plan honeymoon","Hair & makeup","Wedding cake"],
  Corporate: ["Book venue","Send calendar invites","Prepare agenda","Arrange AV equipment","Plan catering","Book keynote speakers","Prepare materials","Arrange parking"],
  Party: ["Book venue","Send invitations","Plan music/DJ","Arrange catering","Order decorations","Plan activities/games","Arrange transport","Prepare guest list"],
  Workshop: ["Book venue","Prepare materials","Send invites","Arrange catering","Set up AV","Prepare handouts","Plan schedule","Arrange certificates"],
  Meeting: ["Book conference room","Send calendar invite","Prepare agenda","Arrange refreshments","Set up AV","Prepare documents"],
};

function AIBudgetModal({ category, guests, onClose }) {
  const budget = AI_BUDGETS[category] || AI_BUDGETS.Other;
  const estimated = budget.base + (guests * 25);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white" style={{ fontFamily:'Playfair Display,serif' }}>AI Budget Estimate</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 rounded-xl mb-4" style={{ background:'linear-gradient(135deg,rgba(139,92,246,0.2),rgba(236,72,153,0.1))', border:'1px solid rgba(139,92,246,0.3)' }}>
          <div className="text-sm text-gray-300 mb-1">Estimated Budget for {category}</div>
          <div className="text-3xl font-bold gradient-text">${estimated.toLocaleString()}</div>
          <div className="text-xs text-gray-400 mt-1">Based on {guests} guests + venue + services</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-300 mb-2">💡 Cost Breakdown Tips</div>
          {budget.tips.map((t,i) => (
            <div key={i} className="text-sm text-gray-400 p-2 rounded-lg" style={{ background:'rgba(255,255,255,0.03)' }}>{t}</div>
          ))}
        </div>
        <button onClick={onClose} className="btn-gradient w-full py-2.5 rounded-xl text-sm font-medium mt-4">Got it!</button>
      </div>
    </div>
  );
}

function ChecklistModal({ category, onClose }) {
  const tasks = CHECKLISTS[category] || CHECKLISTS.Meeting;
  const [checked, setChecked] = useState([]);
  const toggle = (t) => setChecked(p => p.includes(t) ? p.filter(x=>x!==t) : [...p,t]);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-white" style={{ fontFamily:'Playfair Display,serif' }}>📋 Smart Checklist — {category}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="text-xs text-purple-400 mb-3">{checked.length}/{tasks.length} tasks completed</div>
        <div className="progress-bar mb-4">
          <div className="progress-fill" style={{ width:`${(checked.length/tasks.length)*100}%` }} />
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {tasks.map(t => (
            <button key={t} onClick={() => toggle(t)}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:bg-purple-500 hover:bg-opacity-10"
              style={{ background:'rgba(255,255,255,0.03)' }}>
              {checked.includes(t)
                ? <CheckSquare className="w-4 h-4 text-green-400 flex-shrink-0" />
                : <Square className="w-4 h-4 text-gray-500 flex-shrink-0" />}
              <span className={`text-sm ${checked.includes(t) ? 'line-through text-gray-500' : 'text-gray-300'}`}>{t}</span>
            </button>
          ))}
        </div>
        <button onClick={onClose} className="btn-gradient w-full py-2.5 rounded-xl text-sm font-medium mt-4">Save Progress</button>
      </div>
    </div>
  );
}

function CreateEventModal({ onClose, onCreated }) {
  const { darkMode } = useApp();
  const [form, setForm] = useState({ name:'', category:'Birthday', date:'', time:'', location:'', guests:'', maxGuests:'', budget:'', description:'' });
  const [showAI, setShowAI] = useState(false);
  const [saving, setSaving] = useState(false);

  const inp = f => ({ value: form[f], onChange: e => setForm(p=>({...p,[f]:e.target.value})) });
  
  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.date || !form.location) return;
    try {
      const res = await fetch('http://localhost:8081/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          date: form.date,
          time: form.time,
          location: form.location,
          description: form.description,
          guests: +form.guests || 0,
          maxGuests: +form.maxGuests || 100,
          budget: +form.budget || 0,
          status: 'upcoming',
          image: {
            Birthday: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80',
            Wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
            Corporate: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
            Party: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80',
            Workshop: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
            Meeting: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
            Conference: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
            Other: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
          }[form.category] || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80'
        })
      });
      if (res.ok) {
        const saved = await res.json();
        onCreated(saved);
        onClose();
        alert('✅ Event saved to database!');
      } else {
        alert('❌ Failed to save!');
      }
    } catch (err) {
      alert('❌ Backend not connected!');
    }
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto"
        onClick={e=>e.stopPropagation()} style={{ background: darkMode?'#13111f':'white' }}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold" style={{ color:darkMode?'white':'#1e1b4b', fontFamily:'Playfair Display,serif' }}>Create New Event</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm text-gray-400 mb-1 block">Event Name *</label>
              <input className="form-input" placeholder="e.g. Sarah's Birthday Party" {...inp('name')} required />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Category</label>
              <select className="form-input" {...inp('category')}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Date *</label>
              <input type="date" className="form-input" {...inp('date')} required />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Time</label>
              <input type="time" className="form-input" {...inp('time')} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Budget ($)</label>
              <input type="number" className="form-input" placeholder="2500" {...inp('budget')} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Current Guests</label>
              <input type="number" className="form-input" placeholder="0" {...inp('guests')} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Max Capacity</label>
              <input type="number" className="form-input" placeholder="100" {...inp('maxGuests')} />
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-400 mb-1 block">Location *</label>
              <input className="form-input" placeholder="Venue name, City" {...inp('location')} required />
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-400 mb-1 block">Description</label>
              <textarea className="form-input" rows={3} placeholder="Brief event description..." {...inp('description')} />
            </div>
          </div>
          <button type="button" onClick={() => setShowAI(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.3)', color:'#a78bfa' }}>
            <Brain className="w-4 h-4" /> Get AI Budget Estimate
          </button>
          <div className="flex gap-3">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-600 text-gray-400">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 btn-gradient py-2.5 rounded-xl text-sm font-medium">
              {saving ? 'Saving...' : '💾 Save to Database'}
            </button>
          </div>
        </form>
        {showAI && <AIBudgetModal category={form.category} guests={+form.guests||50} onClose={() => setShowAI(false)} />}
      </div>
    </div>
  );
}

export default function EventsPage() {
  const { darkMode } = useApp();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [showCreate, setShowCreate] = useState(false);
  const [aiEvent, setAiEvent] = useState(null);
  const [checklistEvent, setChecklistEvent] = useState(null);

  // ── Fetch events from MySQL on page load ──
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch events from backend:', err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // ── Delete event from database ──
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      alert('Failed to delete event!');
    }
  };

  // ── After new event created, refresh list ──
  const handleCreated = (newEvent) => {
    setEvents(prev => [...prev, newEvent]);
  };

  const filtered = events.filter(e => {
    const matchSearch = e.name?.toLowerCase().includes(search.toLowerCase()) ||
                        e.location?.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'All' || e.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input className="form-input pl-10" placeholder="Search events..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <select className="form-input w-auto" value={catFilter} onChange={e=>setCatFilter(e.target.value)}>
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-gradient flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap">
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-gray-400">Loading events from database...</div>
      )}

      {/* Event grid */}
      {!loading && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(e => {
            const pct = Math.round(((e.guests||0)/Math.max(e.maxGuests||1,1))*100);
            return (
              <div key={e.id} className="glass-card overflow-hidden group transition-all hover:-translate-y-1">
                <div className="relative h-44 overflow-hidden">
                  <img src={e.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80'}
                    alt={e.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8))' }} />
                  <div className="absolute top-3 left-3">
                    <span className="badge" style={{ background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)', color:'#a78bfa', border:'1px solid rgba(139,92,246,0.4)' }}>{e.category}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="badge" style={{ background:e.status==='confirmed'?'rgba(34,197,94,0.8)':'rgba(139,92,246,0.8)', color:'white' }}>
                      {e.status==='confirmed'?'✓ Confirmed':'Upcoming'}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setAiEvent(e)} className="p-1.5 rounded-lg backdrop-blur-sm" style={{ background:'rgba(139,92,246,0.7)' }}>
                      <Brain className="w-3 h-3 text-white" />
                    </button>
                    <button onClick={() => setChecklistEvent(e)} className="p-1.5 rounded-lg backdrop-blur-sm" style={{ background:'rgba(16,185,129,0.7)' }}>
                      <CheckSquare className="w-3 h-3 text-white" />
                    </button>
                    <button onClick={() => handleDelete(e.id)} className="p-1.5 rounded-lg backdrop-blur-sm" style={{ background:'rgba(239,68,68,0.7)' }}>
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1" style={{ color:darkMode?'white':'#1e1b4b' }}>{e.name}</h3>
                  <p className="text-xs text-gray-400 mb-3 line-clamp-2">{e.description}</p>
                  <div className="space-y-1.5 text-xs text-gray-400">
                    <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-purple-400" /><span>{e.date} {e.time && `at ${e.time}`}</span></div>
                    <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-pink-400" /><span className="truncate">{e.location}</span></div>
                    <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-blue-400" /><span>{e.guests || 0} guests</span></div>
                    <div className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5 text-green-400" /><span>${(e.budget||0).toLocaleString()}</span></div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Capacity</span>
                      <span style={{ color:pct>80?'#ef4444':pct>50?'#f59e0b':'#34d399' }}>{pct}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width:`${pct}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add new card */}
          <button onClick={() => setShowCreate(true)}
            className="glass-card flex flex-col items-center justify-center gap-3 p-8 transition-all hover:-translate-y-1 min-h-48"
            style={{ borderColor:'rgba(139,92,246,0.3)', borderStyle:'dashed', borderWidth:2 }}>
            <div className="w-12 h-12 rounded-full btn-gradient flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-purple-400">Add New Event</span>
          </button>
        </div>
      )}

      {/* No events */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p>No events found. Create your first event!</p>
        </div>
      )}

      {showCreate && <CreateEventModal onClose={() => setShowCreate(false)} onCreated={handleCreated} />}
      {aiEvent && <AIBudgetModal category={aiEvent.category} guests={aiEvent.guests||0} onClose={() => setAiEvent(null)} />}
      {checklistEvent && <ChecklistModal category={checklistEvent.category} onClose={() => setChecklistEvent(null)} />}
    </div>
  );
}