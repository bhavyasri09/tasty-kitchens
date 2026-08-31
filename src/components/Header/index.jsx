
import {Link, useNavigate, useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/" className="logo-link">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB0bfGaXCylR49G2bLw-ldiLUQ-QD7AKgRaM_j6SNYTUOwiCYq2V88zQ&s=10"
            alt="website logo"
            className="header-logo"
          />

          <h1 className="header-title">
            Tasty Kitchens
          </h1>
        </Link>

        <ul className="nav-menu">
          <li>
            <Link
              to="/"
              className={
                location.pathname === '/'
                  ? 'nav-link active-link'
                  : 'nav-link'
              }
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              className={
                location.pathname === '/cart'
                  ? 'nav-link active-link'
                  : 'nav-link'
              }
            >
              Cart
            </Link>
          </li>

          <li>
            <button
              type="button"
              className="logout-btn"
              onClick={onLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header

