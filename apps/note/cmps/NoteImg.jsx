const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

import { EditNote } from "./EditNote.jsx";


export function NoteImg({ note, onUpdateNote }) {


    return <div className="img-container">
        <img src={note.info.url} alt={note.title} />
    </div>
}