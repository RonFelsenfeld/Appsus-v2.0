import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()


export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getEmptyAllNote,
    getEmptyImgNote,
    getEmptyTodosNote,
    getEmptyVideoNote,
    getEmbedUrl
    
    // getDefaultFilter,
    // getFilterFromParams
}
// For Debug only
window.cs = noteService

//param = filterBy = getDefaultFilter()
function query() {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            console.log(notes)
            return notes
        })

}
// notes.sort((note1, note2) => (note1.isPinned + "").localeCompare(note2.isPinned + "")).reverse()

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    // .then(note => _setNextPrevNoteId(note))
    // return axios.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        console.log(note)
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(title = '', txt = '') {

    return {
        id: '',
        createdAt: new Date(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#f6f8fc',
        },
        info: {
            title,
            txt
        }
    }
}
function getEmptyAllNote() {
    return {
        id: '',
        createdAt: new Date(),
        type: '',
        isPinned: false,
        style: {
            backgroundColor: '#f6f8fc',
        },
        info: null
    }
}
function getEmptyImgNote() {
    return {
        id: '',
        createdAt: new Date(),
        type: 'NoteImg',
        isPinned: false,
        style: {
            backgroundColor: '#f6f8fc',
        },
        info: {
            url: '',
            title: ''
        }
    }
}
function getEmptyVideoNote() {
    return {
        id: '',
        createdAt: new Date(),
        type: 'NoteVideo',
        isPinned: false,
        style: {
            backgroundColor: '#f6f8fc',
        },
        info: {
            src: '',
            title: ''
        }
    }
}
function getEmptyTodosNote() {
    return {
        id: '',
        createdAt: new Date(),
        type: 'NoteTodo',
        isPinned: false,
        style: {
            backgroundColor: '#f6f8fc',
        },
        info: {
            title: '',
            todos: [
                {txt:null,doneAt:null}
            ]
        }
    }
}

function _createNote(title = 'this is the way', txt = 'Fullstack me baby!') {
    const note = getEmptyNote(title, txt)
    note.id = utilService.makeId()
    return note
}
// function _createNote(title = 'this is the way', txt = 'Fullstack me baby!') {
//     const note = getEmptyNote(title, txt)
//     note.id = utilService.makeId()
//     return note
// }
// function _createNote(title = 'this is the way', txt = 'Fullstack me baby!') {
//     const note = getEmptyNote(title, txt)
//     note.id = utilService.makeId()
//     return note
// }

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            // getEmptyImgNote(),
            // getEmptyVideoNote(),
            // getEmptyTodosNote(),
            // getEmptyImgNote(),
            // getEmptyVideoNote(),
            // getEmptyTodosNote(),
            
        ]
        notes.push(_createNote())
        notes.push(_createNote())
        notes.push(_createNote())
        // notes.push(_createNote())
        // notes.push(_createNote())
        // notes.push(_createNote())
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}



// function getDefaultFilter() {
//     return { txt: '', minSpeed: 50, desc: '' }
// }

// function getFilterFromParams(searchParams = {}) {
//     const defaultFilter = getDefaultFilter()
//     return {
//         txt: searchParams.get('txt') || defaultFilter.txt,
//         minSpeed: searchParams.get('minSpeed') || defaultFilter.minSpeed,
//         desc: searchParams.get('desc') || defaultFilter.desc
//     }
// }


function getEmbedUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : ''
}


