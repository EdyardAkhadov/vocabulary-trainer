import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { useAuth } from '@/app/providers/AuthProvider';
import { AppLayout } from '@/app/layouts/AppLayout';

import { LanguagePairPage } from '@/pages/LanguagePairPage';
import { LanguagePairsPage } from '@/pages/LanguagePairsPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { TopicPage } from '@/pages/TopicPage';

import { CardsPage } from '@/pages/CardsPage';

import { TestsPage } from '@/pages/TestsPage';

import { AccountPage } from '@/pages/AccountPage';

import { ProgressPage } from '@/pages/ProgressPage';

import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />

      <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage />} />

      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/reset-password" element={<ResetPasswordPage />} />

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
