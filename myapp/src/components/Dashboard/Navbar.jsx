import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, Bell, Search, Plus } from 'lucide-react';

export default function Navbar({ title }) {
  const { user, notifications, markNotificationRead, setSidebarOpen, darkMode, setActiveSection } = useApp();
  const [showNotif, setShowNotif] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 py-3"
      style={{ background: darkMode ? 'rgba(15,14,26,0.95)' : 'rgba(248,247,255,0.95)', backdropFilter: 'blur(20px)', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(139,92,246,0.1)' }}>

      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(p => !p)} className="p-2 rounded-xl hover:bg-purple-500 hover:bg-opacity-10 transition-all lg:hidden">
          <Menu className="w-5 h-5 text-gray-400" />
        </button>
        <h1 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: darkMode?'white':'#1e1b4b' }}>{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
          style={{ background: darkMode?'rgba(255,255,255,0.05)':'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)', color: '#9ca3af' }}>
          <Search className="w-4 h-4" />
          <span>Search...</span>
          <span className="text-xs px-1 rounded" style={{ background: 'rgba(139,92,246,0.2)' }}>⌘K</span>
        </div>

        {/* Create Event */}
        <button onClick={() => setActiveSection('events')}
          className="btn-gradient flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium hidden sm:flex">
          <Plus className="w-4 h-4" />
          Create Event
        </button>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setShowNotif(p=>!p)}
            className="p-2 rounded-xl hover:bg-purple-500 hover:bg-opacity-10 transition-all relative">
            <Bell className="w-5 h-5" style={{ color: darkMode?'#9ca3af':'#6b7280' }} />
            {unread > 0 && <span className="notification-dot" />}
          </button>

          {showNotif && (
            <div className="absolute right-0 top-12 w-80 rounded-2xl overflow-hidden z-50 shadow-2xl"
              style={{ background: darkMode?'#1a1830':'white', border: darkMode?'1px solid rgba(255,255,255,0.1)':'1px solid rgba(139,92,246,0.15)' }}>
              <div className="px-4 py-3 border-b flex justify-between items-center" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="font-semibold text-sm" style={{ color: darkMode?'white':'#1e1b4b' }}>Notifications</span>
                {unread > 0 && <span className="badge" style={{ background:'rgba(236,72,153,0.2)', color:'#f472b6' }}>{unread} new</span>}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} onClick={() => markNotificationRead(n.id)}
                    className={`px-4 py-3 border-b cursor-pointer hover:bg-purple-500 hover:bg-opacity-5 transition-all ${!n.read ? 'opacity-100' : 'opacity-60'}`}
                    style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                    <div className="flex gap-3 items-start">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.type==='warning'?'bg-yellow-400':n.type==='success'?'bg-green-400':'bg-red-400'}`} />
                      <div>
                        <p className="text-sm" style={{ color: darkMode?'#e2e8f0':'#374151' }}>{n.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 text-center">
                <button className="text-xs text-purple-400 hover:text-pink-400 transition-colors">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <img src={user?.avatar} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-purple-500 cursor-pointer" />
      </div>
    </header>
  );
}
