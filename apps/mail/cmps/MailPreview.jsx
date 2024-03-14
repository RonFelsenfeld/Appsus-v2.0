import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail, onRemoveMail, folder }) {
  const { from, to, subject, sentAt, isRead, body } = mail

  const isReadClass = isRead || folder !== 'inbox' ? 'read' : ''

  const fromOrTo = folder === 'sent' ? to : from

  return (
    <article className={`mail-preview grid ${isReadClass}`}>
      <button className="btn-star"></button>

      <p className="mail-from">{fromOrTo}</p>

      <p className="mail-content-container">
        <span className="mail-subject">{subject}</span> -{' '}
        <span className="mail-body">{body}</span>
      </p>
      {/* <span className="mail-body">{body}</span> */}
      <p className="mail-sent-at">{utilService.getRelativeTime(sentAt)}</p>

      {/* <button
        title="Delete"
        className="btn-remove"
        onClick={() => onRemoveMail(mail)}
      >
        x
      </button> */}
    </article>
  )
}
