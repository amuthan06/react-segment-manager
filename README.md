REACT SEGMENT MANAGER
A modular React + Tailwind CSS application for managing and saving segment schemas to a backend server via proxy (with Node.js Express), following modern frontend and API best practices.

Features
-> Add, remove, and manage schema fields for segments.
-> Prevent duplicate selection and support dynamic dropdowns.
-> Scrollable, user-friendly UI with modal popup for schema management.
-> Save data securely to backend API (with CORS proxy for development).
-> Toast (notification) messages for success or error.
-> Intuitive, clean component and folder structure.

Tech Stack:
-> React (functional components, hooks)
-> Tailwind CSS
-> Node.js + Express (for proxy backend)
-> Vite (recommended for development)
-> Webhook.site (demo API)

_____________________________________________________________________________________________

Getting Started:-
1. Clone the Repo:
- git clone https://github.com/amuthan06/react-segment-manager.git
- cd react-segment-manager/segment-manager

2. Install Dependencies:
- npm install

3. Setup Tailwind (if not pre-configured):
- Ensure your project has tailwind.config.js & proper index.css setup (see code).

4. Run Development Server:
- npm run dev (Run frontend double check - react-segment-manager\segment-manager)
# App runs at http://localhost:5173 (default Vite port)

5. Open split terminal and setup backend proxy:
- cd ../backend
- npm install
- node server.js  (Run backend double check - react-segment-manager\backend>)
# Backend proxy runs at http://localhost:3001
Ensure your React app fetches to http://localhost:3001/send-to-webhook (SegmentModel.jsx)

6. Configure Webhook
Get your unique URL from webhook.site
Put it inside server.js as WEBHOOK_URL.

Usage:-
-> Click Save segment to open the modal.
-> Enter segment name.
-> Select schema(s) from dropdown and click "+ Add new schema".
-> Remove schema with the "−" icon as needed.
-> Click Save the segment to send data.
-> Toast notification appears automatically for success/error.
-> Click outside popup or the "Close" button to dismiss modal.

Project Structure:-

segment-manager/
  public/
  src/
    assets/
    components/
      SegmentModal.jsx       // Main modal logic/UI
    constants/
      schemaOptions.js       // Centralized schema definition
    App.jsx                  // App wrapper and toasts
    main.jsx
    index.css
  backend/
    server.js                // Node.js Express proxy backend
  tailwind.config.js
  README.md

Advanced Notes
CORS: Browser requests to webhook.site are blocked (by browser CORS). Proxy backend (server. js)         enables seamless POST requests from your React frontend.

Modularity: Easily add new schemas, swap backend APIs, or extend UI components.

Accessibility: Modal can be closed by clicking outside, button, or escape key.