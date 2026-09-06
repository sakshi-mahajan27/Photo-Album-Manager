# Photo Album Manager

A lightweight, responsive browser-based Photo Album Manager application built with **React.js**, **React Router**, **Bootstrap 5**, and **JSON Server**.

---

## 📌 Project Overview

**Problem Statement:**  
Users need a simple, intuitive, and browser-based tool to organize photos into albums, view photo details, filter photos by title, and manage their collections without complex database configurations or cloud authentications.

**Solution:**  
Photo Album Manager provides a clean local REST API-backed application where users can create albums, manage photos inside individual albums, perform real-time photo title searches, and organize visual content seamlessly.

---

## 🚀 Technology Stack

- **Frontend Core:** HTML5, CSS3, JavaScript (ES6+)
- **UI Framework:** React.js (Functional Components, Hooks)
- **Styling:** Bootstrap 5 & Custom CSS (Indigo/Purple Theme)
- **Routing:** React Router v7 (`BrowserRouter`, `Routes`, `Route`, `useParams`)
- **Backend / Data Storage:** JSON Server (Local REST API saving to `db.json`)
- **Build Tool:** Vite

---

## 📁 Project Structure

```
photo-album-manager/
│
├── public/
│   └── index.html          # Main HTML entry point
│
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation bar header
│   │   ├── AlbumCard.jsx   # Individual album item display card
│   │   ├── AlbumForm.jsx   # Controlled form to add new album
│   │   ├── PhotoCard.jsx   # Photo thumbnail card with delete action
│   │   ├── PhotoForm.jsx   # Form to add a photo to an album
│   │   └── SearchBar.jsx   # Instant search bar input component
│   │
│   ├── pages/              # Main route views
│   │   ├── AlbumsPage.jsx        # Home view displaying all albums
│   │   └── AlbumDetailPage.jsx   # Album view with photo grid & search
│   │
│   ├── App.jsx             # Main application layout and router setup
│   ├── index.jsx           # React DOM root render file
│   └── index.css           # Global theme variables & custom utilities
│
├── db.json                 # Local database file for JSON Server
├── package.json            # Project dependencies and script runner configs
└── README.md               # Project documentation
```

---

## 🛣️ Application Routes

| Route | Page Component | Description |
| :--- | :--- | :--- |
| `/` | `AlbumsPage` | Home page listing all albums, creation form, & album count |
| `/albums/:id` | `AlbumDetailPage` | Album detail view displaying photos, search filter, & add photo form |

---

## 🌐 API Endpoints (JSON Server)

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `http://localhost:5000/albums` | Retrieve list of all albums |
| `POST` | `http://localhost:5000/albums` | Create a new album |
| `DELETE` | `http://localhost:5000/albums/:id` | Delete an album |
| `GET` | `http://localhost:5000/photos?albumId=:id` | Retrieve photos for a specific album |
| `POST` | `http://localhost:5000/photos` | Add a photo to an album |
| `DELETE` | `http://localhost:5000/photos/:id` | Delete a specific photo |

---

## ⚙️ Installation & Running Locally

### 1. Clone or Open the Project
Open terminal in the project root directory (`Photo Album Manager`).

### 2. Install Dependencies
```bash
npm install
```

### 3. Start JSON Server (REST Backend API)
In terminal 1:
```bash
npm run server
```
*JSON Server runs on `http://localhost:5000`.*

### 4. Start React Frontend Application
In terminal 2:
```bash
npm run dev
```
*Vite Dev Server runs on `http://localhost:5173`.*

---

## 🛠️ Features & Highlights

- **Clean UI & Responsive Grid:** Adapts seamlessly across Mobile, Tablet, and Desktop screens.
- **REST API Integration:** Performs asynchronous `fetch()` requests (`GET`, `POST`, `DELETE`).
- **Data Validation:** Ensures required inputs (Album Name, Photo Title, Photo URL) before submission.
- **Instant Photo Filtering:** Case-insensitive search filter by title within individual albums.
- **Empty States:** Friendly user messages when no albums or photos exist.
