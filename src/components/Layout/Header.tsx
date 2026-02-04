import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Settings, Calendar, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Header.module.css';

interface HeaderProps {
  clientName?: string;
}

export function Header({ clientName = 'Flex Air' }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [includeToday, setIncludeToday] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'scorecards', label: 'Scorecards', path: '/' },
    { id: 'performance', label: 'Performance', path: '/performance' },
  ];

  const activeTab = location.pathname === '/performance' ? 'performance' : 'scorecards';

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.clientInfo}>
          <button className={styles.backBtn}>
            <ChevronLeft size={18} />
          </button>
          <h1 className={styles.clientName}>{clientName}</h1>
          <button className={styles.settingsBtn}>
            <Settings size={16} />
          </button>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <div className={styles.dateRange}>
            <Calendar size={16} />
            <span>Dec 1, 2025</span>
            <span className={styles.dateSeparator}>–</span>
            <span>Dec 31, 2025</span>
          </div>

          <label className={styles.todayToggle}>
            <input
              type="checkbox"
              checked={includeToday}
              onChange={(e) => setIncludeToday(e.target.checked)}
            />
            <span className={styles.checkbox}></span>
            <span>Include Today</span>
          </label>
        </div>
      </div>

      <nav className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
