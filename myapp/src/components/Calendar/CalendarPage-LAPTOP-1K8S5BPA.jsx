import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function CalendarPage() {
  const { events, darkMode } = useApp();
  const [cur, setCur] = useState(new Date(2026, 2, 1));
  const [selected, setSelected] = useState(null);

  const year = cur.getFullYear();
  const month = cur.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();

  const bookedDates = new Set(events.map(e => e.date));
  const eventsByDate = events.reduce((acc, e) => {
    if (!acc[e.date]) acc[e.date] = [];
    acc[e.date].push(e);
    return acc;
  }, {});

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  const prevMonth = () => setCur(new Date(year, month-1, 1));
  const nextMonth = () => setCur(new Date(year, month+1, 1));

  const formatDate = (d) => `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

  const tc = darkMode ? 'white' : '#1e1b4b';
  const gc = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(139,92,246,0.04)';

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Calendar */}
        <div className="lg:col-span-2 glass-card p-5">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>
              {MONTHS[month]} {year}
            </h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-purple-500 hover:bg-opacity-10 transition-all" style={{ color:'#9ca3af' }}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-purple-500 hover:bg-opacity-10 transition-all" style={{ color:'#9ca3af' }}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-medium py-2" style={{ color:'#9ca3af' }}>{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty slots */}
            {Array.from({length:firstDay},(_,i) => <div key={`e${i}`} />)}
            {/* Days */}
            {Array.from({length:daysInMonth},(_,i) => {
              const day = i+1;
              const dateStr = formatDate(day);
              const isBooked = bookedDates.has(dateStr);
              const isToday = dateStr===todayStr;
              const isSel = selected===dateStr;
              const dayEvents = eventsByDate[dateStr] || [];
              return (
                <button key={day} onClick={() => setSelected(isSel?null:dateStr)}
                  className={`relative p-2 rounded-xl text-sm transition-all min-h-[3rem] flex flex-col items-center justify-start
                    ${isSel ? 'ring-2 ring-purple-500' : ''}
                    ${isToday ? 'font-bold' : ''}
                    ${isBooked ? '' : 'hover:bg-purple-500 hover:bg-opacity-10'}`}
                  style={{
                    background: isSel ? 'rgba(139,92,246,0.3)' : isBooked ? 'rgba(236,72,153,0.15)' : 'transparent',
                    color: isToday ? '#a78bfa' : isBooked ? '#f472b6' : darkMode ? '#e2e8f0' : '#374151',
                    border: isToday ? '1px solid rgba(139,92,246,0.5)' : isBooked ? '1px solid rgba(236,72,153,0.3)' : '1px solid transparent',
                  }}>
                  <span>{day}</span>
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-1">
                      {dayEvents.slice(0,3).map((_,i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: ['#8b5cf6','#ec4899','#10b981'][i] }} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mt-4 pt-4 border-t" style={{ borderColor:'rgba(255,255,255,0.06)' }}>
            {[['Booked','rgba(236,72,153,0.5)'],['Today','rgba(139,92,246,0.5)'],['Available','rgba(34,197,94,0.5)']].map(([l,c])=>(
              <div key={l} className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-3 h-3 rounded-sm" style={{ background:c }} />
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Selected date events */}
          {selected && eventsByDate[selected] ? (
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3 text-sm" style={{ color:tc }}>
                📅 {selected}
              </h3>
              {eventsByDate[selected].map(e => (
                <div key={e.id} className="p-3 rounded-xl mb-2" style={{ background:gc, border:'1px solid rgba(139,92,246,0.15)' }}>
                  <div className="font-medium text-sm" style={{ color:tc }}>{e.name}</div>
                  <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />{e.time}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />{e.location.split(',')[0]}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-4">
              <div className="text-center py-4">
                <Calendar className="w-10 h-10 mx-auto mb-2 text-gray-600" />
                <p className="text-sm text-gray-400">Click a date to see events</p>
              </div>
            </div>
          )}

          {/* Upcoming events list */}
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-3 text-sm" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>
              Upcoming Events
            </h3>
            <div className="space-y-2">
              {events.slice(0,5).map(e => (
                <div key={e.id} className="flex items-center gap-3 p-2 rounded-xl" style={{ background:gc }}>
                  <div className="w-10 h-10 rounded-lg btn-gradient flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold leading-none">{e.date.split('-')[2]}</span>
                    <span className="text-white text-xs opacity-70 leading-none">{MONTHS[+e.date.split('-')[1]-1].slice(0,3)}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color:tc }}>{e.name}</div>
                    <div className="text-xs text-gray-400">{e.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Month summary */}
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-3 text-sm" style={{ color:tc }}>Month Summary</h3>
            {[
              ['Total Events', events.length, '#8b5cf6'],
              ['Booked Dates', bookedDates.size, '#ec4899'],
              ['Available Days', daysInMonth - bookedDates.size, '#10b981'],
            ].map(([l,v,c])=>(
              <div key={l} className="flex justify-between items-center py-2 border-b" style={{ borderColor:'rgba(255,255,255,0.04)' }}>
                <span className="text-sm text-gray-400">{l}</span>
                <span className="font-bold text-sm" style={{ color:c }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}