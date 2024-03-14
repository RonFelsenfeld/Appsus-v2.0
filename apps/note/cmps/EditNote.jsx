const { useState, useEffect, useRef } = React
const { useNavigate, } = ReactRouter


import { noteService } from "../../note/services/note.service.js"


export function EditNote({ note, onUpdateNote, setIsEditing }) {
    const [noteToEdit, setNoteToEdit] = useState(note)
    const navigate = useNavigate()

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        setNoteToEdit((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then((savedNote) => {
                // onEditNote()
                onUpdateNote(savedNote)
                setIsEditing(false)
                // navigate('/note')
            })
    }


    if (!noteToEdit) return <h1>loading...</h1>
    const title = noteToEdit.info.title
    const txt = noteToEdit.info.txt

    return (
        <section className="note-edit">
            <form onSubmit={onSaveNote}>
                <label htmlFor="save"></label>
                <input

                    type="text"
                    id="save"
                    name="title"
                    onChange={handleChange}
                    value={title}
                />
                <input
                    placeholder="Note text.."
                    type="text"
                    id="txt"
                    name="txt"
                    onChange={handleChange}
                    value={txt}
                    ref={inputRef}
                />
                <button className="edit-button">
                    <a className="fa edit"></a>
                </button>
            </form>
        </section>
    )
}