
export function NoteVideo({note}){

    return <div className="video-container">
    <iframe src={note.info.src} width="250" height="150"></iframe>
</div>
}