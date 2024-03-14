const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'

export function AddNote({ addNote }) {
    // const [newNote, setnewNote] = useState({ title: '', txt: '' })
    const [newNote, setNewNote] = useState(noteService.getEmptyAllNote())



    function handleChange({ target }) {
        // const field = target.name
        let value = target.value
        
        // setNewNote((oldNote)=>({...oldNote,info:{...oldNote.info,txt:value}}))
    }

    function onAddNote(ev) {
        // console.log(ev.target)
        ev.preventDefault()
        addNote(newNote)
    }


    function onSelect(type) {
        switch (type) {
            case 'NoteImg':
                setNewNote((oldNote) => ({ ...oldNote, type: 'NoteImg', info: { url: null, title: null } }))

                break;
            case 'NoteVideo':
                setNewNote((oldNote) => ({ ...oldNote, type: 'NoteVideo', info: { src: null, title: null } }))

                break;
            case 'NoteTodo':
                setNewNote((oldNote) => ({ ...oldNote, type: 'NoteTodo', info: { todos: [], title: null } }))

                break;
            case 'NoteTxt':
                setNewNote((oldNote) => ({ ...oldNote, type: 'NoteTxt', info: { txt: null, title: null } }))
                break;
        }
    }

    console.log(newNote)
    return <div className="add-note-form flex column space-between">
        <form onSubmit={onAddNote}>
            <label htmlFor="add"></label>
            <input
                type="text"
                id="add"
                name='txt'
                // name={newNote.type}

                placeholder="Take a note"
                onChange={handleChange}
                // value={newNote.info}
                
                
            // value={newNote.type}

            />
            <button className="add-note-btn">add</button>
        </form>
        <div className="type-selector flex space-around">
            <button onClick={() => onSelect('NoteImg')} className="fa img"></button>
            <button onClick={() => onSelect('NoteVideo')} className="fa video"></button>
            <button onClick={() => onSelect('NoteTodo')} className="fa todo"></button>
            <button onClick={() => onSelect('NoteTxt')} className="fa txt"></button>
        </div>
    </div>
}
