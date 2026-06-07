# 🏛️ ZYRA — Luxury Full-Stack E-Commerce Experience

ZYRA is an ultra-minimalist, high-end e-commerce platform designed with an editorial aesthetic inspired by premium fashion houses like Saint Laurent and Zara. It seamlessly blends cinematic, silky-smooth frontend motions with a secure, production-grade full-stack architecture.

---

## ✨ Features

### 🎨 Frontend & Motion Design
- **Cinematic Pre-loader:** A custom, glitch-free text-masked pre-loader powered by **GSAP** featuring advanced `power4.inOut` motion easing.
- **Micro-interactions:** Sophisticated hover states and fluid layout transitions structured with custom timing variables.
- **Audio-Enhanced Cookie Banner:** A smart privacy popup integrated with the **Web Audio API** that bypasses strict browser autoplay blocks using user-interaction triggers.
- Live link----https://zyra-editions.vercel.app/

### ⚙️ Backend & Security
- **Robust User System:** Complete, secure user registration and login flows with JWT-based session management and protected routing.
- **Dynamic Inventory API:** Scalable RESTful endpoints to manage products, sync shopping carts in real-time, and execute live stock validation.
- **Database Architecture:** Optimized database schema designed to handle fast data fetching under complex transactional states.

### 💳 Transactional Flow
- **Payment Gateway Integration:** Integrated a production-ready checkout experience using **Stripe / Razorpay**.
- **Automated Webhooks:** Configured secure backend webhooks to process payments instantly, update database orders, and handle edge-case transaction failures.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, GSAP (GreenSock)
- **Backend:** Node.js, Express / Next.js API Routes, JWT (JSON Web Tokens)
- **Database:** [Your Database: e.g., MongoDB / PostgreSQL / Prisma]
- **Payments:** Stripe / Razorpay API & Webhooks
- **Bundler/Compiler:** Turbopack (Optimized using `optimizePackageImports`)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/zyra.git](https://github.com/your-username/zyra.git)
cd zyra
