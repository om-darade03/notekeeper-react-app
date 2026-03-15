// ─── NoteList Component ───────────────────────────────────────────────────────
import NoteCard from "./NoteCard";

const NoteList = ({ notes, onEdit, onDelete, onPin, searchQuery }) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">{searchQuery ? "🔍" : "📝"}</div>
        <div className="empty-title">
          {searchQuery ? "No notes found" : "No notes yet"}
        </div>
        <div className="empty-sub">
          {searchQuery
            ? `No notes match "${searchQuery}". Try a different search.`
            : "Click the + New Note button to create your first note!"}
        </div>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onPin={onPin}
        />
      ))}
    </div>
  );
};

export default NoteList;
