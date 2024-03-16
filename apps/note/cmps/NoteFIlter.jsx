const { useState } = React


export function NoteFilter({onSetFilter,filterBy}) {
    const [filterByToEdit, setFilterByToEdit] = useState('')

    function handleFilterChange({target}){
        onSetFilter(target.value)
    }

    return <form className="filter-select flex justify-center align-center">
        <label htmlFor="filter">Filter by  </label>
        <select onChange={handleFilterChange} name="filter" id="filter">
            <option value="">ALL</option>
            <option value="pinned">Pinned</option>
            <option value="NoteTxt">Text</option>
            <option value="NoteVideo">Video</option>
            <option value="NoteImg">Image</option>
            <option value="NoteTodo">Todo</option>
        </select>
    </form>
}
