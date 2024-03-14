const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({
  mails,
  onReadMail,
  onRemoveMail,
  folder,
  onSetSortBy,
  sortBy,
}) {
  function getFromToTitle() {
    if (folder === 'sent' || folder === 'draft') return 'To'
    return 'From'
  }

  function getSortDirClass() {
    const [dir] = Object.values(sortBy)
    return dir > 0 ? 'sort-up' : 'sort-down'
  }

  if (!mails.length) return <div className="no-mails-msg">No mails to show</div>

  return (
    <React.Fragment>
      <header className="list-header grid">
        <p
          className={`from-title ${sortBy.from ? getSortDirClass() : ''}`}
          onClick={() => onSetSortBy('from')}
        >
          {getFromToTitle()}
        </p>
        <p
          className={`subject-title ${sortBy.subject ? getSortDirClass() : ''}`}
          onClick={() => onSetSortBy('subject')}
        >
          Subject
        </p>
        <p
          className={`body-title ${sortBy.body ? getSortDirClass() : ''}`}
          onClick={() => onSetSortBy('body')}
        >
          Body
        </p>
        <p
          className={`sent-at-title ${sortBy.sentAt ? getSortDirClass() : ''}`}
          onClick={() => onSetSortBy('sentAt')}
        >
          Sent at
        </p>
      </header>

      <ul className="mail-list clean-list">
        {mails.map(mail => (
          <li key={mail.id} onClick={() => onReadMail(mail.id)}>
            <Link to={`/mail/${mail.id}`}>
              <MailPreview
                mail={mail}
                onRemoveMail={onRemoveMail}
                folder={folder}
              />
            </Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}
