import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router';

import { AppLayout } from '@/app/layouts/AppLayout';
import { useAuth } from '@/app/providers/AuthProvider';
import { AboutPage } from '@/pages/AboutPage';
import { AccountPage } from '@/pages/AccountPage';
import { CardsPage } from '@/pages/CardsPage';
import { ContactPage } from '@/pages/ContactPage';
import { DictionaryPage } from '@/pages/DictionaryPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { LandingPage } from '@/pages/LandingPage';
import { LanguagePairPage } from '@/pages/LanguagePairPage';
import { LanguagePairsPage } from '@/pages/LanguagePairsPage';
import { PairDictionaryPage } from '@/pages/PairDictionaryPage';
import { LoginPage } from '@/pages/LoginPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { QuickAddPage } from '@/pages/QuickAddPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { TermsPage } from '@/pages/TermsPage';
import { TestsPage } from '@/pages/TestsPage';
import { TopicPage } from '@/pages/TopicPage';
import { SeoManager } from '@/shared/seo/SeoManager';

function LegacyPairRedirect() {
  const { pairId } = useParams();
  return <Navigate to={`/app/pair/${pairId ?? ''}`} replace />;
}

function LegacyTopicRedirect({ mode }: { mode?: 'cards' | 'test' }) {
  const { pairId, topicId } = useParams();
  const suffix = mode ? `/${mode}` : '';
  return <Navigate to={`/app/pair/${pairId ?? ''}/topic/${topicId ?? ''}${suffix}`} replace />;
}

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex min-h-dvh items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      <Route path="/login" element={user ? <Navigate to="/app" replace /> : <div className="vocab-page-enter"><LoginPage /></div>} />
      <Route path="/register" element={user ? <Navigate to="/app" replace /> : <div className="vocab-page-enter"><RegisterPage /></div>} />
      <Route path="/forgot-password" element={<div className="vocab-page-enter"><ForgotPasswordPage /></div>} />
      <Route path="/reset-password" element={<div className="vocab-page-enter"><ResetPasswordPage /></div>} />

      {user ? (
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<LanguagePairsPage />} />
          <Route path="pair/:pairId" element={<LanguagePairPage />} />
          <Route path="pair/:pairId/dictionary" element={<PairDictionaryPage />} />
          <Route path="pair/:pairId/topic/:topicId" element={<TopicPage />} />
          <Route path="pair/:pairId/topic/:topicId/cards" element={<CardsPage />} />
          <Route path="pair/:pairId/topic/:topicId/test" element={<TestsPage />} />
          <Route path="dictionary" element={<DictionaryPage />} />
          <Route path="quick-add" element={<QuickAddPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="progress" element={<ProgressPage />} />
        </Route>
      ) : (
        <Route path="/app/*" element={<Navigate to="/login" replace />} />
      )}

      <Route path="/pair/:pairId" element={user ? <LegacyPairRedirect /> : <Navigate to="/login" replace />} />
      <Route path="/pair/:pairId/topic/:topicId" element={user ? <LegacyTopicRedirect /> : <Navigate to="/login" replace />} />
      <Route path="/pair/:pairId/topic/:topicId/cards" element={user ? <LegacyTopicRedirect mode="cards" /> : <Navigate to="/login" replace />} />
      <Route path="/pair/:pairId/topic/:topicId/test" element={user ? <LegacyTopicRedirect mode="test" /> : <Navigate to="/login" replace />} />
      <Route path="/account" element={<Navigate to={user ? '/app/account' : '/login'} replace />} />
      <Route path="/progress" element={<Navigate to={user ? '/app/progress' : '/login'} replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SeoManager />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
