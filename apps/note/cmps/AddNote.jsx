const { useState } = React

import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

export function AddNote({ addNote }) {
  const [newNote, setNewNote] = useState(noteService.getEmptyAllNote())
  const [noteInput, setNoteInput] = useState('')
  const [placeholder, setPlaceholder] = useState('Take a note...')

  function handleChange({ target }) {
    let { value } = target
    setNoteInput(value)
  }

  function onAddNote(ev) {
    ev.preventDefault()
    switch (newNote.type) {
      case 'NoteImg':
        newNote.info.url = noteInput

        break
      case 'NoteVideo':
        const convertedInput = noteService.getEmbedUrl(noteInput)
        newNote.info.src = convertedInput

        break
      case 'NoteTodo':
        const todosArr = noteInput.split(',')
        newNote.info.todos = todosArr.map(todo => {
          return { id: utilService.makeId(), txt: todo, doneAt: new Date() }
        })

        break
      case 'NoteTxt':
        newNote.info.txt = noteInput
        break
    }
    addNote(newNote)
    setNoteInput('')
    setNewNote(noteService.getEmptyAllNote())
  }



  function onSelect(type) {
    switch (type) {
      case 'NoteImg':
        setNewNote(noteService.getEmptyImgNote())
        setPlaceholder('Enter img URL')

        break;
      case 'NoteVideo':
        setNewNote(noteService.getEmptyVideoNote())
        setPlaceholder('Enter Video URL')

        break;
      case 'NoteTodo':
        setNewNote(noteService.getEmptyTodosNote())
        setPlaceholder('Enter List (seperated by \' , \')')

        break;
      case 'NoteTxt':
        setNewNote(noteService.getEmptyNote())
        setPlaceholder('Take a note...')
        break;
    }
  }

  return (<div className="add-note-form flex column space-between">
    <form className="flex align-center" onSubmit={onAddNote}>
      <label htmlFor="add"></label>
      <input
        type="text"
        id="add"
        name='txt'
        placeholder={placeholder}
        onChange={handleChange}
        value={noteInput}
        autoComplete="off"
      />
      <button className="add-note-btn fa add"></button>
    </form>
    <div className="type-selector flex space-around">
      <button onClick={() => onSelect('NoteImg')} className="fa img"></button>
      <button onClick={() => onSelect('NoteVideo')} className="fa video"></button>
      <button onClick={() => onSelect('NoteTodo')} className="fa todo"></button>
      <button onClick={() => onSelect('NoteTxt')} className="fa txt"></button>
    </div>
  </div>
  )
}
