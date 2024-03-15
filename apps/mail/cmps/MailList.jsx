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
}) {
  function onStarredMail(mailId) {
    console.log(mailId)
  }

  function getIsReadClass(mail) {
    if (mail.isRead || folder !== 'inbox') return 'read'
    return ''
  }

  if (!mails.length) return <div className="no-mails-msg">No mails to show</div>

  return (
    <React.Fragment>
      {<MailSort onSetSortBy={onSetSortBy} sortBy={sortBy} folder={folder} />}

      <ul className="mail-list clean-list">
        {mails.map(mail => (
          <li
            key={mail.id}
            className={`mail-preview-container ${getIsReadClass(
              mail
            )} flex align center`}
            onClick={() => onReadMail(mail.id)}
          >
            <button
              title="Starred"
              className="btn-star"
              onClick={() => onStarredMail(mail.id)}
            ></button>

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
