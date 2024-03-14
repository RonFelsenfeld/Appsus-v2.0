export function MailSort({ onSetSortBy, sortBy, folder }) {
  function getFromToTitle() {
    if (folder === 'sent' || folder === 'draft') return 'To'
    return 'From'
  }

  function getSortDirClass() {
    const [dir] = Object.values(sortBy)
    return dir > 0 ? 'sort-up' : 'sort-down'
  }

  return (
    <section className="sort-section flex align-center">
      <button
        className={`btn btn-from ${sortBy.from ? getSortDirClass() : ''}`}
        onClick={() => onSetSortBy('from')}
      >
        {getFromToTitle()}
      </button>
      <button
        className={`btn btn-subject ${sortBy.subject ? getSortDirClass() : ''}`}
        onClick={() => onSetSortBy('subject')}
      >
        Subject
      </button>
      <button
        className={`btn btn-body  ${sortBy.body ? getSortDirClass() : ''}`}
        onClick={() => onSetSortBy('body')}
      >
        Content
      </button>
      <button
        className={`btn btn-sent-at ${sortBy.sentAt ? getSortDirClass() : ''}`}
        onClick={() => onSetSortBy('sentAt')}
      >
        Date
      </button>
    </section>
  )
}
