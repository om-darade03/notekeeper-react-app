// ─── NoteKeeper App ───────────────────────────────────────────────────────────
import { useState, useEffect, useMemo } from "react";
import "./App.css";
import Navbar    from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import NoteForm  from "./components/NoteForm";
import NoteList  from "./components/NoteList";
import Footer    from "./components/Footer";
import { loadNotes, saveNotes } from "./utils/localStorage";

// ── Confirm Delete Dialog ──────────────────────────────────────────────────────
const ConfirmDialog = ({ note, onConfirm, onCancel }) => (
  <div className="confirm-overlay">
    <div className="confirm-box">
      <div className="confirm-icon">🗑️</div>
      <div className="confirm-title">Delete Note?</div>
      <div className="confirm-text">
        Are you sure you want to delete <strong>"{note.title}"</strong>?<br />
        This action cannot be undone.
      </div>
      <div className="confirm-btns">
        <button className="btn-confirm-cancel" onClick={onCancel}>Cancel</button>
        <button className="btn-confirm-delete" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [notes,       setNotes]       = useState(() => loadNotes());
  const [search,      setSearch]      = useState("");
  const [showForm,    setShowForm]    = useState(false);
  const [editNote,    setEditNote]    = useState(null);
  const [deleteNote,  setDeleteNote]  = useState(null);
  const [filter,      setFilter]      = useState("all");  // all | pinned
  const [darkMode,    setDarkMode]    = useState(
    () => localStorage.getItem("nk_dark") === "true"
  );

  // Persist notes
  useEffect(() => { saveNotes(notes); }, [notes]);

  // Dark mode class on body
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("nk_dark", darkMode);
  }, [darkMode]);

  // ── CRUD ──────────────────────────────────────────────────────────────────
  const handleSave = ({ title, content, color }) => {
    if (editNote) {
      setNotes(prev => prev.map(n =>
        n.id === editNote.id
          ? { ...n, title, content, color, updatedAt: new Date().toISOString() }
          : n
      ));
    } else {
      const newNote = {
        id: crypto.randomUUID(),
        title,
        content,
        color,
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes(prev => [newNote, ...prev]);
    }
    setEditNote(null);
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setShowForm(true);
  };

  const handleDeleteConfirm = () => {
    setNotes(prev => prev.filter(n => n.id !== deleteNote.id));
    setDeleteNote(null);
  };

  const handlePin = (id) => {
    setNotes(prev => prev.map(n =>
      n.id === id ? { ...n, pinned: !n.pinned } : n
    ));
  };

  // ── Filtered notes ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = notes;
    if (filter === "pinned") list = list.filter(n => n.pinned);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
      );
    }
    // Pinned notes first
    return [...list].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [notes, search, filter]);

  const pinnedCount = notes.filter(n => n.pinned).length;

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar
        noteCount={notes.length}
        darkMode={darkMode}
        toggleDark={() => setDarkMode(d => !d)}
      />

      <main className="app-main">
        {/* Top bar: search + add */}
        <div className="top-bar">
          <SearchBar value={search} onChange={setSearch} />
          <button className="add-btn" onClick={() => { setEditNote(null); setShowForm(true); }}>
            ＋ New Note
          </button>
        </div>

        {/* Filter chips */}
        <div className="stats-bar">
          <div
            className={`stat-chip${filter === "all" ? " active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({notes.length})
          </div>
          <div
            className={`stat-chip${filter === "pinned" ? " active" : ""}`}
            onClick={() => setFilter("pinned")}
          >
            📌 Pinned ({pinnedCount})
          </div>
        </div>

        {/* Notes */}
        <NoteList
          notes={filtered}
          onEdit={handleEdit}
          onDelete={setDeleteNote}
          onPin={handlePin}
          searchQuery={search}
        />
      </main>

      <Footer />

      {/* Note Form Modal */}
      {showForm && (
        <NoteForm
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditNote(null); }}
          editNote={editNote}
        />
      )}

      {/* Confirm Delete Dialog */}
      {deleteNote && (
        <ConfirmDialog
          note={deleteNote}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteNote(null)}
        />
      )}
    </div>
  );
}
