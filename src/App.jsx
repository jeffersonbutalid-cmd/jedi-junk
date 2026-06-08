import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CleanoutPage from './pages/CleanoutPage';
import SameDayPage from './pages/SameDayPage';
import MattressPage from './pages/MattressPage';
import JunkHaulingPage from './pages/JunkHaulingPage';
import OrangeCountyPage from './pages/OrangeCountyPage';
import ThankYouPage from './pages/ThankYouPage';
import DashboardPage from './pages/DashboardPage';
import Analytics from './components/Analytics';
import ConsentBanner from './components/ConsentBanner';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CleanoutPage />} />
        <Route path="/cleanouts" element={<CleanoutPage />} />
        <Route path="/same-day" element={<SameDayPage />} />
        <Route path="/mattress-removal" element={<MattressPage />} />
        <Route path="/junk-hauling" element={<JunkHaulingPage />} />
        <Route path="/orange-county" element={<OrangeCountyPage />} />
        <Route path="/booking-thank-you" element={<ThankYouPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* No silent fallback: unknown client-side routes go home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
      <ConsentBanner />
    </BrowserRouter>
  );
}
