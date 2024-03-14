const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

import { EditNote } from "./EditNote.jsx";

export function NoteVideo({note,onUpdateNote}){

    return <div className="video-container">
    <iframe src={note.info.src} width="250" height="150"></iframe>
</div>
}