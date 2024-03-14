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
    getEmptyAllNote
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
        console.log(note)
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, getEmptyNote())
    }
}

function getEmptyNote(title = '', txt = '') {

    return {
        id: utilService.makeId(),
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
        id: utilService.makeId(),
        createdAt: new Date(),
        type: 'NoteImg',
        isPinned: false,
        style: {
            backgroundColor: '#f6f8fc',
        },
        info: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0APlxQp4WsJeSExlejEnv-_Qwnbv_FUX3bQ&usqp=CAU',
            title: 'ninja'
        }
    }
}
function getEmptyVideoNote() {
    return {
        id: utilService.makeId(),
        createdAt: new Date(),
        type: 'NoteVideo',
        isPinned: false,
        style: {
            backgroundColor: '#f6f8fc',
        },
        info: {
            src: 'https://www.youtube.com/embed/tgbNymZ7vqY',
            title: 'muppet'
        }
    }
}
function getEmptyTodosNote() {
    return {
        id: utilService.makeId(),
        createdAt: new Date(),
        type: 'NoteTodo',
        isPinned: false,
        style: {
            backgroundColor: '#f6f8fc',
        },
        info: {
            title: 'my todos',
            todos: [
                { txt: 'Driving license', doneAt: null,id:utilService.makeId() },
                { txt: 'Coding power', doneAt: 187111111,id:utilService.makeId() }
            ]
        }
    }
}

function _createNote(title = 'this is the way', txt = 'Fullstack me baby!') {
    const note = getEmptyNote(title, txt)
    return note
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            getEmptyImgNote(),
            getEmptyVideoNote(),
            getEmptyTodosNote(),
            _createNote(),
            _createNote(),
            _createNote(),
            _createNote(),
        ]
        // notes.push(_createNote())
        // notes.push(_createNote())
        // notes.push(_createNote())
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


