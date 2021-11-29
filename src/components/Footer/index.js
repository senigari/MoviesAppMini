import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillYoutube,
} from 'react-icons/ai'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icons-container">
      <AiOutlineGoogle className="icon-element" />
      <AiOutlineTwitter className="icon-element" />
      <AiFillInstagram className="icon-element" />
      <AiFillYoutube className="icon-element" />
    </div>
    <p className="contact-us-element">Contact Us</p>
  </div>
)

export default Footer
