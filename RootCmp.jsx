const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'

import { NoteIndex } from './apps/note/views/NoteIndex.jsx'
import { MailIndex } from './apps/mail/views/MailIndex.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

import { MailDetails } from './apps/mail/cmps/MailDetails.jsx'

export function App() {
  return (
    <Router>
      <main className="app">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/mail" element={<MailIndex />}>
            <Route path="/mail/:mailId" element={<MailDetails />} />
          </Route>

          <Route path="/note" element={<NoteIndex />} />
          <Route path="/note/:mailId" element={<NoteIndex />} />
        </Routes>
      </main>

      <UserMsg />
    </Router>
  )
}
