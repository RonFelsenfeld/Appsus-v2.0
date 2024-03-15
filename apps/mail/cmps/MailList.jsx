const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'
import { MailSort } from './MailSort.jsx'

export function MailList({
  mails,
  onReadMail,
  onRemoveMail,
  folder,
  onSetSortBy,
  sortBy,
  onToggleStarred,
}) {
  function isStarredClass(mail) {
    if (mail.isStarred) return 'starred'
    return 'unstarred'
  }

  function getIsReadClass(mail) {
    if (mail.isRead || folder !== 'inbox') return 'read'
    return ''
  }

  function getIsReadIconClass(mail) {
    if (mail.isRead) return 'read'
    else return 'unread'
  }

  function getIsReadTitle(mail) {
    if (mail.isRead) return 'Mark as unread'
    else return 'Mark as read'
  }

  if (!mails.length)
    return (
      <div className="no-mails-msg">{`No mails in the ${folder} folder`}</div>
    )

  return (
    <React.Fragment>
      {<MailSort onSetSortBy={onSetSortBy} sortBy={sortBy} folder={folder} />}

      <ul className="mail-list clean-list">
        {mails.map(mail => (
          <li
            key={mail.id}
            className={`mail-preview-container grid ${getIsReadClass(mail)}`}
          >
            <button
              title="Star"
              className={`btn ${isStarredClass(mail)}`}
              onClick={() => onToggleStarred(mail)}
            ></button>

            <Link to={`/mail/${mail.id}`}>
              <MailPreview
                mail={mail}
                onRemoveMail={onRemoveMail}
                folder={folder}
                onClick={() => onReadMail(mail.id)}
              />
            </Link>

            <div className="actions-container flex align-center justify-center">
              <button
                title="Delete"
                className={`btn btn-delete`}
                onClick={() => onRemoveMail(mail)}
              ></button>

              <button
                title={`${getIsReadTitle(mail)}`}
                className={`btn btn-${getIsReadIconClass(mail)}`}
                onClick={() => onReadMail(mail.id, true)}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}
