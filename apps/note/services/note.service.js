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
    // getDefaultFilter,
    // getFilterFromParams
}
// For Debug only
window.cs = noteService

//param = filterBy = getDefaultFilter()
function query() {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    // .then(note => _setNextPrevNoteId(note))
    // return axios.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    console.log(note)
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {

        return storageService.post(NOTE_KEY, getEmptyNote(note.title, note.txt))
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

function _createNote(title = 'this is the way', txt = 'Fullstack me baby!') {
    const note = getEmptyNote(title, txt)
    return note
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNote())
        notes.push(_createNote())
        notes.push(_createNote())
        notes.push(_createNote())
        notes.push(_createNote())
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





// function _setNextPrevCarId(car) {
//     return storageService.query(NOTE_KEY).then((cars) => {
//         const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
//         const nextCar = cars[carIdx + 1] ? cars[carIdx + 1] : cars[0]
//         const prevCar = cars[carIdx - 1] ? cars[carIdx - 1] : cars[cars.length - 1]
//         car.nextCarId = nextCar.id
//         car.prevCarId = prevCar.id
//         return car
//     })
// }
