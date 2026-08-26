import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AppLayout } from '@/app/layouts/AppLayout';
import { useAuth } from '@/app/providers/AuthProvider';
import { AboutPage } from '@/pages/AboutPage';
import { AccountPage } from '@/pages/AccountPage';
import { CardsPage } from '@/pages/CardsPage';
import { ContactPage } from '@/pages/ContactPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { LanguagePairPage } from '@/pages/LanguagePairPage';
import { LanguagePairsPage } from '@/pages/LanguagePairsPage';
import { LoginPage } from '@/pages/LoginPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { TermsPage } from '@/pages/TermsPage';
import { TestsPage } from '@/pages/TestsPage';
import { TopicPage } from '@/pages/TopicPage';

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex min-h-dvh items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      <Route path="/login" element={user ? <Navigate to="/" replace /> : <div className="vocab-page-enter"><LoginPage /></div>} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <div className="vocab-page-enter"><RegisterPage /></div>} />
      <Route path="/forgot-password" element={<div className="vocab-page-enter"><ForgotPasswordPage /></div>} />
      <Route path="/reset-password" element={<div className="vocab-page-enter"><ResetPasswordPage /></div>} />

      {user ? (
        <Route element={<AppLayout />}>
          <Route path="/" element={<LanguagePairsPage />} />
          <Route path="/pair/:pairId" element={<LanguagePairPage />} />
          <Route path="/pair/:pairId/topic/:topicId" element={<TopicPage />} />
          <Route path="/pair/:pairId/topic/:topicId/cards" element={<CardsPage />} />
          <Route path="/pair/:pairId/topic/:topicId/test" element={<TestsPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}

      <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
