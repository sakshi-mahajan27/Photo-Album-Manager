import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AlbumsPage from './pages/AlbumsPage';
import AlbumDetailPage from './pages/AlbumDetailPage';

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column bg-light">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<AlbumsPage />} />
            <Route path="/albums/:id" element={<AlbumDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
