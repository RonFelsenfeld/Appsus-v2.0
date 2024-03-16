const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header flex align-center space-between">
      <Link to="/">
        <img src="assets/img/logo.png" alt="logo" className="logo" />
      </Link>

      <nav className="main-nav flex">
        <NavLink to="/">
          <button title="Home" className="btn-nav btn-home"></button>
        </NavLink>

        <NavLink to="/about">
          <button title="About" className="btn-nav btn-about"></button>
        </NavLink>

        <NavLink to="/mail">
          <button title="Mail" className="btn-nav btn-mail"></button>
        </NavLink>

        <NavLink to="/note">
          <button title="Note" className="btn-nav btn-note"></button>
        </NavLink>
      </nav>
    </header>
  )
}
