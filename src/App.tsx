import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { LeadDetails } from './components/LeadDetails';
import { Scorecards } from './pages/Scorecards';
import { Performance } from './pages/Performance';
import { Lead } from './types';
import './styles/global.css';

function App() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLeadDetailsOpen, setIsLeadDetailsOpen] = useState(false);

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsLeadDetailsOpen(true);
  };

  const handleCloseLeadDetails = () => {
    setIsLeadDetailsOpen(false);
    setSelectedLead(null);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<Scorecards onLeadClick={handleLeadClick} />}
            />
            <Route
              path="/performance"
              element={<Performance onLeadClick={handleLeadClick} />}
            />
            <Route
              path="/mql-feeds"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/manage-users"
              element={
                <div style={{ padding: '24px' }}>
                  <h1>Manage Users</h1>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                    User management page coming soon...
                  </p>
                </div>
              }
            />
          </Routes>
        </Layout>

        <LeadDetails
          lead={selectedLead}
          isOpen={isLeadDetailsOpen}
          onClose={handleCloseLeadDetails}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
