import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ClubsPage } from './pages/ClubsPage';
import { ClubDetailPage } from './pages/ClubDetailPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { MyApplicationsPage } from './pages/MyApplicationsPage';
import { SavedClubsPage } from './pages/SavedClubsPage';
import { LikedClubsPage } from './pages/LikedClubsPage';
import { AuthPage } from './pages/AuthPage';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/clubs" element={<ClubsPage />} />
                <Route path="/club/:id" element={<ClubDetailPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/event/:id" element={<EventDetailPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/my-applications" element={<MyApplicationsPage />} />
                <Route path="/saved-clubs" element={<SavedClubsPage />} />
                <Route path="/liked-clubs" element={<LikedClubsPage />} />
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
