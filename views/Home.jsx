const { useEffect, useRef } = React
const { NavLink } = ReactRouterDOM

import { utilService } from '../services/util.service.js'

export function Home() {
  const logoRef = useRef()
  const titleRef = useRef()
  const btnMailRef = useRef()
  const btnNoteRef = useRef()

  useEffect(() => {
    utilService.animateCSS(logoRef.current, 'backInDown')
    utilService.animateCSS(titleRef.current, 'backInDown')
    utilService.animateCSS(btnMailRef.current, 'backInRight')
    utilService.animateCSS(btnNoteRef.current, 'backInLeft')
  }, [])

  return (
    <section className="home-page flex column align-center">
      <img
        src="assets/img/logo.png"
        alt="logo"
        className="img-logo"
        ref={logoRef}
      />
      <h1 className="main-title" ref={titleRef}>
        Stay Organized. Even If You're not.
      </h1>

      <div className="btn-container flex column">
        <NavLink to="/mail">
          <button className="btn btn-mail" ref={btnMailRef}>
            Email Hub
          </button>
        </NavLink>

        <NavLink to="/note">
          <button className="btn btn-note" ref={btnNoteRef}>
            Note Hub
          </button>
        </NavLink>
      </div>
    </section>
  )
}
