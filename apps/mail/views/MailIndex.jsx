const { useState, useEffect, Fragment } = React
const { useParams, useNavigate } = ReactRouter
const { Outlet, useSearchParams } = ReactRouterDOM

import { emailService } from '../services/mail.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'

export function MailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [mails, setMails] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isComposingMail, setIsComposingMail] = useState(false)
  const [sortBy, setSortBy] = useState(emailService.getDefaultSortBy())
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromParams(searchParams)
  )

  const navigate = useNavigate()
  const { mailId } = useParams()

  useEffect(() => {
    loadMails()
    setSearchParams(filterBy)
  }, [filterBy, sortBy])

  function loadMails() {
    emailService
      .query(filterBy, sortBy)
      .then(mails => {
        setMails(mails)
        if (filterBy.folder === 'inbox' && !filterBy.txt) calcUnread()
      })
      .catch(err => console.error('Had issues with loading mails', err))
  }

  function calcUnread() {
    emailService
      .getUnreadCount(filterBy)
      .then(setUnreadCount)
      .catch(err =>
        console.error('Had issues with calculating unread mails', err)
      )
  }

  function onReadMail(mailId) {
    emailService
      .get(mailId)
      .then(mail => {
        if (!mail.isRead) mail.isRead = true
        return mail
      })
      .then(emailService.save)
      .then(updatedMail => {
        setMails(prevMails =>
          prevMails.map(mail =>
            mail.id === updatedMail.id ? updatedMail : mail
          )
        )
        calcUnread()
      })
      .catch(err => console.error('Had issues with reading mail:', err))
  }

  function onSetFilter(fieldsToUpdate) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
  }

  function onSetSortBy(newSort) {
    const dir = sortBy[newSort] === 1 ? -1 : 1
    setSortBy({ [newSort]: dir })
  }

  function onSendMail(mail) {
    emailService
      .save(mail)
      .then(sentMail => {
        setIsComposingMail(false)
        showSuccessMsg(`Email sent successfully to ${sentMail.to}`)
        console.log('Mail sent successfully')
      })
      .catch(err => {
        showSuccessMsg(`Could not send email to ${mail.to}`)
        console.error('Had issues with sending email:', err)
      })
  }

  function onRemoveMail(mail) {
    console.log(mail)
    if (!mail.removedAt) {
      moveToTrash(mail)
    } else {
      removeMail()
    }
  }

  function moveToTrash(mail) {
    mail.removedAt = Date.now()
    emailService
      .save(mail)
      .then(() => {
        setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
        showSuccessMsg(`Mail moved to trash`)
        navigate('/mail')
      })
      .catch(err => {
        console.log('Had issues removing mail', err)
        showErrorMsg(`Could not remove mail`)
      })
  }

  function removeMail() {
    emailService
      .remove(mailId)
      .then(() => {
        setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
        showSuccessMsg(`Mail removed successfully (${mailId})`)
        navigate('/mail')
      })
      .catch(err => {
        console.log('Had issues removing mail', err)
        showErrorMsg(`Could not remove mail`)
      })
  }

  if (!mails) return <div className="loading-msg">loading...</div>

  const { folder, txt } = filterBy
  return (
    <section className="mail-index">
      <MailFolderList
        onComposeMail={() => setIsComposingMail(true)}
        onSetFilter={onSetFilter}
        filterBy={{ folder }}
        unreadCount={unreadCount}
      />

      {!mailId && (
        <Fragment>
          <div>
            <MailFilter
              onSetFilter={onSetFilter}
              filterBy={{ txt }}
              folder={folder}
            />

            <MailList
              mails={mails}
              onReadMail={onReadMail}
              onRemoveMail={onRemoveMail}
              folder={folder}
              onSetSortBy={onSetSortBy}
              sortBy={sortBy}
            />
          </div>
        </Fragment>
      )}

      {isComposingMail && (
        <MailCompose
          onSendMail={onSendMail}
          onCloseMail={() => setIsComposingMail(false)}
        />
      )}

      <Outlet context={[onRemoveMail]}></Outlet>
    </section>
  )
}
