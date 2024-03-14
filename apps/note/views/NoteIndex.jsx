const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM
const { useParams } = ReactRouter



import { NotePreview } from "../cmps/NotePreview.jsx"
import { NoteFilter } from "../cmps/NoteFIlter.jsx"

import { noteService } from "../services/note.service.js"
import { AddNote } from "../cmps/AddNote.jsx"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const { noteId } = useParams()
    // const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        loadNotes()
    }, [])


    function loadNotes() {
        noteService.query()
            .then((notes) => {
                setNotes(notes)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                // showSuccessMsg(`Note removed successfully (${noteId})`)
            })
            .catch((err) => {
                console.log('Had issues removing note', err)
                // showErrorMsg(`Could not remove (${noteId})`)
            })
    }

    function addNote(note) {
        noteService.save(note)
            .then((updatedNote) => {
                setNotes(prevNotes => [{ ...updatedNote }, ...prevNotes])
                // showSuccessMsg(`adding ${note.title}`)
            })

            .catch(err => {
                console.log(err)
                // showErrorMsg('already have it.', err)
            })
    }

    function onUpdateNote(note) {
        noteService.save(note)
        .then(()=>{
            setNotes((prevNotes) => prevNotes.map((currNote) => currNote.id === note.id ? note : currNote))
            // setNotes((prevNotes) => prevNotes.filter((currNote) => currNote.id === note.id ? note : currNote))
        })
    }

    if (!notes) return <div>no notes to show..</div>
    return <div className="notes-index">
        {/* <NoteFilter /> */}
        <AddNote addNote={addNote} />
        {!noteId &&
            <ul className="note-index preview clean-list flex wrap space-around">
                {
                    notes.map(note => (
                        <li key={note.id}>
                                <NotePreview
                                    note={note}
                                    onRemoveNote={onRemoveNote}
                                    onUpdateNote={onUpdateNote}
                                />
                        </li>)
                    )}
            </ul>}
        <Outlet context={[onUpdateNote]}></Outlet>

    </div>
}
