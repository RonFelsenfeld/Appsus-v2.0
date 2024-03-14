const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM
const { useParams } = ReactRouter



import { NotePreview } from "../cmps/NotePreview.jsx"
import { NoteFilter } from "../cmps/NoteFIlter.jsx"
// import { NoteTxt } from "../cmps/NoteTxt.jsx"

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
    
    
    
    // function notesSort(notes) {
        //     notes.sort((note1,note2)=> (note1.isPinned+"").localeCompare(note2.isPinned+"")).reverse()
        //     console.log(notes);
        //     return notes
        // }
        
        
        
        function loadNotes() {
            noteService.query()
            .then((notes) => {
                setNotes(notes)
                // console.log(notes)
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
                setNotes(prevNotes => [{ ...updatedNote }, ...prevNotes])
                showSuccessMsg(`adding ${note.title}`)
            })

            .catch(err => {
                console.log(err)
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
