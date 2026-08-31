import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import Login from './components/Login'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import './App.css'

const ProtectedRoute = ({children}) => {
  const token = Cookies.get('jwt_token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurant/:id"
        element={
          <ProtectedRoute>
            <RestaurantDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route path="/not-found" element={<NotFound />} />

      <Route
        path="*"
        element={<Navigate to="/not-found" replace />}
      />
    </Routes>
  </BrowserRouter>
)

export default App

