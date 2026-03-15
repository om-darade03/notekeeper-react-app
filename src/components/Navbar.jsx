// ─── Navbar Component ─────────────────────────────────────────────────────────

const NoteLogo = () => (
  <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="navbar-logo">
    <rect x="5" y="3" width="24" height="30" rx="4" fill="#6c63ff" opacity="0.15"/>
    <rect x="5" y="3" width="24" height="30" rx="4" stroke="#6c63ff" strokeWidth="1.5"/>
    <rect x="10" y="10" width="14" height="2" rx="1" fill="#6c63ff"/>
    <rect x="10" y="15" width="14" height="2" rx="1" fill="#6c63ff" opacity="0.7"/>
    <rect x="10" y="20" width="9"  height="2" rx="1" fill="#6c63ff" opacity="0.5"/>
    {/* Pencil */}
    <rect x="24" y="22" width="5" height="12" rx="1.5"
      fill="#ff6b6b" transform="rotate(-45 24 22)"/>
    <polygon points="20,32 22,34 18,35" fill="#ff6b6b" opacity="0.8"/>
  </svg>
);

const Navbar = ({ noteCount, darkMode, toggleDark }) => (
  <nav className="navbar">
    <div className="navbar-left">
      <NoteLogo />
      <div className="navbar-title">Note<span>Keeper</span></div>
    </div>
    <div className="navbar-right">
      <span className="note-count-badge">{noteCount} notes</span>
      <button className="dark-toggle" onClick={toggleDark} title="Toggle dark mode">
        <div className="dark-toggle-thumb">{darkMode ? "🌙" : "☀️"}</div>
      </button>
    </div>
  </nav>
);

export default Navbar;
