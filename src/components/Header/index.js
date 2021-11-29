import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiSearch} from 'react-icons/bi'
import {FaUserCircle} from 'react-icons/fa'
import {CgMenuCheese} from 'react-icons/cg'
import './index.css'

class Header extends Component {
  state = {searchInputValue: '', menuStatus: false}

  onClickEnterKey = event => {
    this.setState({searchInputValue: event.target.value})
  }

  onClickMenuKey = () => {
    const {menuStatus} = this.state
    if (menuStatus === true) {
      this.setState({menuStatus: false})
    } else {
      this.setState({menuStatus: true})
    }
  }

  renderMenuElements = () => (
    <div style={{marginLeft: 30}} className="portrait-link-container">
      <Link className="link-decoration" to="/">
        <h1 className="nav-link-home">Home</h1>
      </Link>
      <Link className="link-decoration" to="/popular">
        <h1 className="nav-link-popular">Popular</h1>
      </Link>
      <Link to="/account/">
        <FaUserCircle className="user-icon-portrait" />
      </Link>
    </div>
  )

  render() {
    const {searchInputValue, menuStatus} = this.state
    return (
      <nav className="nav-container">
        <div className="header-links">
          <Link className="link-decoration" to="/">
            <h1 className="header-movie-heading">MOVIES</h1>
          </Link>
          <div className="home-popular-container">
            <Link className="link-decoration" to="/">
              <h1 className="nav-link-home">Home</h1>
            </Link>
            <Link className="link-decoration" to="/popular">
              <h1 className="nav-link-popular">Popular</h1>
            </Link>
          </div>
        </div>
        <div className="search-user-container">
          {!menuStatus && (
            <div className="search-input-container">
              <input
                onChange={this.onClickEnterKey}
                value={searchInputValue}
                className="search-input"
                placeholder="Search"
                type="text"
              />
              <Link to={`search/${searchInputValue}`}>
                <BiSearch className="search-icon" />
              </Link>
            </div>
          )}
          <div className="menu-container">
            {menuStatus && this.renderMenuElements()}
            <CgMenuCheese onClick={this.onClickMenuKey} className="menu-icon" />
          </div>
          <Link to="/account/">
            <FaUserCircle className="user-icon" />
          </Link>
        </div>
      </nav>
    )
  }
}

export default Header
