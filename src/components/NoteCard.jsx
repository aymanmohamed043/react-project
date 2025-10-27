import { useState } from "react";

function NoteCard({ note, onDelete, onChangePriority }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete(note.id);
    }
  };

  const handlePriorityChange = (e) => {
    onChangePriority(note.id, e.target.value);
    setIsEditing(false);
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "important":
        return "🔴";
      case "normal":
        return "🟡";
      case "delayed":
        return "🟢";
      default:
        return "🟡";
    }
  };

  return (
    <div className="note-card">
      <div className="note-card-header">
        <span className="note-priority-badge">
          {getPriorityIcon(note.priority)}
        </span>
        <span className="note-date">{note.createdAt}</span>
      </div>

      <p className="note-text">{note.text}</p>

      <div className="note-card-actions">
        {isEditing ? (
          <select
            value={note.priority}
            onChange={handlePriorityChange}
            className="priority-change-dropdown"
            autoFocus
            onBlur={() => setIsEditing(false)}
          >
            <option value="important">🔴 Important</option>
            <option value="normal">🟡 Normal</option>
            <option value="delayed">🟢 Delayed</option>
          </select>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="action-button change-button"
            title="Change priority"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12M8 12h12m-12 5h12M3 7h.01M3 12h.01M3 17h.01"
              />
            </svg>
            Change
          </button>
        )}

        <button
          onClick={handleDelete}
          className="action-button delete-button"
          title="Delete note"
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
