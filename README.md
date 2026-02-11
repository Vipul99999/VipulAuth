
# VipulAuth - React Authentication System

A modern authentication system built with **React** for the frontend and a backend API for authentication and user management. Features include login, email verification, password reset, and protected routes.

**Demo:** [Live Demo Link](#)

---
## 🚀 Live Demo

![Portfolio Demo](VipulAuthDemo.gif)

---
## Features

- User login and logout
- Email verification with OTP
- Password reset functionality
- Protected routes (Dashboard)
- Session persistence with cookies
- Toast notifications for actions and errors

---

## Tech Stack

- Frontend: React, React Router DOM, Axios, React Toastify
- Backend: Node.js / Express (assumed)
- Styling: TailwindCSS
- State Management: React Context API

---
## Project Structure
```bash
# client
src/
├─ assets/ # Images and icons
├─ components/ # Navbar, Dashboard, ProtectedRoute, etc.
├─ context/ # AppContext and provider
├─ pages/ # Home, Login, EmailVerify, ResetPassword
├─ App.jsx # Main App with routes
└─ main.jsx # Entry point

```

```bash 
server/
├─ config/          # Configuration files (DB connection, environment config) 
|  |-- emailTemplate.js
|  |-- mongodb.js
|  |-- nodemailer.js               
├─ controllers/           # Request handlers for routes
│  ├─ authController.js
│  └─ userController.js
├─ middleware/            # Middleware (auth check, error handling)
│  ├─ userAuth.js
│  
├─ models/                # Mongoose or Sequelize models
│  ├─ userModel.js
│  
├─ routes/                # API routes
│  ├─ authRoutes.js
│  └─ userRoutes.js
├─ .env                   # Environment variables
├─ server.js              # Main entry point
├─ package.json
└─ README.md


---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Vipul99999/vipulauth.git
cd vipulauth
```
### 2. Install Dependency
```bash
npm install
```
### 3. Set up environment variables
```bash
VITE_BACKEND_URL=http://localhost:4000
```
### 4. Start the development server
```bash
Frontend = npm run dev
Backend = node server.js
```


