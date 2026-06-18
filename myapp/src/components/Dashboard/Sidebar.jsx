import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, CalendarDays, Users, BookOpen, Package, MessageSquare,
  CreditCard, Map, Image, Settings, LogOut, Sparkles, ChevronLeft, Star,
  BarChart3, X
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
  { id: 'events', icon: CalendarDays, label: 'Events', badge: null },
  { id: 'bookings', icon: BookOpen, label: 'Bookings', badge: '3' },
  { id: 'customers', icon: Users, label: 'Customers', badge: null },
  { id: 'calendar', icon: CalendarDays, label: 'Calendar', badge: null },
  { id: 'budget', icon: BarChart3, label: 'Budget & Expenses', badge: null },
  { id: 'vendors', icon: Map, label: 'Vendors', badge: null },
  { id: 'quotes', icon: Package, label: 'Packages & Quotes', badge: null },
  { id: 'payments', icon: CreditCard, label: 'Payments', badge: null },
  { id: 'media', icon: Image, label: 'Media Gallery', badge: null },
  { id: 'feedback', icon: Star, label: 'Feedback', badge: null },
  { id: 'settings', icon: Settings, label: 'Settings', badge: null },
];

export default function Sidebar() {
  const { activeSection, setActiveSection, user, logout, toggleDark, darkMode, sidebarOpen, setSidebarOpen } = useApp();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed left-0 top-0 h-full z-50 flex flex-col transition-all duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${sidebarOpen ? 'lg:w-64' : 'lg:w-64'}`}
        style={{ width: 260, background: darkMode ? '#0d0c1d' : '#ffffff', borderRight: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(139,92,246,0.1)' }}>

        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b" style={{ borderColor: darkMode?'rgba(255,255,255,0.06)':'rgba(139,92,246,0.1)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg" style={{ fontFamily:'Playfair Display,serif', color: darkMode?'white':'#1e1b4b' }}>EventPro</span>
              <div className="text-xs" style={{ color:'#8b5cf6' }}>Smart Planner</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User profile mini */}
        <div className="px-4 py-3 mx-3 mt-3 rounded-xl" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
          <div className="flex items-center gap-3">
            <img src={user?.avatar} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-purple-500" />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: darkMode?'white':'#1e1b4b' }}>{user?.name}</div>
              <div className="text-xs text-purple-400 capitalize">{user?.role || 'admin'}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(({ id, icon: Icon, label, badge }) => {
            const active = activeSection === id;
            return (
              <button key={id} onClick={() => { setActiveSection(id); if(window.innerWidth<1024) setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                  ${active ? 'nav-active' : 'hover:bg-opacity-10'}`}
                style={{
                  background: active ? undefined : 'transparent',
                  color: active ? (darkMode?'white':'#6d28d9') : (darkMode?'#9ca3af':'#6b7280'),
                }}>
                <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${active?'text-purple-400':'group-hover:text-purple-400'}`} />
                <span className="flex-1 text-left">{label}</span>
                {badge && (
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background:'rgba(236,72,153,0.2)', color:'#f472b6' }}>{badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t space-y-1" style={{ borderColor: darkMode?'rgba(255,255,255,0.06)':'rgba(139,92,246,0.1)' }}>
          <button onClick={toggleDark}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ color: darkMode?'#9ca3af':'#6b7280' }}>
            <span>{darkMode ? '☀️' : '🌙'}</span>
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500 hover:bg-opacity-10 transition-all">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}