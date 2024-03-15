const { useState, useEffect, } = React
import { noteService } from "../services/note.service.js"

import { EditNote } from "./EditNote.jsx";

export function NoteTodos({ note }) {
    const [currTodos, setTodos] = useState([note.info.todos])
 
    function onChangeTodo(todo) {
        todo.doneAt = todo.doneAt ? null : new Date()
    }

    return <div className="todo-note">
        <ul className="todo-list">
            {
                note.info.todos.map((todo) => <li
                    key={todo.id}>
                    <input
                        // checked={todo.doneAt ? true : false}
                        onChange={() => onChangeTodo(todo)} type="checkbox" />
                    <label htmlFor="todo">
                        {todo.txt}
                    </label>

                </li>)
            }
        </ul>
    </div>
}