const { useState, useEffect } = React

export function MailFilter({ onSetFilter, filterBy, folder }) {
  const [filterToEdit, setFilterToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterToEdit)
  }, [filterToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    if (type === 'checkbox') value = target.checked
    setFilterToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
  }

  return (
    <section className="mail-filter">
      <form className="flex align-center">
        <input
          className="filter-txt"
          placeholder="Search mail"
          type="text"
          id="txt"
          name="txt"
          onChange={handleChange}
          value={filterToEdit.txt}
        />

        {folder === 'inbox' && (
          <div className="flex align-center">
            <label htmlFor="unread" className="filter-read">
              Unread Only
            </label>
            <input
              type="checkbox"
              id="unread"
              name="isRead"
              onChange={handleChange}
              value={filterToEdit.isRead}
            />
          </div>
        )}
      </form>
    </section>
  )
}
