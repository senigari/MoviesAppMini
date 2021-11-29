import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class SearchResults extends Component {
  state = {searchedResultsList: [], isLoading: true}

  componentDidMount() {
    this.getSearchedResults()
  }

  getSearchedResults = async () => {
    const {match} = this.props
    const {params} = match
    const {value} = params
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=b0c10bd24207804b5bc4163824d992f7&language=en-US&query=${value}&page=1`
    const requestToken = Cookies.get('request_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${requestToken}`,
      },
    }
    const response = await fetch(searchUrl, options)
    const data = await response.json()
    this.setState({searchedResultsList: data.results, isLoading: false})
  }

  renderSearchedResults = () => {
    const {searchedResultsList} = this.state
    return (
      <>
        {searchedResultsList.map(movie => (
          <img
            alt={movie.title}
            className="searched-image"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
        ))}
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="TailSpin" color="red" height={50} width={100} />
          </div>
        ) : (
          <>
            <div style={{backgroundColor: 'black'}}>
              <Header />
            </div>
            <div className="searched-results-container">
              {this.renderSearchedResults()}
            </div>
          </>
        )}
      </>
    )
  }
}

export default SearchResults
