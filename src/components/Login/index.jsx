import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const jwtToken = Cookies.get('jwt_token')

  // If already logged in, go to Home
  if (jwtToken) {
    return <Navigate to="/" replace />
  }

  const onSubmitForm = async event => {
    event.preventDefault()

    setShowSubmitError(false)
    setLoading(true)

    const userDetails = {
      username,
      password,
    }

    try {
     const response = await fetch('https://apis.ccbp.in/login', {
  method: 'POST',
  body: JSON.stringify(userDetails),
})

      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {
          expires: 30,
          path: '/',
        })

        navigate('/', {replace: true})
      } else {
        setShowSubmitError(true)
        setErrorMsg(data.error_msg)
      }
    } catch {
      setShowSubmitError(true)
      setErrorMsg('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form className="form-container" onSubmit={onSubmitForm}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB0bfGaXCylR49G2bLw-ldiLUQ-QD7AKgRaM_j6SNYTUOwiCYq2V88zQ&s=10"
            alt="website logo"
            className="login-website-logo"
          />

          <h1 className="login-heading">Tasty Kitchens</h1>

          <h1 className="login-title">Login</h1>

          <div className="input-container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>

            <input
              type="text"
              id="username"
              className="username-input"
              value={username}
              onChange={event => setUsername(event.target.value)}
              placeholder="Username"
            />
          </div>

          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>

            <input
              type="password"
              id="password"
              className="password-input"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {showSubmitError && (
            <p className="error-message">{errorMsg}</p>
          )}
        </form>
      </div>

      <div className="login-img-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB0bfGaXCylR49G2bLw-ldiLUQ-QD7AKgRaM_j6SNYTUOwiCYq2V88zQ&s=10"
          alt="website login"
          className="login-img"
        />
      </div>
    </div>
  )
}

export default Login