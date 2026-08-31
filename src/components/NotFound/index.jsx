
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />

    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
        alt="not found"
        className="not-found-img"
      />

      <h1>Page Not Found</h1>

      <p>
        We are sorry, the page you requested could
        not be found.
      </p>

      <Link to="/">
        <button
          type="button"
          className="home-btn"
        >
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound

