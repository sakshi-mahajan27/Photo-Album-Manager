# Photo Album Manager

A lightweight, responsive browser-based Photo Album Manager application built with **React.js**, **React Router**, **Bootstrap 5**, and **JSON Server**.

---

## 1. Project Overview
Photo Album Manager is a local web application that allows users to create photo albums, view photos, add new photos, search photos by title, and delete photos or entire albums. The system runs locally without requiring user authentication or cloud databases.

---

## 2. Problem Statement
Managing personal photos often requires heavy desktop applications or cloud services with complex login authentications. Users frequently need a simple, fast, browser-based tool to organize image collections into albums, view photos, filter them instantly by title, and persist data locally.

---

## 3. Objectives
- Build a lightweight single-page application (SPA) using React.js functional components and hooks.
- Implement client-side routing with React Router (`/` and `/albums/:id`).
- Enable local persistence using JSON Server REST API endpoints (`GET`, `POST`, `DELETE`).
- Create responsive layouts for desktop, tablet, and mobile using Bootstrap 5.
- Provide user-friendly form validations, loading indicators, error handling, and empty states.

---

## 4. Key Features
- **Album Management**: Create new albums, display album grid cards with photo counts, and delete albums.
- **Photo Management**: Open albums, view thumbnail cards, add photos with title & URL, and delete individual photos.
- **Instant Search**: Case-insensitive photo title search within individual albums.
- **Image Fallback**: Automatic replacement placeholder for broken image URLs.
- **Data Persistence**: Automatic synchronization with `db.json` via REST API.
- **Responsive Layout**: Adapts dynamically across mobile, tablet, and desktop viewports.

---

## 5. Technology Stack
- **Frontend Framework**: React.js
- **Routing**: React Router
- **Styling**: Bootstrap 5, FontAwesome Icons, Custom CSS
- **Local REST Backend**: JSON Server
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+), HTML5, CSS3

---

## 6. Project Structure

```
photo-album-manager/
│
├── public/
│   └── index.html              # HTML entry template
│
├── src/
│   ├── assets/                 # Static visual assets
│   │   └── logo.png
│   │
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.jsx          # Header navigation bar
│   │   ├── AlbumCard.jsx       # Individual album card
│   │   ├── AlbumForm.jsx       # Controlled album creation form
│   │   ├── PhotoCard.jsx       # Thumbnail photo display card
│   │   ├── PhotoForm.jsx       # Controlled photo addition form
│   │   └── SearchBar.jsx       # Controlled photo search bar
│   │
│   ├── pages/                  # Main route pages
│   │   ├── AlbumsPage.jsx      # Home view listing all albums
│   │   └── AlbumDetailPage.jsx # Album detail view with photo grid & search
│   │
│   ├── App.jsx                 # Router configuration & main layout
│   ├── index.jsx               # React DOM entry point
│   └── index.css               # Global theme tokens & styles
│
├── db.json                     # JSON Server mock database
├── package.json                # Dependencies and script definitions
└── README.md                   # Project documentation
```

---

## 7. Installation Steps
1. Clone or extract the project folder `Photo Album Manager`.
2. Open terminal in the project root directory.
3. Install all Node package dependencies:
   ```bash
   npm install
   ```

---

## 8. How to Run React Application
To start the Vite development server:
```bash
npm run dev
```
*App will run locally on `http://localhost:5173`.*

---

## 9. How to Run JSON Server
To start the local REST API backend:
```bash
npm run server
```
*JSON Server runs on `http://localhost:5000` watching `db.json`.*

> **Tip**: You can also run both servers concurrently using:
> ```bash
> npm run dev:all
> ```

---

## 10. API Endpoints

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `http://localhost:5000/albums` | Retrieve all album records |
| `GET` | `http://localhost:5000/albums/:id` | Retrieve single album by ID |
| `POST` | `http://localhost:5000/albums` | Create a new album |
| `DELETE` | `http://localhost:5000/albums/:id` | Delete album by ID |
| `GET` | `http://localhost:5000/photos` | Retrieve all photo records |
| `POST` | `http://localhost:5000/photos` | Add photo to an album |
| `DELETE` | `http://localhost:5000/photos/:id` | Delete photo by ID |

---

## 11. Application Routes

| Route | Page Component | Description |
| :--- | :--- | :--- |
| `/` | `AlbumsPage` | Home page listing all albums, album count, & creation form |
| `/albums/:id` | `AlbumDetailPage` | Detail view displaying album photos, photo form, & search bar |

---

## 12. Major Components & Responsibilities
- `Navbar.jsx`: Site header navigation bar visible on all pages.
- `AlbumCard.jsx`: Renders album title, photo count badge, open link, and delete trigger.
- `AlbumForm.jsx`: Controlled form for album name input with trim validation.
- `PhotoCard.jsx`: Displays image thumbnail, title, fallback handler, and delete trigger.
- `PhotoForm.jsx`: Controlled form for photo title and image URL input with validation.
- `SearchBar.jsx`: Controlled input element for instant in-memory photo title search.

---

## 13. How the Application Works
1. **Mounting & Data Fetching**: When `AlbumsPage` mounts, `useEffect` triggers `fetch()` requests to JSON Server (`http://localhost:5000/albums` and `/photos`).
2. **State Management**: Albums and photos arrays are stored in component state using `useState`.
3. **Adding Data**: Submitting forms sends `POST` requests to JSON Server. The new item is appended to local state upon success.
4. **Deleting Data**: Clicking "Delete" prompts user confirmation, sends a `DELETE` request, and updates local state reactively.
5. **Searching**: Typing in `SearchBar` filters `photos` in memory using `photo.title.toLowerCase().includes(searchTerm.toLowerCase())`.
