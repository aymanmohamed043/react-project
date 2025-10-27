import NoteCard from "./NoteCard";

function NoteSection({
  title,
  priority,
  notes,
  onDelete,
  onChangePriority,
  color,
}) {
  const getColorClass = () => {
    switch (color) {
      case "red":
        return "section-red";
      case "yellow":
        return "section-yellow";
      case "green":
        return "section-green";
      default:
        return "section-yellow";
    }
  };

  return (
    <div className={`note-section ${getColorClass()}`}>
      <div className="section-header">
        <h3>{title}</h3>
        <span className="note-count">{notes.length}</span>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-state">
            <svg
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p>No {title.toLowerCase()} notes yet</p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={onDelete}
              onChangePriority={onChangePriority}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NoteSection;
