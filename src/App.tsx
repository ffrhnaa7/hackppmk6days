import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { EventPage } from './pages/EventPage';
import { ExplorePage } from './pages/ExplorePage';
import { ClubHubPage } from './pages/ClubHubPage';
import { SavedClubsPage } from './pages/SavedClubsPage';
import { AuthPage } from './pages/AuthPage';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-mint-50">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/event/:id" element={<EventPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/clubs" element={<ClubHubPage />} />
                <Route path="/saved-clubs" element={<SavedClubsPage />} />
                <Route path="/auth" element={<AuthPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
