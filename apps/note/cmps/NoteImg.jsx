
export function NoteImg({ note }) {

    return <div className="img-container">
        <img src={note.info.url} alt={note.title} />
    </div>
}