const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM
const { useNavigate, useParams } = ReactRouter

import {
    showErrorMsg,
    showSuccessMsg,
} from '../../../services/event-bus.service.js'
import { emailService } from '../../mail/services/mail.service.js'

import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteFilter } from '../cmps/NoteFIlter.jsx'

import { noteService } from '../services/note.service.js'
import { AddNote } from '../cmps/AddNote.jsx'

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()
    const [filterBy, setFilterBy] = useState('')


    useEffect(() => {
        if (mailId) addMailAsNote()
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy).then(notes => {
            setNotes(notes)
        })
    }

    function onSetFilter(newFilter) {
        setFilterBy(newFilter)
    }

    function addMailAsNote() {
        emailService
            .get(mailId)
            .then(mail => {
                const newNote = noteService.getEmptyNote()
                newNote.info.title = mail.to
                newNote.info.txt = mail.body
                addNote(newNote)
            })
            .catch(err => {
                console.log('Had issues with loading mail to note:', err)
            })
            .finally(() => navigate('/note'))
    }

    function onRemoveNote(noteId) {
        noteService
            .remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note removed successfully (${noteId})`)
            })
            .catch(err => {
                console.log('Had issues removing note', err)
                showErrorMsg(`Could not remove (${noteId})`)
            })
    }

    function addNote(note) {
        noteService
            .save(note)
            .then(updatedNote => {
                console.log('updated', updatedNote)
                setNotes(prevNotes => [updatedNote, ...prevNotes])
                showSuccessMsg(`adding`)
            })
            .catch(err => {
                showErrorMsg('already have it.', err)
            })
    }

    function onUpdateNote(note) {
        notes
            .sort((note1, note2) =>
                (note1.isPinned + '').localeCompare(note2.isPinned + '')
            )
            .reverse()
        noteService.save(note).then(savedNote => {
            setNotes(prevNotes =>
                prevNotes.map(currNote =>
                    currNote.id === savedNote.id ? savedNote : currNote
                )
            )
        })
    }

    function onCopyClick(note) {
        console.log(note)
        const duplicateNote = { ...note, id: '', createdAt: Date.now() }
        noteService
            .save(duplicateNote)
            .then(saved => {
                setNotes(prevNotes => [saved, ...prevNotes])

                showSuccessMsg('Duplicated note')
            })
            .catch(err => showErrorMsg('could not duplicate'))
    }

    if (!notes) return <div className="loading-msg">no notes to show..</div>
    return (
        <div className="notes-index">
            <NoteFilter
            onSetFilter={onSetFilter}
            filterBy={filterBy}
             />
            <AddNote addNote={addNote} />
            {
                <ul className="note-index preview clean-list flex wrap space-around">
                    {notes.map(note => (
                        <li key={note.id}>
                            <NotePreview
                                note={note}
                                onCopyClick={onCopyClick}
                                onRemoveNote={onRemoveNote}
                                onUpdateNote={onUpdateNote}
                            />
                        </li>
                    ))}
                </ul>
            }
            <Outlet context={[onUpdateNote]}></Outlet>
        </div>
    )
}
