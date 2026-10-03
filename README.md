# EventHub

EventHub is a college event management portal built with React, Vite, Node.js and Express, and MongoDB. It supports role-based access for admins and attendees, event creation, registration, analytics, and profile management.

## Repository

https://github.com/sai-kore/EventHub

## Features

- Admin dashboard with event analytics and user role management
- Attendee event discovery, registration, and ticket management
- Authentication using JWT and protected routes
- Responsive layout with a modern UI

## Setup

1. Clone the repository:

```bash
git clone https://github.com/sai-kore/EventHub.git
cd EventHub/
```

2. Install dependencies:

```bash
cd client
npm install
cd ../server
npm install
```

3. Start the backend server:

```bash
cd server
npm run dev
```

4. Start the frontend app:
   Open new terminal tab and run

```bash
cd EventHub/
cd ./client
npm run dev
```

## Usage

- Open the frontend URL shown by Vite (`http://localhost:5173`).
- Sign up as an attendee or log in using an existing account.
- Admin users can access `/admin/dashboard` and manage events, users, and analytics.
- Attendees can browse events, register, view `My Events`, and manage profiles.
- Here are some existing accounts to login:
<br>

## Existing Accounts

### Admin
* **Email:** `sai@gmail.com`
* **Password:** `123456`

### Attendee
* **Email:** `ben10@gmail.com`
* **Password:** `123456`


## Notes

- Make sure MongoDB is running locally or update `server/config/db.js` for your database URI.
- The frontend uses `src/styles/theme.css` and Tailwind utilities for styling.
