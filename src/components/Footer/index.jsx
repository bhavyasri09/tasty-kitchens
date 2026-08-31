
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-logo-container">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB0bfGaXCylR49G2bLw-ldiLUQ-QD7AKgRaM_j6SNYTUOwiCYq2V88zQ&s=10"
        alt="website-footer-logo"
        className="footer-logo"
      />

      <h1 className="footer-title">
        Tasty Kitchens
      </h1>
    </div>

    <p className="footer-description">
      The only thing we are serious about is food.
      Contact us on
    </p>

    <div className="social-icons-container">
      <FaPinterestSquare
        data-testid="pintrest-social-icon"
        className="social-icon"
      />

      <FaInstagram
        data-testid="instagram-social-icon"
        className="social-icon"
      />

      <FaTwitter
        data-testid="twitter-social-icon"
        className="social-icon"
      />

      <FaFacebookSquare
        data-testid="facebook-social-icon"
        className="social-icon"
      />
    </div>
  </footer>
)

export default Footer

