const { useState, useEffect } = React

import { EditNote } from "./EditNote.jsx"
import { ColorInput } from "./ColorInput.jsx"

import { noteService } from "../services/note.service.js"


export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isColorPicker, setIsColorPicker] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState(note)
    const [noteIsPinned, setNoteIsPinned] = useState(note.isPinned)

    useEffect(() => {
        // note.isPinned = noteIsPinned

    }, [])

    function onChangeColor(color) {
        noteToEdit.style.backgroundColor = color
        noteService.save(noteToEdit)
            .then((savedNote) => {
                setNoteToEdit({ ...savedNote })
                setIsColorPicker(false)
            })
    }

    function onTogglePin() {
        noteToEdit.isPinned = !noteToEdit.isPinned
        noteService.save(noteToEdit)
            .then((savedNote) => {
                setNoteToEdit({ ...savedNote })
            })
    }

    return <div onClick={() => setIsEditing(true)} style={{ ...noteToEdit.style }} className="note-preview flex space-between column">

        <button className="pin" onClick={() => {
            onTogglePin()
            // setNoteIsPinned((isPin) => !isPin)
            // onTogglePin(noteIsPinned)
        }}>pin</button>


        {!isEditing && <React.Fragment>
            <h2>{note.info.title}</h2>
            <h2>{note.info.txt}</h2>
        </React.Fragment>
        }

        {
            isEditing && <EditNote
                note={note}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onUpdateNote={onUpdateNote} />
        }

        {
            isColorPicker && <ColorInput
                noteToEdit={noteToEdit}
                onChangeColor={onChangeColor} />
        }

        <div className="note-actions flex space-around">
            <button onClick={() => { setIsColorPicker((prevIsClr) => !prevIsClr) }} >color</button>
            <button>img</button>
            <button>arcive</button>
            <button>copy</button>
            <button>email</button>
            <button className="note-remove-btn" onClick={() => { onRemoveNote(note.id) }}>x</button>
        </div>



    </div >


}