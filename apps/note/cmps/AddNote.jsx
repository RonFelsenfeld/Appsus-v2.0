const { useState, useEffect } = React

export function AddNote({ addNote }) {
    const [newNote, setnewNote] = useState({ title: '', txt: '' })



    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        // console.log(target);
        setnewNote((prevNote) => ({ ...prevNote, [field]: value }))
        // console.log(newNote);
    }

    function onAddNote(ev) {
        ev.preventDefault()
        addNote(newNote)
        // console.log(newNote);
    }

    // const { title, txt } = newNote
    return <div className="add-note-form flex justify-center">
        <form onSubmit={onAddNote}>
            <label htmlFor="add"></label>
            <input
                placeholder="Take a note"
                type="text"
                id="add"
                name="title"
                onChange={handleChange}
                value={newNote.title}
            />
            {/* <input
                placeholder="Note text.."
                type="text"
                id="txt"
                name="txt"
                onChange={handleChange}
                value={newNote.txt}
            /> */}

            <button>add</button>
        </form>
    </div>
}
