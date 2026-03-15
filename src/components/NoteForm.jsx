// ─── NoteForm Modal Component ─────────────────────────────────────────────────
import { useState, useEffect } from "react";

const NOTE_COLORS = [
  "#6c63ff", "#ff6b6b", "#22c88a", "#ffb545",
  "#38e8ff", "#ff9de2", "#a78bfa", "#fb923c",
];

const MAX_CONTENT = 500;

const NoteForm = ({ onSave, onClose, editNote }) => {
  const [title,   setTitle]   = useState("");
  const [content, setContent] = useState("");
  const [color,   setColor]   = useState(NOTE_COLORS[0]);

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
      setColor(editNote.color || NOTE_COLORS[0]);
    }
  }, [editNote]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title: title.trim(), content: content.trim(), color });
    onClose();
  };

  const contentLen   = content.length;
  const counterClass = contentLen > MAX_CONTENT * 0.9
    ? "char-counter danger"
    : contentLen > MAX_CONTENT * 0.75
      ? "char-counter warn"
      : "char-counter";

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{editNote ? "✏️ Edit Note" : "📝 New Note"}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Title */}
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              className="form-input"
              type="text"
              placeholder="Give your note a title…"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={80}
              autoFocus
            />
          </div>

          {/* Content */}
          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              className="form-textarea"
              placeholder="Write your note here…"
              value={content}
              onChange={e => setContent(e.target.value.slice(0, MAX_CONTENT))}
            />
            <div className={counterClass}>{contentLen} / {MAX_CONTENT}</div>
          </div>

          {/* Color */}
          <div className="form-group">
            <span className="color-label">Note Color</span>
            <div className="color-picker">
              {NOTE_COLORS.map(c => (
                <div
                  key={c}
                  className={`color-dot${color === c ? " selected" : ""}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave} disabled={!title.trim()}>
            {editNote ? "Update Note" : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
