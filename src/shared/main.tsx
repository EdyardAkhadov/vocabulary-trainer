import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './index.css';

import { AuthProvider } from '@/app/providers/AuthProvider';
import { LanguageProvider } from '@/app/providers/LanguageProvider';
import { ProfileProvider } from '@/app/providers/ProfileProvider';
import { SiteLanguageProvider } from '@/app/providers/SiteLanguageProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SiteLanguageProvider>
        <ProfileProvider>
          <LanguageProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </LanguageProvider>
        </ProfileProvider>
      </SiteLanguageProvider>
    </AuthProvider>
  </StrictMode>,
);
