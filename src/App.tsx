import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { LanguagePairPage } from '@/pages/LanguagePairPage';
import { LanguagePairsPage } from '@/pages/LanguagePairsPage';
import { TopicPage } from '@/pages/TopicPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LanguagePairsPage />} />

        <Route path="/pair/:pairId" element={<LanguagePairPage />} />

        <Route path="/pair/:pairId/topic/:topicId" element={<TopicPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
