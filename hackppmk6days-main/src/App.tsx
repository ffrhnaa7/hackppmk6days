import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { EventPage } from './pages/EventPage';
import { ClubHubPage } from './pages/ClubHubPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/clubs" element={<ClubHubPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
