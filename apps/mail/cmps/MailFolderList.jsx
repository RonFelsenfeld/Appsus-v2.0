const { useState, useEffect } = React
const { useNavigate } = ReactRouter

export function MailFolderList({ onComposeMail, onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const navigate = useNavigate()

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleFolderChange(folder) {
    setFilterByToEdit({ folder })
    navigate('/mail')
  }

  const { folder } = filterByToEdit
  return (
    <section className="folder-list">
      <button onClick={onComposeMail} className="btn-compose">
        Compose
      </button>

      <div className="folder-container flex column">
        <button
          className={`btn-folder ${folder === 'inbox' ? 'active' : ''}`}
          onClick={() => handleFolderChange('inbox')}
        >
          Inbox
        </button>

        <button
          className={`btn-folder ${folder === 'sent' ? 'active' : ''}`}
          onClick={() => handleFolderChange('sent')}
        >
          Sent
        </button>

        <button
          className={`btn-folder ${folder === 'trash' ? 'active' : ''}`}
          onClick={() => handleFolderChange('trash')}
        >
          Trash
        </button>

        <button
          className={`btn-folder ${folder === 'draft' ? 'active' : ''}`}
          onClick={() => handleFolderChange('draft')}
        >
          Draft
        </button>
      </div>
    </section>
  )
}
