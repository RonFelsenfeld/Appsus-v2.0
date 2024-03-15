const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header flex space-between">
      <Link to="/">
        <h3>LOGO</h3>
      </Link>
      <nav className="main-nav flex">
        <NavLink to="/">
          <button className="btn-nav btn-home"></button>
        </NavLink>
        <NavLink to="/about">
          <button className="btn-nav btn-about"></button>
        </NavLink>
        <NavLink to="/mail">
          <button className="btn-nav btn-mail"></button>
        </NavLink>
        <NavLink to="/note">
          <button className="btn-nav btn-note"></button>
        </NavLink>
      </nav>
    </header>
  )
}
