const { useState, useEffect } = React

import { EditNote } from "./EditNote.jsx"
import { ColorInput } from "./ColorInput.jsx"

import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"



export function NotePreview({ note, onRemoveNote, onUpdateNote, onCopyClick }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isColorPicker, setIsColorPicker] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState(note)
    const [noteIsPinned, setNoteIsPinned] = useState(note.isPinned)
    const [cmpType, setCmpType] = useState(note.type)


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
        onUpdateNote(noteToEdit)
    }
    const dynClass = note.type === 'NoteVideo' || note.type === 'NoteImg' ? 'media' : ''

    return <div onClick={() => setIsEditing(true)} style={{ ...noteToEdit.style }}
        className={`note-preview flex space-between column ${dynClass}`}>

        {!note.isPinned &&
            <a className="fa pin" onClick={() => {
                onTogglePin()
            }}></a>
        }
        {note.isPinned &&
            <a className="fa unPin" onClick={() => {
                onTogglePin()
            }}></a>
        }

        <DynamicCmp
            onUpdateNote={onUpdateNote}
            note={note} />

        {
            isColorPicker && <ColorInput
                noteToEdit={noteToEdit}
                onChangeColor={onChangeColor} />
        }

        <div className="note-actions flex space-around">
            <a className="fa color" onClick={() => { setIsColorPicker((prevIsClr) => !prevIsClr) }} ></a>
            <a onClick={() => onCopyClick(note)} className="fa copy"></a>
            <a className="fa mail"></a>
            <a className="note-remove-btn fa trash" onClick={() => { onRemoveNote(note.id) }}></a>
        </div>

    </div >

}

function DynamicCmp(props) {
    // console.log(props);
    switch (props.note.type) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteVideo':
            return <NoteVideo {...props} />
        case 'NoteTodo':
            return <NoteTodos {...props} />
    }
}