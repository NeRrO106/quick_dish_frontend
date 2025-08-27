# 🍕 QuickDish – Food Ordering App - (frontend)

> Aplicație web pentru gestionarea comenzilor, produselor și utilizatorilor.  
> Construită cu **React 19, Vite, TailwindCSS, React Query, Firebase** și un backend .NET cu autentificare bazată pe cookie-uri.

---

## 🚀 Tech Stack
- ⚡ [Vite](https://vitejs.dev/) – build rapid
- ⚛️ [React 19](https://react.dev/) – UI modern
- 🎨 [TailwindCSS](https://tailwindcss.com/) – styling
- 🔥 [Firebase](https://firebase.google.com/) – stocare imagini
- 📦 [React Query](https://tanstack.com/query/v5) – data fetching
- 🍞 [React Toastify](https://fkhadra.github.io/react-toastify/) – notificări
- 🔐 ASP.NET + Cookie Auth – backend & autentificare

---

## 📂 Structura proiectului
```plaintext
Proxy/               # Proxy pentru API .NET
src/
├─ components/       # Navbar, Footer
├─ features/         # Auth, Cart, Products, Users, Orders
├─ hooks/            # useCurrentUser, useSyncUserWithCookie
├─ pages/            # Hero, Menu, About, Contact etc.
├─ routes/           # Protecție rute & redirecturi
├─ utils/            # Funcții ajutătoare (fetch, toast)
└─ App.tsx
.env
package.json
vite.config.ts

```
---

## ⚙️ Instalare & Rulare

1. Clonează repo:
   ```bash
   git clone https://github.com/user/ceva.git
   cd ceva

2. Instalează dependențele:
   ```bash
   npm install

4. Rulează în development:
   ```bash
   npm run dev
5. Build pentru productie:
   ```bash
   npm run build

## ✨ Features
  - 🔑 Autentificare cu roluri (Admin, Manager, Courier, Client, Guest)
  - 📦 CRUD pentru produse și utilizatori
  - 🛒 Coș de cumpărături cu finalizare comandă
  - 📸 Upload imagini în Firebase
  - ⚡ Filtrare și sortare produse (categorie, preț, alfabetic)
  - 🔔 Toast notifications pentru acțiuni

📜 License
  Distributed under the MIT License.
