<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
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
src/
├─ assets/ # Images and icons
├─ components/ # Navbar, Dashboard, ProtectedRoute, etc.
├─ context/ # AppContext and provider
├─ pages/ # Home, Login, EmailVerify, ResetPassword
├─ App.jsx # Main App with routes
└─ main.jsx # Entry point

```
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


>>>>>>> e98b1b074287b17fbb9e0a6b652d64a422e2d5dc
