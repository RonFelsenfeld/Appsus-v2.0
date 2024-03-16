const { useState } = React

import { EditNote } from './EditNote.jsx'

export function NoteTxt({ note, onUpdateNote }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="note-txt flex">
      {!isEditing && (
        <div onClick={() => setIsEditing(prevIsEdit => !prevIsEdit)}>
          <React.Fragment>
            <h2>{note.info.title}</h2>
            <h2 className="note-content">{note.info.txt}</h2>
          </React.Fragment>
        </div>
      )}

      {isEditing && (
        <EditNote
          note={note}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onUpdateNote={onUpdateNote}
        />
      )}
    </div>
  )
}
