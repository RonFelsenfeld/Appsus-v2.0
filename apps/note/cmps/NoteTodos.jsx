const { useState, useEffect, } = React

export function NoteTodos({ note }) {
 
    function onChangeTodo(todo) {
        todo.doneAt = todo.doneAt ? null : new Date()
    }

    return <div className="todo-note">
        <ul className="todo-list">
            {
                note.info.todos.map((todo) => <li
                    key={todo.id}>
                    <input
                        onChange={() => onChangeTodo(todo)} type="checkbox" />
                    <label htmlFor="todo">
                        {todo.txt}
                    </label>

                </li>)
            }
        </ul>
    </div>
}