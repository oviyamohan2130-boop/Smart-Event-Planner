🌐 Smart Event Planner

📌 Overview
Smart Event Planner is a full-stack web application designed to simplify and automate the entire process of event organization.
It allows users to register, log in, and manage events through a centralized dashboard.
The system provides a seamless experience for planning, tracking, and organizing events such as birthdays, weddings, corporate meetings, workshops, and conferences.

🔐 Authentication System
Users can register and create an account
Secure login using authentication system
JWT (JSON Web Token) based session handling
Passwords are encrypted using BCrypt
On successful login, users are redirected to the dashboard
Invalid login shows authentication error

🎯 Core Functionality (After Login)

📅 Event Management
Create new events (name, date, time, venue)
Edit or update event details
Delete events
View all scheduled events in dashboard

👥 Guest & Participation Management
Add participants for each event
Track RSVP status (Accepted / Pending / Declined)
Monitor total guest count

🏢 Venue & Organization Tracking
Manage venue details
Categorize events (personal, corporate, social, academic)

⚙️ Tech Stack
🎨 Frontend
React.js (18+)
Tailwind CSS
Responsive UI (mobile + desktop)

🔧 Backend
Spring Boot (Java 17)
REST APIs
MVC Architecture

🗄️ Database
MySQL 8.0
Tables for users, events, guests, bookings

🔐 Security
JWT Authentication
BCrypt password encryption

🧠 Key Features
Secure login & registration system
Real-time event creation and updates
Centralized dashboard
Guest management system
Responsive UI design
Scalable backend APIs

🚀 Workflow
User registers → account created
User logs in → JWT verified
Dashboard opens → event panel appears
User creates and manages events
Data stored in MySQL and updated dynamically

📌 Summary
Smart Event Planner is a modern full-stack event management system that combines secure authentication, efficient event tracking, and a user-friendly interface to simplify event organization from planning and scheduling to participant management and event execution. The platform helps users create, manage, and monitor events seamlessly, improving productivity and reducing manual effort.
