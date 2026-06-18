import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const BACKEND = 'http://localhost:8081';

const INITIAL_CUSTOMERS = [
  { id: 1, name: "Sarah Johnson", email: "sarah@gmail.com", phone: "+1 555-0101", events: 2, totalSpent: 3200, status: "active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80", joined: "2025-11-15" },
  { id: 2, name: "Michael Chen", email: "mchen@corp.com", phone: "+1 555-0202", events: 1, totalSpent: 5000, status: "active", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80", joined: "2026-01-08" },
  { id: 3, name: "Emily Rodriguez", email: "emily.r@gmail.com", phone: "+1 555-0303", events: 3, totalSpent: 28500, status: "vip", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80", joined: "2025-08-22" },
  { id: 4, name: "David Park", email: "dpark@biz.com", phone: "+1 555-0404", events: 1, totalSpent: 18000, status: "active", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80", joined: "2026-02-14" },
  { id: 5, name: "Aisha Williams", email: "aisha.w@mail.com", phone: "+1 555-0505", events: 4, totalSpent: 12400, status: "vip", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80", joined: "2025-06-30" },
];

const INITIAL_VENDORS = [
  { id: 1, name: "Blossom Florists", category: "Decoration", rating: 4.8, price: "$500-2000", contact: "blossom@flowers.com", image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=200&q=80" },
  { id: 2, name: "Elite Catering Co.", category: "Catering", rating: 4.9, price: "$50-150/head", contact: "info@elitecatering.com", image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=200&q=80" },
  { id: 3, name: "DJ Beats Pro", category: "Entertainment", rating: 4.7, price: "$800-2500", contact: "djbeats@music.com", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&q=80" },
  { id: 4, name: "Picture Perfect Photo", category: "Photography", rating: 5.0, price: "$1200-4000", contact: "hi@pictureperfect.com", image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=200&q=80" },
  { id: 5, name: "Grand Palace Venue", category: "Venue", rating: 4.6, price: "$2000-8000", contact: "events@grandpalace.com", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&q=80" },
];

const INITIAL_FEEDBACK = [
  { id: 1, customer: "Emily Rodriguez", event: "Johnson Wedding", rating: 5, comment: "Absolutely magical!", date: "2026-01-20", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" },
  { id: 2, customer: "David Park", event: "Corporate Gala 2025", rating: 4, comment: "Very professional service.", date: "2025-12-15", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80" },
  { id: 3, customer: "Sarah Johnson", event: "Birthday Bash", rating: 5, comment: "Best birthday party ever!", date: "2026-02-28", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
];

const INITIAL_EXPENSES = {
  1: [
    { id: 1, category: "Decoration", amount: 400, total: 600, icon: "🌸" },
    { id: 2, category: "Food & Drinks", amount: 600, total: 700, icon: "🍰" },
    { id: 3, category: "Music", amount: 200, total: 200, icon: "🎵" },
  ],
  4: [
    { id: 1, category: "Venue", amount: 8000, total: 10000, icon: "🏛️" },
    { id: 2, category: "Catering", amount: 9000, total: 12000, icon: "🍽️" },
    { id: 3, category: "Decoration", amount: 4500, total: 5000, icon: "💐" },
    { id: 4, category: "Photography", amount: 2000, total: 3000, icon: "📸" },
  ]
};

const PACKAGES = [
  { id: 1, name: "Starter", price: 999, color: "from-blue-500 to-cyan-500", features: ["Up to 50 guests", "Basic decoration", "Standard catering", "3hr event duration", "1 photographer"], popular: false },
  { id: 2, name: "Premium", price: 2999, color: "from-purple-600 to-pink-600", features: ["Up to 150 guests", "Premium decoration", "Gourmet catering", "6hr event duration", "2 photographers", "DJ/Entertainment", "Floral arrangements"], popular: true },
  { id: 3, name: "Elite", price: 7999, color: "from-amber-500 to-rose-600", features: ["Up to 500 guests", "Luxury decoration", "Premium catering + bar", "Full day event", "3 photographers + video", "Live band", "Custom themes", "Dedicated coordinator"], popular: false },
];

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [vendors] = useState(INITIAL_VENDORS);
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK);
  const [expenses] = useState(INITIAL_EXPENSES);
  const [packages] = useState(PACKAGES);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Johnson Wedding is in 5 days!", type: "warning", time: "2h ago", read: false },
    { id: 2, text: "New RSVP from Emily Rodriguez", type: "success", time: "4h ago", read: false },
    { id: 3, text: "Budget alert: Tech Workshop nearing limit", type: "error", time: "1d ago", read: true },
  ]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const login = useCallback((userData) => setUser(userData), []);
  const logout = useCallback(() => { setUser(null); setActiveSection('dashboard'); }, []);
  const toggleDark = useCallback(() => setDarkMode(p => !p), []);

  // ── Load events from MySQL on startup ──────────────────
  useEffect(() => {
    fetch(`${BACKEND}/api/events`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setEvents(data);
      })
      .catch(() => console.log('Backend not connected, events empty'));
  }, []);

  // ── Save event to MySQL ────────────────────────────────
  const addEvent = useCallback(async (ev) => {
    try {
      const res = await fetch(`${BACKEND}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ev.name,
          category: ev.category || 'Other',
          date: ev.date,
          time: ev.time || '',
          location: ev.location,
          description: ev.description || '',
          guests: +ev.guests || 0,
          maxGuests: +ev.maxGuests || 100,
          budget: +ev.budget || 0,
          status: 'upcoming',
          image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80'
        })
      });
      if (res.ok) {
        const saved = await res.json();
        setEvents(prev => [...prev, { ...saved, tasks: [] }]);
      } else {
        alert('Failed to save event to database!');
      }
    } catch (err) {
      console.error('Backend error:', err);
      alert('Backend not connected! Event not saved to database.');
    }
  }, []);

  // ── Delete event from MySQL ────────────────────────────
  const deleteEvent = useCallback(async (id) => {
    try {
      await fetch(`${BACKEND}/api/events/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Delete error:', err);
    }
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  // ── Add customer ───────────────────────────────────────
  const addCustomer = useCallback((c) => {
    setCustomers(prev => [...prev, {
      ...c, id: Date.now(), events: 0, totalSpent: 0, status: 'active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
      joined: new Date().toISOString().split('T')[0]
    }]);
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const addFeedback = useCallback((fb) => {
    setFeedback(prev => [...prev, { ...fb, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);
  }, []);

  const value = {
    darkMode, toggleDark, user, login, logout,
    events, addEvent, deleteEvent,
    customers, addCustomer,
    vendors, feedback, addFeedback,
    expenses, packages, notifications, markNotificationRead,
    activeSection, setActiveSection,
    sidebarOpen, setSidebarOpen,
  };

  return (
    <AppContext.Provider value={value}>
      <div className={darkMode ? 'dark' : 'light'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};