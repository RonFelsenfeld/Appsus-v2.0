const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

import { EditNote } from "./EditNote.jsx";


export function NoteTxt({note,onUpdateNote}){
    const [isEditing, setIsEditing] = useState(false)

    return <div className="note-txt flex">

            {!isEditing && <div onClick={() => setIsEditing(prevIsEdit=>!prevIsEdit)}>
           <React.Fragment> 
            <h2>{note.info.title}</h2>
            <h2>{note.info.txt}</h2>
            </React.Fragment>
           </div>
           }
        
        { isEditing &&
            <EditNote
            note={note}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onUpdateNote={onUpdateNote} 
            />
        }
        
    </div>
}