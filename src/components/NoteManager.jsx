import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteSection from "./NoteSection";
import "./NoteManager.css";

function NoteManager() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [priority, setPriority] = useState("normal");

  const addNote = () => {
    if (noteText.trim() === "") {
      alert("Please enter a note!");
      return;
    }

    const newNote = {
      id: Date.now(),
      text: noteText,
      priority: priority,
      createdAt: new Date().toLocaleString(),
    };

    setNotes([newNote, ...notes]);
    setNoteText("");
    setPriority("normal");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const changePriority = (id, newPriority) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, priority: newPriority } : note
      )
    );
  };

  const getNotesByPriority = (priorityLevel) => {
    return notes.filter((note) => note.priority === priorityLevel);
  };

  return (
    <div className="note-manager-container">
      <div className="note-manager-header">
        <button onClick={() => navigate("/dashboard")} className="back-button">
          ← Back to Dashboard
        </button>
        <h1>Note Manager</h1>
        <p className="subtitle">Organize your notes by priority</p>
      </div>

      <div className="add-note-card">
        <h2>Create New Note</h2>
        <div className="add-note-form">
          <textarea
            className="note-input"
            placeholder="Enter your note here..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            rows="4"
          />

          <div className="form-controls">
            <div className="priority-selector">
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="priority-dropdown"
              >
                <option value="important">🔴 Important</option>
                <option value="normal">🟡 Normal</option>
                <option value="delayed">🟢 Delayed</option>
              </select>
            </div>

            <button onClick={addNote} className="add-note-button">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Note
            </button>
          </div>
        </div>
      </div>

      <div className="notes-sections">
        <NoteSection
          title="Important"
          priority="important"
          notes={getNotesByPriority("important")}
          onDelete={deleteNote}
          onChangePriority={changePriority}
          color="red"
        />

        <NoteSection
          title="Normal"
          priority="normal"
          notes={getNotesByPriority("normal")}
          onDelete={deleteNote}
          onChangePriority={changePriority}
          color="yellow"
        />

        <NoteSection
          title="Delayed"
          priority="delayed"
          notes={getNotesByPriority("delayed")}
          onDelete={deleteNote}
          onChangePriority={changePriority}
          color="green"
        />
      </div>
    </div>
  );
}

export default NoteManager;
