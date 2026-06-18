import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { Calendar, Users, DollarSign, TrendingUp, CheckCircle, Clock, AlertTriangle, Zap, Brain, ChevronRight } from 'lucide-react';

const COLORS = ['#8b5cf6','#ec4899','#06b6d4','#10b981','#f59e0b'];

const MONTH_DATA = [
  { month:'Jan', events:3, budget:8200 },
  { month:'Feb', events:2, budget:5400 },
  { month:'Mar', events:4, budget:12100 },
  { month:'Apr', events:5, budget:18500 },
  { month:'May', events:3, budget:9200 },
  { month:'Jun', events:6, budget:22000 },
];

const AI_TIPS = [
  "🎯 Book vendors 3+ months early for peak season events",
  "💡 Weather forecast shows rain next week — consider indoor backup for outdoor events",
  "📊 Your average event budget is 23% over initial estimates. Review early planning",
  "🌟 Add a photo booth to increase guest engagement by 40%",
];

export default function Dashboard() {
  const { events, customers, darkMode, setActiveSection } = useApp();
  const [tip, setTip] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimatedStats(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTip(p => (p+1)%AI_TIPS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const totalBudget = events.reduce((s,e) => s+e.budget, 0);
  const upcoming = events.filter(e => e.status==='upcoming').length;
  const totalGuests = events.reduce((s,e) => s+e.guests, 0);
  const completed = events.filter(e => e.status==='completed').length;

  const categoryData = events.reduce((acc, e) => {
    const ex = acc.find(x => x.name===e.category);
    if (ex) ex.value++;
    else acc.push({ name: e.category, value: 1 });
    return acc;
  }, []);

  const upcomingEvents = events.filter(e => e.status==='upcoming').slice(0,3);

  const stats = [
    { icon: Calendar, label: 'Total Events', value: events.length, change: '+2 this month', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
    { icon: Users, label: 'Total Guests', value: totalGuests, change: '+12 confirmed', color: '#ec4899', bg: 'rgba(236,72,153,0.15)' },
    { icon: DollarSign, label: 'Total Budget', value: `$${(totalBudget/1000).toFixed(1)}k`, change: '+8.2% vs last month', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
    { icon: CheckCircle, label: 'Completed', value: completed, change: 'All on schedule', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  ];

  const tc = darkMode ? '#e2e8f0' : '#374151';
  const gc = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.05)';

  return (
    <div className="space-y-6 animate-fade-up">
      {/* AI Tip Banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{ background:'linear-gradient(135deg,rgba(139,92,246,0.2),rgba(236,72,153,0.1))', border:'1px solid rgba(139,92,246,0.3)' }}>
        <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <p className="text-sm font-medium" style={{ color: darkMode?'#c4b5fd':'#6d28d9' }}>{AI_TIPS[tip]}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`glass-card p-5 stat-card cursor-pointer`} onClick={() => setActiveSection('events')}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold mb-1 transition-all duration-700" style={{ color: darkMode?'white':'#1e1b4b' }}>
              {animatedStats ? s.value : '...'}
            </div>
            <div className="text-sm text-gray-400">{s.label}</div>
            <div className="text-xs text-green-400 mt-1">{s.change}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Bar chart */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold" style={{ color: darkMode?'white':'#1e1b4b', fontFamily:'Playfair Display,serif' }}>Events by Month</h3>
            <span className="badge" style={{ background:'rgba(139,92,246,0.2)', color:'#a78bfa' }}>2026</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MONTH_DATA}>
              <defs>
                <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: darkMode?'#1a1830':'white', border:'1px solid rgba(139,92,246,0.3)', borderRadius:8, color:tc }} />
              <Area type="monotone" dataKey="events" stroke="#8b5cf6" fill="url(#colorEvents)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="glass-card p-5">
          <h3 className="font-semibold mb-4" style={{ color: darkMode?'white':'#1e1b4b', fontFamily:'Playfair Display,serif' }}>Events by Category</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i%COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: darkMode?'#1a1830':'white', border:'1px solid rgba(139,92,246,0.3)', borderRadius:8, color:tc }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryData.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i%COLORS.length] }} />
                  <span className="text-gray-400">{c.name}</span>
                </div>
                <span className="font-medium" style={{ color: darkMode?'white':'#374151' }}>{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Upcoming events */}
        <div className="glass-card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold" style={{ color: darkMode?'white':'#1e1b4b', fontFamily:'Playfair Display,serif' }}>Upcoming Events</h3>
            <button onClick={() => setActiveSection('events')} className="text-xs text-purple-400 flex items-center gap-1 hover:text-pink-400 transition-colors">
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map(e => {
              const pct = Math.round((e.guests/Math.max(e.maxGuests,1))*100);
              return (
                <div key={e.id} className="flex gap-3 p-3 rounded-xl transition-all hover:bg-purple-500 hover:bg-opacity-5 cursor-pointer"
                  style={{ background: gc }}>
                  <img src={e.image} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-sm truncate" style={{ color: darkMode?'white':'#1e1b4b' }}>{e.name}</div>
                      <span className="badge ml-2 flex-shrink-0" style={{ background:'rgba(139,92,246,0.2)', color:'#a78bfa' }}>{e.category}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{e.date} • {e.location.split(',')[0]}</div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Capacity</span><span>{e.guests}/{e.maxGuests}</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick actions + recent customers */}
        <div className="space-y-4">
          {/* Quick actions */}
          <div className="glass-card p-5">
            <h3 className="font-semibold mb-3" style={{ color: darkMode?'white':'#1e1b4b', fontFamily:'Playfair Display,serif' }}>Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon:'🎉', label:'New Event', section:'events' },
                { icon:'👤', label:'Add Customer', section:'customers' },
                { icon:'📅', label:'View Calendar', section:'calendar' },
                { icon:'💰', label:'Add Expense', section:'budget' },
              ].map(a => (
                <button key={a.label} onClick={() => setActiveSection(a.section)}
                  className="flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition-all hover:bg-purple-500 hover:bg-opacity-10"
                  style={{ background: gc, color: darkMode?'#c4b5fd':'#6d28d9', border:'1px solid rgba(139,92,246,0.15)' }}>
                  <span>{a.icon}</span>
                  <span>{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent customers */}
          <div className="glass-card p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold" style={{ color: darkMode?'white':'#1e1b4b', fontFamily:'Playfair Display,serif' }}>Recent Clients</h3>
              <button onClick={() => setActiveSection('customers')} className="text-xs text-purple-400 hover:text-pink-400 transition-colors flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {customers.slice(0,3).map(c => (
                <div key={c.id} className="flex items-center gap-3 p-2 rounded-xl" style={{ background: gc }}>
                  <img src={c.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: darkMode?'white':'#1e1b4b' }}>{c.name}</div>
                    <div className="text-xs text-gray-400">{c.events} events • ${c.totalSpent.toLocaleString()}</div>
                  </div>
                  <span className="badge" style={{ background:c.status==='vip'?'rgba(245,158,11,0.2)':'rgba(34,197,94,0.2)', color:c.status==='vip'?'#fbbf24':'#34d399' }}>
                    {c.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}