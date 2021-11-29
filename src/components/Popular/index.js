import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiChevronRightSquare, BiChevronLeftSquare} from 'react-icons/bi'
import Header from '../Header'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Footer from '../Footer'

class Popular extends Component {
  state = {popularMovies: [], pageNumber: 1, isLoading: true}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const {pageNumber} = this.state
    const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=b0c10bd24207804b5bc4163824d992f7&language=en-US&page=${pageNumber}`
    const requestToken = Cookies.get('request_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${requestToken}`,
      },
    }
    const response = await fetch(popularMoviesUrl, options)
    const data = await response.json()
    this.setState({popularMovies: data.results, isLoading: false})
  }

  onClickDecrement = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber - 1}),
        this.getPopularMovies,
      )
    }
  }

  onClickIncrement = () => {
    const {pageNumber} = this.state
    if (pageNumber < 500) {
      this.setState(
        prevState => ({pageNumber: prevState.pageNumber + 1}),
        this.getPopularMovies,
      )
    }
  }

  renderPageNumberSection = () => {
    const {pageNumber} = this.state
    return (
      <div className="pageNumber-container">
        <BiChevronLeftSquare onClick={this.onClickDecrement} className="page" />
        <p className="page">
          <span>{pageNumber} of 20</span>
        </p>
        <BiChevronRightSquare
          onClick={this.onClickIncrement}
          className="page"
        />
      </div>
    )
  }

  renderPopularMovies = () => {
    const {popularMovies} = this.state
    return (
      <>
        {popularMovies.map(movie => {
          const movieImage = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          const moviePath = `/movie/${movie.id}`
          return (
            <Link to={moviePath}>
              <img
                className="popular-image"
                alt={movie.title}
                src={movieImage}
              />
            </Link>
          )
        })}
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="popularMovies-body-section">
        <Header />
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="TailSpin" color="red" height={50} width={100} />
          </div>
        ) : (
          <>
            <div className="popular-movies-list">
              {this.renderPopularMovies()}
            </div>

            {this.renderPageNumberSection()}
            <Footer />
          </>
        )}
      </div>
    )
  }
}
export default Popular
