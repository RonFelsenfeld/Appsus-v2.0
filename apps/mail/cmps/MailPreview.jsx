import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail, onRemoveMail, folder }) {
  const { from, to, subject, sentAt, isRead, body } = mail

  const isReadClass = isRead ? 'read' : ''

  const fromOrTo = folder === 'sent' ? to : from

  return (
    <article className={`mail-preview grid ${isReadClass}`}>
      <p className="mail-from">{fromOrTo}</p>
      <p className="mail-subject">{subject.substring(0, 10)}...</p>
      <p className="mail-body">{body.substring(0, 20)}...</p>
      <p className="mail-sent-at">{utilService.formatDate(sentAt)}</p>
      <button
        title="Delete"
        className="btn-remove"
        onClick={ev => onRemoveMail(ev, mail.id)}
      >
        x
      </button>
    </article>
  )
}
