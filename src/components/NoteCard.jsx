// ─── NoteCard Component ───────────────────────────────────────────────────────

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  }) + " · " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
};

const NoteCard = ({ note, onEdit, onDelete, onPin }) => (
  <div className="note-card">
    {/* Color accent bar */}
    <div className="note-card-accent" style={{ background: note.color || "#6c63ff" }} />

    <div className="note-card-body">
      <div className="note-card-top">
        <div className="note-title">{note.title}</div>
        <button
          className={`pin-btn${note.pinned ? " pinned" : ""}`}
          onClick={() => onPin(note.id)}
          title={note.pinned ? "Unpin" : "Pin note"}
        >📌</button>
      </div>
      {note.content && (
        <div className="note-content">{note.content}</div>
      )}
    </div>

    <div className="note-card-footer">
      <div>
        {note.pinned && <span className="pinned-badge">📌 Pinned</span>}
        {!note.pinned && <span className="note-date">{formatDate(note.createdAt)}</span>}
      </div>
      <div className="note-actions">
        <button className="action-btn edit-btn"   onClick={() => onEdit(note)}   title="Edit">✏️</button>
        <button className="action-btn delete-btn" onClick={() => onDelete(note)} title="Delete">🗑️</button>
      </div>
    </div>
  </div>
);

export default NoteCard;
