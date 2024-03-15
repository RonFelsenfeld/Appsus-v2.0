const { useState, useEffect, } = React
import { noteService } from "../services/note.service.js"

import { EditNote } from "./EditNote.jsx";

export function NoteTodos({ note, onUpdateNote }) {
    const [currTodos,setTodos]=useState([note.info.todos])

    // function onTodoToggle(todo) {
    // }

    // const dynClass = todoDone ? 'done' : ''

    return <div className="todo-note">
        <ul className="todo-list">
            {
                note.info.todos.map((todo) => <li
                    // className={dynClass}
                    // onClick={() => onTodoToggle(todo)} 
                    key={todo.id}>
                    {todo.txt}
                </li>)
            }
        </ul>
    </div>
}