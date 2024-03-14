const { useState, useEffect } = React
const { useParams } = ReactRouter
const { Link, useOutletContext } = ReactRouterDOM

import { emailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'

export function MailDetails() {
  const [mail, setMail] = useState(null)
  const [onRemoveMail] = useOutletContext()
  const { mailId } = useParams()

  useEffect(() => {
    if (mailId) loadMail()
  }, [])

  function loadMail() {
    emailService
      .get(mailId)
      .then(mail => {
        if (!mail.isRead) mail.isRead = true
        emailService
          .save(mail)
          .then(setMail)
          .catch(err => console.log('Had issues with loading mail', err))
      })
      .catch(err => {
        console.error('Had issues loading email', err)
      })
  }

  if (!mail) return <div className="loading">loading details...</div>
  const { subject, body, to, from, sentAt } = mail
  return (
    <section className="mail-details">
      <Link to="/mail">
        <button className="btn btn-go-back"></button>
      </Link>
      <button
        className="btn btn-delete"
        onClick={() => onRemoveMail(mail)}
      ></button>

      <div>
        <span className="mail-from">{from}</span>
        <span className="mail-to">{`<${to}>`}</span>
        <span className="mail-sent-at">{utilService.formatDate(sentAt)}</span>
        <h1 className="mail-subject">{subject}</h1>
        <p className="mail-body">{body}</p>
      </div>
    </section>
  )
}
