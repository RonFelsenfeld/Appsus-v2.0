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
  getEmbedUrl,
}
// For Debug only
window.cs = noteService

//param = filterBy = getDefaultFilter()
function query() {
  return storageService.query(NOTE_KEY).then(notes => {
    // console.log(notes)
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
  // return axios.get(NOTE_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    // console.log(note)
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
      backgroundColor: '#FFD59E',
    },
    info: {
      title,
      txt,
    },
  }
}

function getEmptyAllNote() {
  return {
    id: '',
    createdAt: new Date(),
    type: '',
    isPinned: false,
    style: {
      backgroundColor: 'rgb(226, 246, 211)',
    },
    info: null,
  }
}

function getEmptyImgNote() {
  return {
    id: '',
    createdAt: new Date(),
    type: 'NoteImg',
    isPinned: false,
    style: {
      backgroundColor: '#FFD59E',
    },
    info: {
      url: '',
      title: '',
    },
  }
}

function getEmptyVideoNote() {
  return {
    id: '',
    createdAt: new Date(),
    type: 'NoteVideo',
    isPinned: false,
    style: {
      backgroundColor: 'rgb(246, 226, 221)',
    },
    info: {
      src: '',
      title: '',
    },
  }
}

function getEmptyTodosNote() {
  return {
    id: '',
    createdAt: new Date(),
    type: 'NoteTodo',
    isPinned: false,
    style: {
      backgroundColor: '#E6E6FA',
    },
    info: {
      title: '',
      todos: [{ txt: null, doneAt: null }],
    },
  }
}

