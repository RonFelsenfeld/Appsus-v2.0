import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

export const loggedUser = {
  email: 'user@appsus.com',
  fullName: 'Mahatma Appsus',
}

export const emailService = {
  query,
  get,
  remove,
  save,
  getEmptyMail,
  getDefaultCriteria,
  getUnreadCount,
  getFilterFromParams,
}
_createMails()

// For Debug only
window.ms = emailService

function query(filterBy = getDefaultCriteria()) {
  return storageService.query(MAIL_KEY).then(mails => {
    if (filterBy.folder) {
      mails = _filterByFolder(mails, filterBy.folder)
    }

    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      mails = mails.filter(
        mail => regex.test(mail.subject) || regex.test(mail.body)
      )
    }

    if (filterBy.isRead) {
      mails = mails.filter(mail => !mail.isRead)
    }
    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function getEmptyMail() {
  const emptyMail = {
    id: '',
    subject: '',
    body: '',
    isRead: false,
    sentAt: null,
    removedAt: null,
    from: '',
    to: '',
  }
  return emptyMail
}

function getDefaultCriteria() {
  return {
    folder: 'inbox',
    txt: '',
  }
}

function getUnreadCount(filterBy) {
  return query(filterBy).then(mails => {
    const totalUnread = mails.reduce((acc, mail) => {
      if (!mail.isRead) acc++
      return acc
    }, 0)

    return totalUnread
  })
}

function getFilterFromParams(searchParams = {}) {
  const defaultCriteria = getDefaultCriteria()
  return {
    folder: searchParams.get('folder') || defaultCriteria.folder,
    txt: searchParams.get('txt') || defaultCriteria.txt,
  }
}

////////////////////////////////////////////////////

function _createMail() {
  const newMail = getEmptyMail()

  newMail.id = utilService.makeId()
  newMail.subject = utilService.makeLorem(2)
  newMail.body = utilService.makeLorem(20)
  newMail.sentAt = Date.now()
  newMail.from = `${utilService.makeLorem(1).replaceAll(' ', '')}@mail.com`
  newMail.to = loggedUser.email

  return newMail
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = []
    for (let i = 0; i < 20; i++) {
      mails.push(_createMail())
    }

    utilService.saveToStorage(MAIL_KEY, mails)
  }
}

function _filterByFolder(mails, folder) {
  let filteredMails

  switch (folder) {
    case 'inbox':
      filteredMails = mails.filter(
        mail => mail.to === loggedUser.email && !mail.removedAt
      )
      break
    case 'sent':
      filteredMails = mails.filter(mail => mail.from === loggedUser.email)
      break
    case 'trash':
      filteredMails = mails.filter(mail => mail.removedAt)
      break
    case 'draft':
      filteredMails = mails.filter(
        mail => mail.from === loggedUser.email && !mail.sentAt
      )
      break
  }

  return filteredMails
}
