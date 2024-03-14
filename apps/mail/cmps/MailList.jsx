const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({
  mails,
  onReadMail,
  onRemoveMail,
  folder,
  onSetSortBy,
}) {
  if (!mails.length) return <div className="no-mails-msg">No mails to show</div>

  function getFromToTitle() {
    if (folder === 'sent' || folder === 'draft') return 'To'
    return 'From'
  }

  return (
    <React.Fragment>
      <header className="list-header grid">
        <p className="from-title" onClick={() => onSetSortBy('from')}>
          {getFromToTitle()}
        </p>
        <p className="subject-title" onClick={() => onSetSortBy('subject')}>
          Subject
        </p>
        <p className="body-title" onClick={() => onSetSortBy('body')}>
          Body
        </p>
        <p className="send-at-title" onClick={() => onSetSortBy('sentAt')}>
          Send at
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