function _createNote(title = 'this is the way', txt = 'Fullstack me baby!') {
  const note = getEmptyNote(title, txt)
  note.id = utilService.makeId()
  return note
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: utilService.makeId(),
        createdAt: new Date(),
        type: 'NoteImg',
        isPinned: false,
        style: {
          backgroundColor: '#B4FF9F',
        },
        info: {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnd_AEsSm693eVKQ6TLuQVvg70TFZjTZeDfw&usqp=CAU',
          title: 'Wow',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: new Date(),
        type: 'NoteTodo',
        isPinned: false,
        style: {
          backgroundColor: '#FFA1A1',
        },
        info: {
          title: 'so much on my mind',
          todos: [
            {
              id: utilService.makeId(),
              txt: 'integratge platforms',
              doneAt: Date.now(),
            },
            {
              id: utilService.makeId(),
              txt: 'complete final touches',
              doneAt: null,
            },
            { id: utilService.makeId(), txt: 'charge my laptop', doneAt: null },
          ],
        },
      },
      {
        id: utilService.makeId(),
        createdAt: new Date(),
        type: 'NoteVideo',
        isPinned: false,
        style: {
          backgroundColor: 'rgb(211, 191, 219)',
        },
        info: {
          src: 'https://www.youtube.com/embed/tgbNymZ7vqY',
          title: 'Muppet show',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: new Date(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
          backgroundColor: '#F9FFA4',
        },
        info: {
          title: 'where can i find a good notes app?',
          txt: 'need to search better',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: new Date(),
        type: 'NoteTodo',
        isPinned: false,
        style: {
          backgroundColor: '#B4FF9F',
        },
        info: {
          title: 'so much on my mind',
          todos: [
            { id: utilService.makeId(), txt: 'Call the dentist', doneAt: null },
            {
              id: utilService.makeId(),
              txt: 'listen to better music',
              doneAt: null,
            },
            {
              id: utilService.makeId(),
              txt: 'find out who framed Roger Rabbit?',
              doneAt: null,
            },
          ],
        },
      },
      {
        id: utilService.makeId(),
        createdAt: new Date(),
        type: 'NoteImg',
        isPinned: false,
        style: {
          backgroundColor: 'rgb(174, 204, 220)',
        },
        info: {
          url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAB+1BMVEUoKSMcmHz///8AAAAYGRUgIRwZGRkoJB8oJyIkU0UbnH8nNi0XGA8XFxeXl5UQEBCkpKQJCQkxMTEpHRomPjQeiG8AnH8hIh1qamouLynz8/PLy8vsICUAk3UjKSKHh4ddXV0mIRhRUVE+PTJ7e3ni4uK8vLxAQECvr6+/v7/u7u6kWk6CdmJZWVkpKSkeKSDJQTzgKStLiHCdnZ0lHRMqKiohJRNZKC84ODhvb28kISNMkZojFAC0Ukix0sk5oYjZMzKNa1pMKShcKDtCKC2ZJ0hMKDiIJ0NMSD6ZJ1KkJlPX19dlYllvKDdYKDBkKDdIhI1KPFUtOjkzS0wgAAAtMSM1V19AbnCDZbw8cH+KwLJosp9zeGQPDwAQKR1daW5OQziUJkU+KSmloZUAHSm9JVyDKDoAKR/SJWSyJlcAEBdTW2J5J0U/RkuEg31kXE0fPTtCHihyKC+SiXgNKSQ1KhtebHp5bFZQRXhvV5pSo7E0W24pOk1GfXs9Zl+KJDoxTVwSJRBNQGg0M1FtVI6KasplUqRRR4xBfJA6KyBXcSZigSY+UCRtmSiGtSlNZSUPACJHVSQ2QiSLlKIlJgRvSXlNPh9HkqhYtMaaYVNngGr3DRtTgGq+S0KizMF4uKhkGzt8d0WsolcxFAASM0GJfkZgWja7sWAcFCLrBLE2AAAdR0lEQVR4nO2di2MSV9bAJ5CBqfLWZoAkwAwkkDQEYwAhxFcUQwgxIxQQa5ImNLpUkuxq3UrUaNW1sZrtt3bbaL++7G79+md+596ZgQGJ8kirJDm25M6dO3fm/ubcc899zAzRXhKSLgpVJnQNQkIGpjIhKkSyx4Q36PZ3XAhpuBYGlYKwYKqQwSs8XqHDB9zDNhptv61C1yoARy8EyWplf6PQZMBN4L/txBvgiEKzGjeG87ZVR3qLxQpTdqVaViPcwaqK8WZpZ41OnP+bFEdCh6Z5VfozSl4sN0Hw/9UhWqfLqhfgNIAGnT3A/6VqhiOKiWyo1GK5JRay3jPXKNqATc6zaQxNSepm84rqkJW3G5f7jyp5DdLerm3fFjh0A3DedamsonUSKcnbLsgfISKcVxSnog0HQ06SRL0WrcVFxMBvEB6PxTNrmfXMzs5aPBbCc3qBIAIErVLRpMoWo1Vv+Wr/bKEiYkhFzn08PjE2ET4dnZ7IRReiuYn8/IKFdGjsrqzbOvBJ9tPh3aU5hDMomIt2jd0RiV5evHTqL/7ZM5cu/+VRLjydOwtwYtm5j63Z7KdZ+ZXs7tIdlZGHQ89lZ+Yi0dPRcD56dezMncvR2ejlU+GzFjq4olkadiw7jFn78u5iQxiCdj6gckfYyKlxz6np2ekFasGihCpkUSqRQ6uiVKSKJFUU+Xav9c8XuhSgCYuHsIAdtrzNC3qXhC7aWFppsUAj5fFNWcjm/BZo3ngpBkD1pEKKm2QpKRynqpDyg1R0Re5VE0l20Fvteb2U6kfAFuHp0IFY7siZ3NnpqUc5j2OlmRpEshpBWIcQsBo1UgkGhYDDWUwKldeqKRd3eUQA01GxZZEOm2YLCbJb7Xm9OFSivlCGGD4ltZSdzU2M5WZzi1Nhj77P3gwcWSPilPe8IUW/nES2saHc6xGdXNBRU1AskiYWzY9Fp+fD+dzU3MdN1CvSIXPLsbCySbke/urlnTIc4EUv7ynFs3ycT9bHwlWVEuHDjdJNq0wXAF+0U2YoxenlvbLyg+R6ELxnUshbiKjYX7YtiYDjzNYZvvgGVtQRFfKPwTn27J/d35TNUTlkNrnPYDDoWVmnXAGBEXmfGQd4UcgnO+UjOB7g6FGU3sDfskFDSeBwPh8sPoAjM8udkMygL6YZlLvMcrVBKgq1Wl2Wt1atLp3b4IPNEWn6QbVaKzmtAo6TaQTdKWEwRVhnJGKP2O0Hm3KEMRxUVjlcplyDC61WyG1FtQ2iTSsfDynMEFKoAQVs90orkVqhLVW1SblWPizr1cicWr1cUgO0Cn15RWO1akMxb3wZCr2jtLtHrsDXVBQXREyWNq1ytbxf5uLVgxXHGkhPHrVVoDyXw4nrTeCpCkfLohuPBO6LbUQtd5TBUQtwXDgBTgml0Brc/fxBZlmPm5Vbe8zINtnYYla97oBWywpH8HFOHk6vzadViHCCsmK2kwKcYnqdAEfI0WXzyTt7IBYREAwyQQYv5qJj4XnoWYVzf9U1YZBLcBQKhQBHAXcDbj6SPogw6vF163CKfgxHi+EgQcqC/ip49VKgMFK7TvirQ3BQSXBKlPcw5N3D7+RFq8BwZDKHXNQcBbIp/aVsNUKQFwWG04/Dvfg4udzchyoW5RRaq3jvbPRMOHdpIjpxJ5fIbjucHqzREPEaOL02mzGA4QyqFQoBTkALhTNCoA9ycSE4cH/NWjXa3dPTYxXhKIoiwNEFfcJlqH1GA1ZQPhEPp5RegCNenANylPViq+OO8JpDDQanFsbyU6enladOx5ltqVbi3d0ajh4sSRHOJF/nBThq2OV4LRyFeOMlmqMuwQHzI1YrG7R7Ahy1XC3VHH0JTklzMBzk6ZUMMm2B7oMFdx+2xyBbkfS9Fk7Q6izBsRncRrg0Ho7aB7t0r4cj3niUtwOfzeqEeD2qhD19Ztmw4xU4aoPGiRHwya1wJdAYQAZmlIFjUtbTadMW4VCSzpWHmEVDXFMLAKnx1rwIpyhbw+mBqy7CAa/GWYSjdQpKVBscURxQWGjVkC0SY8vgaG3QWJpL6SflEk3jNRfpIg+HWhIMMqEKklMLuamzn5395apvfMwaaZROEY4LyeRr4EwO98v6dOYSnHa2AThqH0T045O5elmtAEcnH3aZq8BxC7dDSG8V4Zjxdo+s08UWNYeOuXkIKpc9n/NEmfz4pTNXJ+bnP+ljmoXzRptTksbgYE8Ylbdkc7SKIhy+gdoKTqmt4uFUszmBmNB/oI3Lf5u4mp+//JfL4+HT80es3gbZ1NFaQZmGzRI4+vrg6IN9fX1BPdYcaWslwIFz614Dp6J1e6W1wga56ASCzbF4ZqenPB40ut54t3xLP6en0s9BF/JGOCOin1OEI3utn6MuwoHW7M2aI5e/Bk7JIHvgH/x6CJJtGMyWcPQOl8zciQR8c01AjeF0QsthtZq3huOAnfigSVm/Najn4eit4P7gWLAQGrcWw+nvFGTSqcatFe9DbQ1HTN8J/QXUWlWF4xTGc4jZKcu8B7oPBH3lWlPjoeVw0F10obtoLBoY1LcSWisomdC3KsFBl+5DcBxFsyFDaofaIYCD+uTFrFAOilIiJMW+VQUcWQmOWZpe6FuZq8AhY0K18uQXx6Ke+fyYhbQ2M2AhwDEajUFkHLXOoDHo1KKKHTTyEgxgYyrEK7QoDvqYRTg2SIIOlPX3uNEGLzZsagFOz6RBXsyKxTkUE6Eo8B9HjELeehSh5+HwV4ThGKXpWRQJAZwTG8SXJ2pOwMjT+Sw8cX3ii/Gwh2D+/nmzcFg8TMK3JxDA5eIHTpCoxU0+nk8qwgmK2wAHIBeP4tO6zNZ+6G3py2O1eolg8tJzYq/QLWbrlmYqZqGVXou65OewMVFzxv82P7VwxIIGBZuqVjQUqx8Nm0BX22jGPW/oe/d18gFe5JMuIb6zP8AnRXBIUmbud+vRNqpWkA+rlRwEYPqhevb3l2XlmpRulp3EzAcATn+/kz+Nuxh8Nb3GbBWuqtIgo6lg6ECg0gWUhJKQujl++Ff7lMSMo0fm02tB5EE4ixaHJnv4AC+o28sHesDC4gAojZ5WGSfhzuJtgBNEg3mSg4ZlfU65HDzHsqw6+6Wb0j39Mi2ft00Gp+GzdReDr6YflmnkxcvDCiLCwbWLYgiGocjEaCqZYbxexsugboSlcO5G4RyxsOA5Ha+hu07h8br6ZaSdpmb0EtMqD1SkgBa8nZSY9tqFLQVrujh+LNAZk8ChEml/Kh3nbmdWU7dHQ1yKSztWaIBz4+GNwuLE9OKRxEoN9ojWG3WCsBohYLXqpGItxheTuuXtNEHNuMVtcJjlxrKDhgN6tDxP7iiL1ZTnLD2JJG+bGLSVgpUyzA6LR6JrAcfYbSrB8a5muHQodJNbC41wt25zoZtrTjs09f7zhRs3ctF89M7dmpp5WitvQND1EFR7aZuk28tT6HESeqaBvPXVgq9JT0KxaduS4OggOAdWubuh2+uhRIhTcql4KvMsiee1bhj8577IgZfocVSDg02VBU2WFmtWIyvF+PnF0qGwXZmPMO5df+6S5aA1rQzlV+WYxN43ghNPj4KlwbaG8CopbyrF4Cv2E5RQcKZdqiA0YWDuE4Z7xH3D/RuGe+eknQ68wJtfw0kJi1glK78lKYrx5YdSZRt8TGWSajlXPUn5+bZOT5WlKs0H49rlFTa8fDqGwb9KZjABJ2AoxntrDdEbZdB6C9J48eG9+w8KhXP3H5x/uHD/23/4NTtqrQHldNtL1YpJJRgQiuEYJm4yJbyp/fF4Ip1IbK55mQQX59KZNR/HrYfSVjgqoLn28Nsvvz1feHDjfAF+CgXGtLNWN1HirB42yFBsbjXFxZ+tZta5ZxlkfDLcGuAwccnVD9eTofXk+v5QyEvb4Ki4Nfbw+q3Cgy8Ng4Dmkafwrb7velnmylaTintLx0gJnFCK41Y3E/FQaH0zzX24Ds3WaiaeXg9BZcqkQXdSaQO3P6Gk8XSXifCBHfb7wSjxP4Hlsmplea/lpJxOICKxOUwqPZo66EuZLERmdT/ykhmwzWBqkC1C1Y3CP5R0XL5MythQB/e1mrx/oKJeFXUI0QEcFPQdIORt2nwAnLYWkwo4Yt+qNNK+bdLycKBXzvJQ2odn9uBUwHEGhZXIpLWWbtOugkPbIkJ1UmlGt5dN68MhCEFxqHi1FdhNPfGxA+AUl5OWmuERMYpmm7HSrQ+HdpeelBoZoUaQfEWMJEeSSahqw9crS7yb4FBuu1FszEe+evzk8eONjX/988nGxtf/3BghDJqG5z13AhzCINYc6unvG//z1cbXG1892Xi6AZh+x5rThCvY+nB8bqHjOfJV8ulj6qt/PU0mk0+pp9h1pucGXh2DEHG9caFB68Mp9ZJGoGKBLRbGe3gGjAr1JaQYGGWcIVAfy8dBZ4OJQ+eL2gJTq8OBzgMtGQkshhhGCV1ML/P77dGU18eNApP9VAAdkFKuppg09M5H15PpVOpZKsPtt368I+E4Y7RNsDlSOEyKS2Q4NLqVuPsstb6GBzL8ywx4Q1wolEmHEqGba+vJUCYR+nA1k3BWfzS41eEQsaVYkHkFjnczvpnm4psHM2txbvTmGhrm4VTL1wnmZojb5OKZ9DoXD6Uz3MFMOnHb800Vy7QT4AQDsSqa493kTFwqlUkm1g5k4vHUYNqL314C9W3UO+qF+uZFP2hwR6lkaGM7UU1aHU4gYgpI5q3EkDI9SuCyU0qC/0HjfX486FdFtvCiWx0OlEtsmcsNMvzBE+ZeAhonNCN874avcO5e4d+zaA2PqqZORcvDidBOyQB7KcQQCW4UzG4osZrAi9yph/cLROHht+H58fEj1u92A5xAkLRFqrRWmbVQZg1apfWDN2+HTNBxt9wv/Hvw/Pkb396Jnl08wNa0+r/V4ZBGMr5SzSBvcje5DHc7k87E00vXSMJfeGB4cO7eg4XFs9O+I1s0TzsMjiFoZ2OlST0RDlIeCs89oAkH/Mg0MsgWv983hhbxRGqa2Gx1OFDuVz1k0SKDW0zgkNA9MDC+c8QtA/+ARA14Wh0OsRWcFFpMcHfN6/VyH46keDo3CoV7twrnx6YWjpxSLr+ZTqvDMQWV4qLAMji3VtPQgwglM1x6NZRZPej4GGzyrcL9woPzD8NnwxPhWfubxzJaHQ5lM7UbmUo6JubmGrcKTnIytJ5e426ueecAjv8f9+4X7j0szIen58cP1PBoRKvDIYx220pRX0pwMsl0Ju1NJTKrcVNCmSFw19JnQHPiX+QfeWY98d1QrSJ2p71K/wEN2DDQWKUSDGq0pCWm+Fdd1PBClFaHQ5TGcypcZDzapWQYpS8BPzgRXu+VwH92R1PuJJziYyDljo6JSZjiCSXUrLW7mcQV8BSZFJc2pVdv3+XSS7vCCTQF7YTx+itwmLvPnnHrt59lNlO3M+/BjwF2ernNUDyU2c/FQ1RN01lNweno4P+vQbq7hcC+jn01H1RdyuDQ0EtiI6/CyYS4zdXE7Q+5zfdu3s7cTVwBGt51LsGlDNxgev9Sb/URnO2D8/7RgY62D57XkkH3hZ94Ovu+P/p9x2F0YOOnLW+tYs5YFYMMJVMySsabCaE1gmhAi0A2Bw0sM2CfnTU94tgMnMNdH3S0dZ2opZzd/cd4OB0DXQMdh//36LbBoWliK4OMxIsm9Rh/Y69iqh9OdzGE4Xz/fdnO7urpj8s+4rcwnLaLh99w0OuksrWqDmcwqURjobjFvle4V30EcJvhdB//yYwLCYLhdHSIFmRfR8fP/Rfaykra3f3RJOhM9wVZN07QwcMpHdTR0X2s5+e68FRUq0i7o5qfA7aXWwuFPBoV4X9443yiBp+vOThQ1GMyWQ8U6f2jQyc++AHBOfq84/lRpAj7Lv548Xi/zHzseLGo3W0XIOICwDkGhDp++HHoxElcrX78vOPoUczm5I+HL8hk/T+11Y6nHI4zshSrMhQI3c3NJMetH2Rpwv/lvUI8+MfC4YsKZW/b90PX0AfPT8BPR9vQIVCG56jZOtR1uI2nhzWhu/v4MbOs/wJGBYQg2YnnHwwNDQ1glTva9T1qtoaGICHkKzv2Ua3qU+7nsDG3sepQIHQ8b60mVAiK/x6zlK2leWoYDipqD19rOk50HYYa8ryLh9M2hI1y1yH0C/WuH2vCRz1AUijxR7Ljbe8PnUB16ccuHs4PXWCU932PshA18ufa6FRojr3osVRMeTLe+H7BFbYQTpKo3yrXDKf7J1m/UGH24YK17TsswAEtOLyv42SX0D53d/9slh3vNpuPiXWl+1h/N+w/2SG2VnAgAIato10/7BMOgvwbgYP6D9KHH8pC0ITHoT3HC079D87V+6x57XB+RnWEVxy+nG0iHHz/oVYJpQQVMwNH+BUVBzXkAocSnJNdF3m9axNV51gjcAJ2g7vq9EOcWT/oS8VXEzdX/wputP/GuX/467TKtVcrUIgeKABoD9SnASkcqGZDUOCjHUIiBIVv1wScqCHHJkkCp+39rh87LmLKJWNWPxywOUsrVTTHu8mlQ6OhdQ49j8Y4TQDnQcFfwwBXY3D4+wt252eAc7IczvOuH04iA4vsjfknsZQCqePdF6D17/ixXHOA1lDb0a73kTGTicasfjjorVSBavPBodHRzcTmKmfg7nIMXkXx4J6qs74Xt9bp5+CbvO8iNqNFm4MxHRrqgKonK/dZcHU51o1cHUHdJHAGuk4O/QgHHaujpXoFDmiOoVpTjlSEOcChtSeMYJX9/qU6FyrX7SGDOrS1QQMMrdWhIREOBIdQc3781VJ2t33ULbuAm38w3R3vnxDhoFy6LsLZP6q1PlWDs2X3Ac07EN7RsrdD++/763pbdAN9q25000+cPHniRFFzIKLr8JbpUUMOaT7oOnTyeVcJDpjooUa6WBULJqvDoVJJaKaYBB7b8o7iZZP+Lwvf2usxO411PDsuIlV5/xCYnkN8H/LQB1uWs/unSawaHSdPdJ0Y+P7QxY7D6EDQJfynSThsDD9XVgkHD09wN1cTz9I3Oe7Zs/1WFfHvhw8KbD3vY2qwVw7e3L6OfZLxnNeN0IhVDfeoJOM5+xob1qnwc2JL4pMh5QZ5afW90K30h6EPQ3c3QyHSQSLNuVfXC1JafSSQMAXj1VYvMRzn4xK+TDKVSKTj8TjlRE+X+/zWmsZHdwqcgJ0IFJGU4OBZciXBKBklpeQfnsZC1+MGtjwcYovlpNBcoUW3CS9eukQMFgz1PyPS8nB8EZO72jKLAyFvPOHdTKxzFgdD+Av3z9f/jEjLw3EGabqKzaHu3h5ZXU2sJjaTNEug8a5Csu5P7bQ8HJWRZD8u6ksRDoPWu6VHuNH19IyGIYj7hXO1zTjsJDhUIGhnqy5hJ5TeA1yCApuDO1R+v7HObmfrw+E/9yAgIStLX/b0NF338zOtD6e0eoleTtZb/J0Nhwo4yJiR1wkm9fn2vsOk1eEQdExlFF9MdauRUfSdDIdwmIzCmwKpu/X0DXYDHJOz+GXWbX/qvuXhoIcfRCTojVhId9D7W9FoV03raXc0HJZyil+Oo01EfNlDWcaVhIXKPfKd9Tia+tpXy8MxBYkYy7t3tDs7Y41MXFpYHIvmx/KPormrc02Z6JaHQ9tMTsH3VWmW9RrV6dz13OlTuc9ydybCC5pmPlbU+nBMxohTHPpU2a4MeKanPb7T+SmPB71Qu7lv6LU8HOkCHfRyQhotpLUseASzvNvhSL5tC10J9uws/37b2akm9WYHwDHZVlijYFlmHMzStdw4kZ86Pb8wvnhF0ySdlodDDMZibt75U2kGZqz23JmJaPTUxPydqErXpFPY8nAoh93mFhydQY1JoxpfmBqf+mX8yPj4ldoeOdvBcIiAnS6+M1MVcINBRg0V+m2OzI6AI5ksJ9BHTpGg323oZrU+HLSEXXy70GBgfNZDeTxRi+dAsPnvBLc+HJMxIH54Op41LUbHx8fDufz0nURvox/i2TlwqKWY5MPTivB89HQ4vPjZotc60HTFan04RjYgrl4i45H8Ec+U57Ty1LynronfHQqn3CBT+MsPFouy+aZqZ8Aht6Nh2iFwKl75S7Mxg63hL8S9EU6rSYXmqIzepcgWpWta9reclF0+bYwFHE0NaWHxVF/7X/0LAu+wVFx/wF6cfnilaCJAcVOsfTOqYgKasNgXPJb8QlMfqn5nhZbOgntQF4ImTCY7xAdMGAcZo1HJaftM8DqpAi6/63TXTSRhp5xEe5BZyuamBhdywZUd9ckHXpwRyl38ZLl9/rIvPM4y8d6Yjm0f/s4QvE5QbFbriNGUodNh1a1YNQDHNWzXXBt2BV3Zbz6f0SRz+av5KXnvx2+zGH+MmGyPxJXppCaWi44NhuOu65rrOuvAN985skmoRDq9ZpkkVDq5NZDtWzYBHO+cK+vKXnHFlrIqzez8qanFqR2pOb4YKS7tirvs0VNXF8fYLKOx6+5e011b0q3QNOuKOAAO7V52B2K2ZTA10PSzdK9rhTDRJJBFX7j0NPVa6XdUaJvbLg52ETOxs77T09N2FZghkm6faadnkLFR0ST+4ieJFlfir6khSyV8MojagVCKUtZ9QB+etjT2nPTOFHJbBrZ2pFBOo72pF61vr1jq+K7hnyAM2Bz3Hw+H2nJT+KI8hfwqz2nLWY/FQr4jDR+1FHS6g01ng62zaJuFotEEI4Qok8lp4m0bSZEkqSJZL60iZ8DcR1Qav89iVJHO2Izui19yp8bPLEzNxbZ3iVnDAp2HrfSm7G6XugciAgWCQVMWC0WarMu26+RSDN9ylaZdhQzZletXBmZIcKWJQd2Kzh5DHoNBY3csB4djnQNzmpjLZc+aRrL5+XDCxWZVhmu/XI3Ohn3z4XfHoaTLv3zhEVsravBpkhqh4L8RiqYtL14qFJRiRKFQvByB209TL379zjijckfOTicGZq4MfJONOAbiGvAKAi65ZpkmFOAl9mZ1rhVaNexYcaxoHBDS/ee/vRrN0jXNqG45ppOzWZPVnr8UDi6rrDGr/Uw0fCr3aGJs7l1xKA1uxi1+4op0ej67c2aK8CgJYuTJ0ycbv3/99MlXg4+fsDH7y5cvf7P/9uK3317+38sXv7389VelgmSzc1nV4vh/vhm4cu2blewn2f9qBpArPWNzgTH7+7UrA8M6jR1UCTTn2icuLUGzmojVYQzElpbjyxE3TQ/aNar8HQ+oF0k6SMvsLP5W+jvjUJoMK+LadDq4/MtEOH8pfyTsoZ48Tv6+YXm88fhxcuNrqy5Cqn/99OmvL357+uLXT3978fLXT6H+WGODmshieOmaamlg7mNHMOtEywqdmhh+dTltC0CVjZhQlURuJOrKY4cSdXVJQhiBLOnIu0JEIqTRRArLSVWai+OncmeilxePWKgnG//6+p9fb2w82Ug+/kqtQt+F+M3+4sXL5Hf2F/RLexLxBKNDzoYvowKSDJS6nbdMpLBwg/eg31rJtkGcsQgrViuVm5hamD5LKC3o+yEjI7+P/A7/QQjvxbaHLntmFsnsn3/Nf55IlpOioau97oNUyHfG/L17YrCtiK9u3ZNKoeIxo635EfadKaZlu9tW93Nmu0VMJqrupzd3jdBUqbUCBSL5aXL89fE9S+22s+L0A20wqTVhi2dB6clfUi5cWXlHOsdvTyijSoSzlGXmPo+Oj4cn5qE3GJ3RvTujYG9J2Ig4+8DMZWc0X0RPAZzwxKX8pcS1Xa85xkhAbMkZp3OZXJiehWpFDEaV9K5nA0bYhEa8+BlziqQtwjju7LYsYGplsUsFDWLStrMWj9LjmZ3NX7U0vWSytQWQxGLuWAzDoVTByKfZifmxxfF89M7Inbhud3vOiEksElzBcMi5rHxuZWIsPP7FRDQ8OD9b16uEdp4AEseKTdAcQuWIaFT5hakz49NT0/n5wC73cwBJJCLaHIogaTe93wT/IBoidrmXYzIVGypeaMSLj9nrjO7JnuzJnuzJnuzJnuzJnuzJnuzJnvyB8v+eqBZjGYhZhAAAAABJRU5ErkJggg==',
          title: 'How?????',
        },
      },
      {
        id: utilService.makeId(),
        createdAt: new Date(),
        type: 'NoteVideo',
        isPinned: false,
        style: {
          backgroundColor: 'rgb(211, 191, 219)',
        },
        info: {
          // src: 'https://www.youtube.com/embed/tgbNymZ7vqY',
          src: 'https://www.youtube.com/embed/jfKfPfyJRdk',
          title: 'Muppet show',
        },
      },
    ]
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function getEmbedUrl(url) {
  const regExp =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

  // Attempt to match the URL with the regular expression
  const match = url.match(regExp)

  // Check if a match is found and if the video ID is valid
  return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : ''

  // const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  // const match = url.match(regExp)
  // return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : ''
}
