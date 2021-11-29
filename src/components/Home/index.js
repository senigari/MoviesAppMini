import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactSlider from '../ReactSlider'
import Footer from '../Footer'
import Header from '../Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const allMoviesCategory = [
  {
    name: 'Trending',
    url:
      'https://api.themoviedb.org/3/trending/all/week?api_key=aee73d06d456c9c1cbb5e4c4090f6384',
  },
  {
    name: 'Top Rated',
    url:
      'https://api.themoviedb.org/3/movie/top_rated?api_key=aee73d06d456c9c1cbb5e4c4090f6384&language=en-US',
  },

  {
    name: 'Original',
    url: `https://api.themoviedb.org/3/discover/tv?api_key=aee73d06d456c9c1cbb5e4c4090f6384`,
  },
]

class Home extends Component {
  state = {HomePageRandomMovie: [], isLoading: true}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const randomNumber = Math.ceil(Math.random() * 20)
    const MoviesUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=aee73d06d456c9c1cbb5e4c4090f6384`
    const requestToken = Cookies.get('request_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${requestToken}`,
      },
    }
    const response = await fetch(MoviesUrl, options)
    const data = await response.json()
    if (data.results[randomNumber] === undefined) {
      this.setState({
        HomePageRandomMovie: data.results[15],
        isLoading: false,
      })
    } else {
      this.setState({
        HomePageRandomMovie: data.results[randomNumber],
        isLoading: false,
      })
    }
  }

  renderBackdropPoster = () => {
    const {HomePageRandomMovie} = this.state
    const imageUrl = `https://image.tmdb.org/t/p/original/${HomePageRandomMovie.backdrop_path}`
    return (
      <div
        className="backdrop-poster-container"
        style={{
          backgroundImage: `url(${imageUrl})`,
          height: 500,
          width: '100vw',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Header />
        <div className="movie-details-container">
          <h1 className="movie-title">{HomePageRandomMovie.title}</h1>
          <p className="movie-description">{HomePageRandomMovie.overview}</p>
          <button type="button">Play</button>
        </div>
      </div>
    )
  }

  renderHomePage = () => (
    <>
      <div className="home-page-top-section">{this.renderBackdropPoster()}</div>
      {allMoviesCategory.map(category => (
        <ReactSlider key={category.id} category={category} />
      ))}
      <Footer />
    </>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-page-container">
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="TailSpin" color="red" height={50} width={100} />
          </div>
        ) : (
          this.renderHomePage()
        )}
      </div>
    )
  }
}
export default Home
