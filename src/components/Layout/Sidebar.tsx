import { NavLink } from 'react-router-dom';
import { Home, BarChart2, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        {!collapsed && <span className={styles.logoText}>Lokal</span>}
        {collapsed && <span className={styles.logoTextSmall}>L</span>}
      </div>

      <nav className={styles.nav}>
        {!collapsed && <span className={styles.navLabel}>Navigation</span>}

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ''}`
          }
          title="Home"
        >
          <Home size={18} />
          {!collapsed && <span>Home</span>}
        </NavLink>

        <NavLink
          to="/mql-feeds"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ''}`
          }
          title="MQL Feeds"
        >
          <BarChart2 size={18} />
          {!collapsed && <span>MQL Feeds</span>}
        </NavLink>

        <NavLink
          to="/manage-users"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ''}`
          }
          title="Manage Users"
        >
          <Users size={18} />
          {!collapsed && <span>Manage Users</span>}
        </NavLink>
      </nav>

      {/* Collapse toggle - positioned in the middle */}
      <button
        className={styles.collapseBtn}
        onClick={onToggle}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={styles.footer}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>FS</div>
          {!collapsed && (
            <div className={styles.userDetails}>
              <span className={styles.userName}>Fred Simmons</span>
              <span className={styles.userEmail}>fsimmons@lokalhq.com</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
