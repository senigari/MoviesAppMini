import {withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Account extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('request_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="page-container">
        <div className="account-page-container">
          <Header />
        </div>
        <div className="user-details-container">
          <h1>Account</h1>
          <hr className="line-break" />
          <div className="membership-container">
            <p style={{marginRight: '20px'}}>Member ship</p>
            <div>
              <p>akhilgone1234@gmail.com</p>
              <p>Password : ***********</p>
            </div>
          </div>
          <hr className="line-break" />
          <div className="plan-details-container">
            <p style={{marginRight: '30px'}}>Plan details</p>
            <p>
              Premium <span>Ultra HD</span>
            </p>
          </div>
          <hr className="line-break" />
          <div className="logout-button-container">
            <button
              onClick={this.onClickLogout}
              className="logout-button"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Account)
