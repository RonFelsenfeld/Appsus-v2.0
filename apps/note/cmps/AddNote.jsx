const { useState, useEffect } = React

export function AddNote({ addNote }) {
    const [newNote, setnewNote] = useState({ title: '', txt: '' })

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        setnewNote((prevNote) => ({ ...prevNote, [field]: value }))

    }

    function onAddNote(ev) {
        ev.preventDefault()
        addNote(newNote)

    }


    return <div className="add-note-form flex column space-between">
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
            <button>add</button>
        </form>
            <div className="type-selector flex space-around">
                <button className="fa img"></button>
                <button className="fa video"></button>
                <button className="fa todo"></button>
                <button className="fa txt"></button>
            </div>
    </div>
}
