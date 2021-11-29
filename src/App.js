import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import './App.css'
import Popular from './components/Popular'
import SpecificMovie from './components/SpecificMovie'
import Account from './components/Account'
import SearchResults from './components/SearchResults'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login/" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/movie/:id" component={SpecificMovie} />
    <ProtectedRoute exact path="/account/" component={Account} />
    <ProtectedRoute exact path="/search/:value" component={SearchResults} />
    <ProtectedRoute exact path="/page-not-found" component={NotFound} />
    <Redirect to="/page-not-found" />
  </Switch>
)

export default App
