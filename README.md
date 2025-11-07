# Car Rental – Week 2 Backend (Routes, DB, Auth, Roles)

This is a ready-to-run Node/Express API implementing **Week 2** tasks:
- Routing for auth, users, admin, seller
- MongoDB integration with Mongoose
- Authentication (JWT) + role-based authorization
- User Management (signup, login, logout, profile) for roles: user, admin, seller
- Postman collection included (`postman/CarRentalWeek2.postman_collection.json`)
- VS Code config, scripts, and Notion page template

## Quick Start (VS Code)

1) **Install**: open the folder in VS Code
2) `cd server && cp .env.example .env`
3) Update `.env`:
```
PORT=7000
MONGO_URI=mongodb://127.0.0.1:27017/carrental_week2
JWT_SECRET=replace_me
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```
4) Install deps:
```
npm install
```
5) Run dev server (with nodemon):
```
npm run dev
```
6) Health check: open `http://localhost:7000/health`

## Routes Summary

Auth (public):
- `POST /api/auth/signup`  `{ name, email, password, role }`
- `POST /api/auth/login`   `{ email, password }`

Auth (protected):
- `POST /api/auth/logout`
- `GET  /api/auth/profile`
- `GET  /api/auth/check-user`
- `GET  /api/auth/check-admin`

Users (protected):  
- `GET /api/users/me`  (user|admin|seller)

Admin (protected):  
- `GET /api/admin/users`  (admin only)

Seller (protected):  
- `GET /api/seller/dashboard`  (seller only)

## Postman

Import `postman/CarRentalWeek2.postman_collection.json`, set `{{baseUrl}}` environment var to `http://localhost:7000`, and use `{{token}}` to authorize (saved automatically by the tests).

## GitHub

```bash
git init
git add .
git commit -m "Week 2: routes, db, auth, roles"
git branch -M main
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

## Notes
- JWT logout is stateless; to "logout", the client discards the token.
- Add more models (Vehicle, Reservation) in Week 3/4.