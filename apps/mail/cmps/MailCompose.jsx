const { useState, useEffect, useRef } = React

import { emailService, loggedUser } from '../services/mail.service.js'

export function MailCompose({ onSendMail, onCloseMail }) {
  const [mailDetails, setMailsDetails] = useState(emailService.getEmptyMail())
  const recipientsInputRef = useRef()

  useEffect(() => {
    recipientsInputRef.current.focus()
  }, [])

  function handleChange({ target }) {
    let { value, name: field } = target
    setMailsDetails(prevDetails => ({ ...prevDetails, [field]: value }))
  }

  function onFinishMail(ev) {
    ev.preventDefault()

    mailDetails.from = loggedUser.email
    mailDetails.sentAt = Date.now()
    onSendMail(mailDetails)
  }

  const { to, subject, body } = mailDetails
  return (
    <section className="mail-compose flex column">
      <header className="new-mail-header flex space-between">
        <h2 className="title">New Message</h2>
        <button className="btn-close" onClick={onCloseMail}>
          X
        </button>
      </header>

      <form onSubmit={onFinishMail}>
        <div className="details-inputs flex column">
          <input
            className="recipients-input"
            type="email"
            placeholder="Recipients"
            name="to"
            value={to}
            onChange={handleChange}
            ref={recipientsInputRef}
            required
          />
          <input
            className="subject-input"
            type="text"
            placeholder="Subject"
            name="subject"
            value={subject}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <textarea
          className="body-input"
          id="body"
          cols="50"
          rows="20"
          name="body"
          value={body}
          onChange={handleChange}
          required
        ></textarea>

        <button className="btn-submit">Send</button>
      </form>
    </section>
  )
}
