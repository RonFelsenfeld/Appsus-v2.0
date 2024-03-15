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
  getDefaultSortBy,
  getUnreadCount,
  getFilterFromParams,
}
_createMails()

// For Debug only
// window.ms = emailService

function query(filterBy = getDefaultCriteria(), sortBy = getDefaultSortBy()) {
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

    // If there is a sortBy --> sort
    if (Object.keys(sortBy).length) {
      mails = _sortMails(mails, sortBy)
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
    isStarred: false,
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

function getDefaultSortBy() {
  return { sentAt: -1 }
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
    case 'starred':
      filteredMails = mails.filter(mail => mail.isStarred && !mail.removedAt)
      break
  }

  return filteredMails
}

function _sortMails(mails, sortBy) {
  if (sortBy.sentAt) {
    mails.sort((mail1, mail2) => (mail1.sentAt - mail2.sentAt) * sortBy.sentAt)
  } else {
    // If it's not sentAt, it has to be sort by text property
    // Destructuring the key from sortBy and sorting based on him
    const [sortKey] = Object.keys(sortBy)
    mails.sort(
      (mail1, mail2) =>
        mail1[sortKey].localeCompare(mail2[sortKey]) * sortBy[sortKey]
    )
  }

  return mails
}

////////////////////////////////////////////////////

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = []
    for (let i = 0; i < 50; i++) {
      mails.push(_createMail())
    }

    for (let i = 0; i < 40; i++) {
      mails.push(_createSentMail())
    }

    for (let i = 0; i < 40; i++) {
      mails.push(_createTrashMail())
    }

    utilService.saveToStorage(MAIL_KEY, mails)
  }
}

// Functions for demo data

function _createMail() {
  const newMail = getEmptyMail()

  newMail.id = utilService.makeId()
  newMail.subject = _getRndSubject()
  newMail.body = _getRndBody() + '.'
  newMail.sentAt = _getRandomTimestamp()
  newMail.from = _getRndEmailAddress()
  newMail.to = loggedUser.email
  newMail.isRead = Math.random() > 0.5
  newMail.isStarred = Math.random() > 0.7

  return newMail
}

function _createSentMail() {
  const newMail = getEmptyMail()

  newMail.id = utilService.makeId()
  newMail.subject = _getRndSubject()
  newMail.body = _getRndBody() + '.'
  newMail.sentAt = _getRandomTimestamp()
  newMail.from = loggedUser.email
  newMail.to = _getRndEmailAddress()

  return newMail
}

function _createTrashMail() {
  const newMail = getEmptyMail()

  newMail.id = utilService.makeId()
  newMail.subject = _getRndSubject()
  newMail.body = _getRndBody() + '.'
  newMail.sentAt = _getRandomTimestamp()
  newMail.from = _getRndEmailAddress()
  newMail.to = loggedUser.email
  newMail.removedAt = _getRandomTimestamp()

  return newMail
}

function _getRndEmailAddress() {
  const address = [
    'idoyo@mail.com',
    'ronfel@mail.com',
    'johnd@mail.com',
    'lebronja@mail.com',
    'chrislevi@mail.com',
    'gilimor@mail.com',
    'emili145@mail.com',
    'popo99@mail.com',
    'ricothemaster512@mail.com',
    'morcohen87@mail.com',
    'michallev1@mail.com',
    'gal2@mail.com',
    'revital3@mail.com',
  ]

  const rndIdx = utilService.getRandomIntInclusive(0, address.length - 1)
  return address[rndIdx]
}

function _getRndSubject() {
  const subjects = [
    'Invitation for my birthday',
    'A Surprise!',
    'Zoom meeting',
    'Working session',
    'Meeting summary',
    'Full stack work',
    'Hello world',
  ]

  const rndIdx = utilService.getRandomIntInclusive(0, subjects.length - 1)
  return subjects[rndIdx]
}

function _getRndBody() {
  const realWords = [
    'hello',
    'world',
    'email',
    'body',
    'information',
    'communication',
    'important',
    'message',
    'send',
    'receive',
    'address',
    'subject',
    'content',
    'attachment',
    'inbox',
    'outbox',
    'draft',
    'compose',
    'reply',
    'forward',
    'delete',
    'spam',
    'folder',
    'inbox',
    'urgent',
    'notification',
    'contact',
    'signature',
    'regards',
    'sincerely',
    'thank',
    'you',
    'best',
    'wishes',
    'meeting',
    'appointment',
    'schedule',
    'event',
    'calendar',
    'reminder',
    'deadline',
    'attachment',
    'file',
    'download',
    'upload',
    'view',
    'read',
    'review',
    'edit',
    'compose',
    'format',
    'header',
    'footer',
    'paragraph',
    'font',
    'size',
    'color',
    'style',
    'link',
    'button',
    'click',
    'submit',
    'confirm',
    'cancel',
    'save',
    'print',
    'preview',
    'reply',
    'forward',
    'attachment',
    'image',
    'video',
    'audio',
    'document',
    'PDF',
    'Excel',
    'Word',
    'PowerPoint',
    'presentation',
    'slide',
    'spreadsheet',
    'report',
    'memo',
    'note',
    'message',
    'chat',
    'conversation',
    'call',
    'phone',
    'mobile',
    'smartphone',
    'tablet',
    'computer',
    'device',
    'internet',
    'web',
    'website',
    'online',
    'offline',
    'connect',
    'disconnect',
  ]

  let message = ''
  for (let i = 0; i < 100; i++) {
    message += realWords[Math.floor(Math.random() * realWords.length)] + ' '
  }

  return message.trim()
}

function _getRandomTimestamp() {
  const now = new Date()
  const halfYearInMillis = 182.5 * 24 * 60 * 60 * 1000
  const randomTimeOffset = Math.floor(Math.random() * halfYearInMillis)
  const randomTimestamp = now.getTime() - randomTimeOffset
  return randomTimestamp
}
