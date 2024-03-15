const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM
const { useParams } = ReactRouter



import { NotePreview } from "../cmps/NotePreview.jsx"
import { NoteFilter } from "../cmps/NoteFIlter.jsx"


import { noteService } from "../services/note.service.js"
import { AddNote } from "../cmps/AddNote.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const { noteId } = useParams()

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
                showSuccessMsg(`Note removed successfully (${noteId})`)
            })
            .catch((err) => {
                console.log('Had issues removing note', err)
                showErrorMsg(`Could not remove (${noteId})`)
            })
    }

    function addNote(note) {
        noteService.save(note)
            .then((updatedNote) => {
                console.log('updated',updatedNote);
                setNotes(prevNotes => [updatedNote, ...prevNotes])
                showSuccessMsg(`adding`)
            })
            .catch(err => {
                showErrorMsg('already have it.', err)
            })
    }


    function onUpdateNote(note) {
        notes.sort((note1, note2) => (note1.isPinned + "").localeCompare(note2.isPinned + "")).reverse()
        noteService.save(note)
            .then((savedNote) => {
                setNotes((prevNotes) => prevNotes.map((currNote) => currNote.id === savedNote.id ? savedNote : currNote))
            })
    }

    function onCopyClick(note) {
        console.log(note);
        const duplicateNote = { ...note, id: '', createdAt: Date.now() }
        noteService.save(duplicateNote)
            .then((saved) => {
                setNotes((prevNotes) => [saved, ...prevNotes])

                showSuccessMsg('Duplicated note')
            })
            .catch(err => showErrorMsg('could not duplicate'))
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
                                onCopyClick={onCopyClick}
                                onRemoveNote={onRemoveNote}
                                onUpdateNote={onUpdateNote}
                            />
                        </li>)
                    )}
            </ul>}
        <Outlet context={[onUpdateNote]}></Outlet>

    </div>
}
