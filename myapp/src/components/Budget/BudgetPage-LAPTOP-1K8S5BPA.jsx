import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, Plus, Upload } from 'lucide-react';

const COLORS = ['#8b5cf6','#ec4899','#06b6d4','#10b981','#f59e0b','#ef4444'];

export default function BudgetPage() {
  const { events, expenses, darkMode } = useApp();
  const [selEvent, setSelEvent] = useState(events[0]?.id || null);
  const [showAdd, setShowAdd] = useState(false);
  const [newExp, setNewExp] = useState({ category:'', amount:'' });

  const curEvent = events.find(e => e.id === selEvent);
  const curExpenses = expenses[selEvent] || [];
  const totalBudget = curEvent?.budget || 0;
  const totalSpent = curExpenses.reduce((s,e) => s+e.amount, 0);
  const remaining = totalBudget - totalSpent;
  const pct = totalBudget > 0 ? Math.round((totalSpent/totalBudget)*100) : 0;

  const allBudgetData = events.map(e => ({
    name: e.name.split(' ').slice(0,2).join(' '),
    budget: e.budget,
    spent: (expenses[e.id] || []).reduce((s,x)=>s+x.amount,0),
  }));

  const tc = darkMode ? 'white' : '#1e1b4b';
  const gc = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(139,92,246,0.04)';

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Total Budget', value:`$${events.reduce((s,e)=>s+e.budget,0).toLocaleString()}`, icon:DollarSign, color:'#8b5cf6' },
          { label:'Total Spent', value:`$${Object.values(expenses).flat().reduce((s,e)=>s+e.amount,0).toLocaleString()}`, icon:TrendingDown, color:'#ec4899' },
          { label:'Remaining', value:`$${(events.reduce((s,e)=>s+e.budget,0)-Object.values(expenses).flat().reduce((s,e)=>s+e.amount,0)).toLocaleString()}`, icon:TrendingUp, color:'#10b981' },
          { label:'Over Budget', value:`${events.filter(e=>(expenses[e.id]||[]).reduce((s,x)=>s+x.amount,0)>e.budget).length} events`, icon:AlertCircle, color:'#f59e0b' },
        ].map((s,i)=>(
          <div key={i} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:`${s.color}22` }}>
                <s.icon className="w-4 h-4" style={{ color:s.color }} />
              </div>
            </div>
            <div className="text-xl font-bold" style={{ color:tc }}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Budget vs Spent bar chart */}
        <div className="glass-card p-5">
          <h3 className="font-semibold mb-4" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>Budget vs Spent by Event</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={allBudgetData} barCategoryGap="30%">
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize:10 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize:10 }} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background:darkMode?'#1a1830':'white', border:'1px solid rgba(139,92,246,0.3)', borderRadius:8, color:tc }} formatter={v=>`$${v.toLocaleString()}`} />
              <Bar dataKey="budget" fill="#8b5cf6" radius={[4,4,0,0]} name="Budget" />
              <Bar dataKey="spent" fill="#ec4899" radius={[4,4,0,0]} name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Event expense breakdown */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>Expense Breakdown</h3>
            <select className="form-input w-auto text-xs py-1.5"
              value={selEvent || ''} onChange={e=>setSelEvent(+e.target.value)}>
              {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>

          {/* Budget gauge */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-2xl font-bold" style={{ color:pct>90?'#ef4444':pct>70?'#f59e0b':'#10b981' }}>{pct}%</div>
              <div className="text-xs text-gray-400">of budget used</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-400">${remaining.toLocaleString()}</div>
              <div className="text-xs text-gray-400">remaining</div>
            </div>
          </div>
          <div className="progress-bar mb-4">
            <div className="progress-fill" style={{ width:`${Math.min(pct,100)}%`, background:pct>90?'linear-gradient(90deg,#ef4444,#f87171)':pct>70?'linear-gradient(90deg,#f59e0b,#fbbf24)':undefined }} />
          </div>

          {/* Category expenses */}
          <div className="space-y-3">
            {curExpenses.map(ex => {
              const catPct = Math.round((ex.amount/ex.total)*100);
              return (
                <div key={ex.id}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span>{ex.icon}</span>
                      <span style={{ color:tc }}>{ex.category}</span>
                    </div>
                    <div className="text-xs text-gray-400">${ex.amount.toLocaleString()} / ${ex.total.toLocaleString()}</div>
                  </div>
                  <div className="expense-bar">
                    <div className="expense-fill" style={{ width:`${catPct}%`, background: COLORS[ex.id%COLORS.length] }} />
                  </div>
                </div>
              );
            })}
            {curExpenses.length === 0 && (
              <div className="text-center py-6 text-gray-500 text-sm">No expenses tracked yet</div>
            )}
          </div>

          {/* Add expense */}
          <button onClick={() => setShowAdd(p=>!p)} className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ background:'rgba(139,92,246,0.1)', border:'1px dashed rgba(139,92,246,0.3)', color:'#a78bfa' }}>
            <Plus className="w-3 h-3" /> Add Expense
          </button>

          {showAdd && (
            <div className="mt-3 p-3 rounded-xl space-y-2" style={{ background:gc }}>
              <input className="form-input text-xs py-2" placeholder="Category (e.g. Catering)" value={newExp.category} onChange={e=>setNewExp(p=>({...p,category:e.target.value}))} />
              <input type="number" className="form-input text-xs py-2" placeholder="Amount ($)" value={newExp.amount} onChange={e=>setNewExp(p=>({...p,amount:e.target.value}))} />
              <div className="flex gap-2">
                <button onClick={()=>setShowAdd(false)} className="flex-1 py-1.5 rounded-lg text-xs border border-gray-600 text-gray-400">Cancel</button>
                <button className="flex-1 btn-gradient py-1.5 rounded-lg text-xs font-medium">Save</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Bills section */}
      <div className="glass-card p-5">
        <h3 className="font-semibold mb-4" style={{ color:tc, fontFamily:'Playfair Display,serif' }}>📎 Upload Bills & Receipts</h3>
        <div className="border-2 border-dashed rounded-xl p-8 text-center transition-all hover:border-purple-500 cursor-pointer"
          style={{ borderColor:'rgba(139,92,246,0.3)' }}>
          <Upload className="w-10 h-10 mx-auto mb-3 text-gray-500" />
          <p className="text-sm text-gray-400">Drag & drop bills/receipts here</p>
          <p className="text-xs text-gray-500 mt-1">Supports PDF, JPG, PNG up to 10MB</p>
          <button className="btn-gradient px-6 py-2 rounded-xl text-sm font-medium mt-4">Browse Files</button>
        </div>
      </div>
    </div>
  );
}