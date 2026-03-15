// ─── SearchBar Component ──────────────────────────────────────────────────────

const SearchBar = ({ value, onChange }) => (
  <div className="search-wrap">
    <span className="search-icon">🔍</span>
    <input
      className="search-input"
      type="text"
      placeholder="Search notes by title or content…"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    {value && (
      <button className="search-clear" onClick={() => onChange("")}>✕</button>
    )}
  </div>
);

export default SearchBar;
