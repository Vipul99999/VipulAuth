
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
Client
src/
├─ api/ # api with axios 
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
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_gmail_app_password
NODE_ENV=production
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
SENDER_EMAIL= your_sender_email@gmail.com
EMAIL_PASSWORD=your_email_password
ALLOWED_ORIGINS=http://localhost:5173, your deployed frontend URL (e.g., https://vipulauth-frontend.onrender.com)

```
### 4. Start the development server
```bash
Frontend = npm run dev
Backend = node start 
```


