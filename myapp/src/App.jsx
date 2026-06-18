import React from 'react';
import { useApp } from './context/AppContext';
import AuthPage from './components/Auth/AuthPage';
import Navbar from './components/Dashboard/Navbar';
import Sidebar from './components/Dashboard/Sidebar';
import DashboardHome from './components/Dashboard/DashboardHome';
import EventsPage from './components/Events/EventsPage';
import CustomersPage from './components/Customers/CustomersPage';
import BookingsPage from './components/Bookings/BookingsPage';
import CalendarPage from './components/Calendar/CalendarPage';
import BudgetPage from './components/Budget/BudgetPage';
import { VendorsPage, QuotesPage, PaymentsPage, MediaPage, FeedbackPage, SettingsPage } from './components/misc/MiscPages';

const SECTION_CONFIG = {
  dashboard: { component: DashboardHome, title: 'Dashboard' },
  events: { component: EventsPage, title: 'Events' },
  bookings: { component: BookingsPage, title: 'Bookings' },
  customers: { component: CustomersPage, title: 'Customers' },
  calendar: { component: CalendarPage, title: 'Calendar' },
  budget: { component: BudgetPage, title: 'Budget & Expenses' },
  vendors: { component: VendorsPage, title: 'Vendors & Locations' },
  quotes: { component: QuotesPage, title: 'Packages & Quotes' },
  payments: { component: PaymentsPage, title: 'Payments' },
  media: { component: MediaPage, title: 'Media Gallery' },
  feedback: { component: FeedbackPage, title: 'Feedback & Ratings' },
  settings: { component: SettingsPage, title: 'Settings' },
};

function MainApp() {
  const { activeSection, darkMode } = useApp();
  const cfg = SECTION_CONFIG[activeSection] || SECTION_CONFIG.dashboard;
  const Component = cfg.component;
  return (
    <div className="flex min-h-screen" style={{ background: darkMode ? '#0f0e1a' : '#f8f7ff' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: 260, minWidth: 0 }}>
        <Navbar title={cfg.title} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Component />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const { user } = useApp();
  return user ? <MainApp /> : <AuthPage />;
}