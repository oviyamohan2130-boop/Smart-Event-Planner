// ─── Backend API Configuration ───────────────────────────────────────────────
// Frontend runs on: http://localhost:3002
// Backend runs on:  http://localhost:8081

const BASE_URL = 'http://localhost:8081';

export const API = {
  BASE: BASE_URL,

  // Health check
  HELLO: `${BASE_URL}/hello`,

  // Auth endpoints (add as you build Spring Boot controllers)
  AUTH: {
    LOGIN:    `${BASE_URL}/api/auth/login`,
    REGISTER: `${BASE_URL}/api/auth/register`,
    LOGOUT:   `${BASE_URL}/api/auth/logout`,
  },

  // Events
  EVENTS: {
    ALL:    `${BASE_URL}/api/events`,
    CREATE: `${BASE_URL}/api/events`,
    UPDATE: (id) => `${BASE_URL}/api/events/${id}`,
    DELETE: (id) => `${BASE_URL}/api/events/${id}`,
    BY_ID:  (id) => `${BASE_URL}/api/events/${id}`,
  },

  // Customers
  CUSTOMERS: {
    ALL:    `${BASE_URL}/api/customers`,
    CREATE: `${BASE_URL}/api/customers`,
    UPDATE: (id) => `${BASE_URL}/api/customers/${id}`,
    DELETE: (id) => `${BASE_URL}/api/customers/${id}`,
  },

  // Bookings
  BOOKINGS: {
    ALL:    `${BASE_URL}/api/bookings`,
    CREATE: `${BASE_URL}/api/bookings`,
    UPDATE: (id) => `${BASE_URL}/api/bookings/${id}`,
  },

  // Budget / Expenses
  EXPENSES: {
    BY_EVENT: (eventId) => `${BASE_URL}/api/expenses/event/${eventId}`,
    CREATE:   `${BASE_URL}/api/expenses`,
    DELETE:   (id) => `${BASE_URL}/api/expenses/${id}`,
  },

  // Vendors
  VENDORS: {
    ALL: `${BASE_URL}/api/vendors`,
  },

  // Feedback
  FEEDBACK: {
    ALL:    `${BASE_URL}/api/feedback`,
    CREATE: `${BASE_URL}/api/feedback`,
  },

  // Payments
  PAYMENTS: {
    ALL:    `${BASE_URL}/api/payments`,
    CREATE: `${BASE_URL}/api/payments`,
  },
};

// ─── Reusable fetch helper ────────────────────────────────────────────────────
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiCall = async (url, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  };
  if (body) options.body = JSON.stringify(body);

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || `HTTP ${res.status}`);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error(`API Error [${method} ${url}]:`, error.message);
    throw error;
  }
};

// ─── Convenience methods ──────────────────────────────────────────────────────
export const get    = (url)         => apiCall(url, 'GET');
export const post   = (url, body)   => apiCall(url, 'POST', body);
export const put    = (url, body)   => apiCall(url, 'PUT', body);
export const del    = (url)         => apiCall(url, 'DELETE');