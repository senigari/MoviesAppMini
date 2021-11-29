import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Headers from '../Header'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class SpecificMovie extends Component {
  state = {movieDetails: [], similarMoviesList: [], isLoading: true}

  componentDidMount() {
    this.getMovieDetails()
    this.getSimilarMovies()
  }

  getSimilarMovies = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const similarMoviesUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=b0c10bd24207804b5bc4163824d992f7&language=en-US&page=1`
    const requestToken = Cookies.get('request_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${requestToken}`,
      },
    }
    const similarMoviesResponse = await fetch(similarMoviesUrl, options)
    const similarMoviesData = await similarMoviesResponse.json()
    this.setState({
      similarMoviesList: similarMoviesData.results,
      isLoading: false,
    })
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const getMovieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=b0c10bd24207804b5bc4163824d992f7&language=en-US`
    const requestToken = Cookies.get('request_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${requestToken}`,
      },
    }
    const response = await fetch(getMovieUrl, options)
    const data = await response.json()
    this.setState({movieDetails: data}, this.componentDidMount)
  }

  renderMoreMovies = () => {
    const {similarMoviesList} = this.state
    return (
      <>
        {similarMoviesList.map(eachMovie => {
          const similarMovieImageUrl = `https://image.tmdb.org/t/p/original/${eachMovie.poster_path}`
          const moviePath = `/movie/${eachMovie.id}`
          return (
            <Link to={moviePath}>
              <img
                className="similar-image"
                alt={eachMovie.title}
                src={similarMovieImageUrl}
              />
            </Link>
          )
        })}
      </>
    )
  }

  renderBackdropPoster = () => {
    const {movieDetails} = this.state
    const imageUrl = `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`
    return (
      <>
        <div
          className="backdrop-poster-container"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
          }}
        >
          <Headers />
          <div className="movie-details-container">
            <h1 className="movie-title">{movieDetails.title}</h1>
            <p className="movie-description">{movieDetails.overview}</p>
            <button type="button">Play</button>
          </div>
        </div>
        <div className="movie-more-details">
          <div className="each-category">
            <p className="category-names">Genres</p>
            <ul className="category-list-elements">
              {movieDetails.genres.map(genre => (
                <li className="each-element">{genre.name}</li>
              ))}
            </ul>
          </div>
          <div className="each-category">
            <p className="category-names">Audio Available</p>
            <ul className="category-list-elements">
              {movieDetails.spoken_languages.map(audio => (
                <li className="each-element">{audio.english_name}</li>
              ))}
            </ul>
          </div>
          <div className="each-category">
            <p className="category-names">Rating Count</p>
            <p className="each-element">{movieDetails.vote_count}</p>
          </div>
          <div className="each-category">
            <p className="category-names">Rating Count</p>
            <p className="each-element">{movieDetails.vote_average}</p>
          </div>
        </div>
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
            {this.renderBackdropPoster()}
            <ul className="similar-movies-container">
              {this.renderMoreMovies()}
            </ul>
          </>
        )}
      </>
    )
  }
}
export default SpecificMovie
