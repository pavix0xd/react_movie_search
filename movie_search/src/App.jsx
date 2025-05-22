import './main.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'
import MovieDetails from './pages/MovieDetails'
import Trending from './pages/Trending'
import Filter from './pages/Filter'
import PersonDetails from './pages/PersonDetails';

function App() {
  return (
    <MovieProvider>
      <NavBar/>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/person/:id" element={<PersonDetails />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </main>
    </MovieProvider>
  )
}

export default App
