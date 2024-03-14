const { useState, useEffect } = React
const { useNavigate } = ReactRouter

export function MailFolderList({
  onComposeMail,
  onSetFilter,
  filterBy,
  unreadCount,
}) {
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
          className={`btn-folder btn-inbox ${
            folder === 'inbox' ? 'active' : ''
          }`}
          onClick={() => handleFolderChange('inbox')}
        >
          Inbox
          <span className="unread-count">{unreadCount}</span>
        </button>

        <button
          className={`btn-folder btn-sent ${folder === 'sent' ? 'active' : ''}`}
          onClick={() => handleFolderChange('sent')}
        >
          Sent
        </button>

        <button
          className={`btn-folder btn-trash ${
            folder === 'trash' ? 'active' : ''
          }`}
          onClick={() => handleFolderChange('trash')}
        >
          Trash
        </button>

        <button
          className={`btn-folder btn-draft ${
            folder === 'draft' ? 'active' : ''
          }`}
          onClick={() => handleFolderChange('draft')}
        >
          Draft
        </button>
      </div>
    </section>
  )
}
