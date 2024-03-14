const { useState, useEffect } = React

import { EditNote } from "./EditNote.jsx"
import { ColorInput } from "./ColorInput.jsx"

import { noteService } from "../services/note.service.js"


export function NotePreview({ note, onRemoveNote, onUpdateNote }) {
    const [noteStyle, setNoteStyle] = useState({ backgroundColor: note.style.backgroundColor })
    const [isEditing, setIsEditing] = useState(false)
    const [isColorPicker, setIsColorPicker] = useState(false)
    // const [newNote, setNewNote] = useState(note)
    // const [isPinned, setIsPinned] = useState(false)


    useEffect(() => {
    }, [noteStyle])

    function onChangeStyle(newStyle) {
        setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
        // onUpdateNoteStyle(newStyle, note)

    }

    // function onUpdateNoteStyle(noteStyle, note) {
    //     setNewNote((oldNote => ({ ...oldNote, [note.style]: noteStyle })))
    //     onUpdateNote(newNote)
    // }

    return <div onClick={() => setIsEditing(true)} style={noteStyle} className="note-preview flex space-between column">

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
                setIsEditing={setIsEditing}
                note={note}
                setIsColorPicker={setIsColorPicker}
                onUpdateNote={onUpdateNote}
                noteStyle={noteStyle}
                onChangeStyle={onChangeStyle} />
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