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

  // For mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  function onReadMail(mailId, isToggling = false) {
    emailService
      .get(mailId)
      .then(mail => {
        if (isToggling) mail.isRead = !mail.isRead
        else mail.isRead = true
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

  function onToggleStarred(mail) {
    mail.isStarred = !mail.isStarred
    emailService
      .save(mail)
      .then(updatedMail => {
        setMails(prevMails =>
          prevMails.map(mail =>
            mail.id === updatedMail.id ? updatedMail : mail
          )
        )
      })
      .catch(err => console.error('Had issues with starring mail:', err))
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
    if (!mail.removedAt) {
      moveToTrash(mail)
    } else {
      removeMail(mail)
    }
  }

  function moveToTrash(mail) {
    mail.removedAt = Date.now()
    emailService
      .save(mail)
      .then(() => {
        setMails(prevMails =>
          prevMails.filter(currMail => currMail.id !== mail.id)
        )
        showSuccessMsg(`Mail moved to trash`)
        navigate('/mail')
      })
      .catch(err => {
        console.log('Had issues removing mail', err)
        showErrorMsg(`Could not remove mail`)
      })
  }

  function removeMail(mail) {
    emailService
      .remove(mail.id)
      .then(() => {
        setMails(prevMails =>
          prevMails.filter(currMail => currMail.id !== mail.id)
        )
        showSuccessMsg(`Mail removed successfully (${mail.id})`)
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
      <div
        className={`main-screen ${isMenuOpen ? 'menu-open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <MailFolderList
        onComposeMail={() => setIsComposingMail(true)}
        onSetFilter={onSetFilter}
        filterBy={{ folder }}
        unreadCount={unreadCount}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {!mailId && (
        <Fragment>
          <div>
            <MailFilter
              onSetFilter={onSetFilter}
              filterBy={{ txt }}
              folder={folder}
              setIsMenuOpen={setIsMenuOpen}
            />

            <MailList
              mails={mails}
              onReadMail={onReadMail}
              onRemoveMail={onRemoveMail}
              folder={folder}
              onSetSortBy={onSetSortBy}
              sortBy={sortBy}
              onToggleStarred={onToggleStarred}
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

      <Outlet context={[onRemoveMail, onToggleStarred]}></Outlet>
    </section>
  )
}
