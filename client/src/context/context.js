import React, { useState, useContext, useEffect, useCallback } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const POPULAR_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_KEY}&language=en-US&sort_by=popularity.desc`
const TRENDING = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_KEY}`
const NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_KEY}&language=en-US`
const UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_KEY}&language=en-US`
const TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_KEY}&language=en-US`

const AppProvider = ({ children }) => {
  // Loading , Error, Toggle Mode
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })
  const [toggleMode, setToggleMode] = useState('white')

  // Movie, Filter, Wishlist
  const [movies, setMovies] = useState([])
  const [filtered, setFiltered] = useState('')
  const [wishlist, setWishlist] = useState('')
  const [wishlistFiltered, setWishlistFiltered] = useState('')
  const [activeGenre, setActiveGenre] = useState(0)
  const [more, setMore] = useState(false)
  const [selected, setSelected] = useState('All')

  let storedActiveGenre = Number(localStorage.getItem('activeGenre'))

  // Category, Page, Total Pages
  const [category, setCategory] = useState('')
  let [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // User , Token
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')

  // Search states
  const [searchMovie, setSearchMovie] = useState([])
  const [searchError, setSearchError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Search Movies
  const searchMovies = async (searchTerm, queryTerm) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    setIsLoading(true)

    try {
      const response = await fetch(searchTerm)
      const data = await response.json()

      if (queryTerm === '') {
        setSearchError({
          show: true,
          msg: 'Please Enter Something!'
        })
        setIsLoading(false)
        setSearchTerm('')
        setSearchMovie('')
        return
      }

      if (data.results.length === 0) {
        setIsLoading(false)
        setSearchError({
          show: true,
          msg: 'Movie not found!'
        })
        setSearchMovie('')
        setSearchTerm('')
      } else {
        setSearchMovie(data.results)
        setSearchError({ show: false, msg: '' })
        setIsLoading(false)
        setSearchTerm(queryTerm)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Get wishlist
  const getWishlist = async () => {
    const savedToken = localStorage.getItem('token')

    try {
      const response = await axios.get('/api/v1/wishlist', {
        headers: {
          Authorization: `Bearer ${savedToken}`
        }
      })
      setWishlist(response.data.wishlists)
      setWishlistFiltered(response.data.wishlists)
    } catch (error) {
      //console.log(error.response.data.message)
    }
  }

  useEffect(() => {
    if (user) {
      getWishlist()
    }
  }, [user])

  // Fetch Movies
  const fetchMovies = async (url, category, page) => {
    localStorage.setItem('category', category)
    localStorage.setItem('page', page)

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    setIsLoading(true)
    setCategory('')

    try {
      const response = await fetch(url + `&page=${page}`)
      const data = await response.json()

      setTotalPages(data.total_pages)

      if (data.results.length === 0) {
        setError({ show: true, msg: 'Movies not found!' })
      } else {
        setMovies(data.results)
        setFiltered(data.results)

        setError({ show: false, msg: '' })
        setIsLoading(false)
        setCategory(category)
      }
    } catch (error) {
      setIsLoading(false)
      setError({ show: true, msg: 'Could Not Fetch Data!' })
      setCategory('')
    }
  }

  const loadMovies = useCallback((category, page) => {
    if (category === 'popular') fetchMovies(POPULAR_URL, category, page)
    if (category === 'trending') fetchMovies(TRENDING, category, page)
    if (category === 'now playing') fetchMovies(NOW_PLAYING, category, page)
    if (category === 'upcoming') fetchMovies(UPCOMING, category, page)
    if (category === 'top rated') fetchMovies(TOP_RATED, category, page)
  }, [])

  useEffect(() => {
    // Get page number
    const page = Number(localStorage.getItem('page'))

    // Get user
    const userName = localStorage.getItem('name')
    setUser(userName)

    // Set mode
    if (localStorage.getItem('mode') === null) {
      localStorage.setItem('mode', 'white')
      setToggleMode('white')
    } else {
      setToggleMode(localStorage.getItem('mode'))
    }

    // Set genre
    if (localStorage.getItem('genre') === null) {
      localStorage.setItem('genre', 'All')
    }

    // Load movies
    if (localStorage.getItem('category') === null && page === 0) {
      loadMovies('popular', 1)
    } else {
      loadMovies(localStorage.getItem('category'), page)
    }
  }, [loadMovies])

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        movies,
        setMovies,
        filtered,
        setFiltered,
        wishlistFiltered,
        setWishlistFiltered,
        wishlist,
        setWishlist,
        category,
        setCategory,
        totalPages,
        setTotalPages,
        toggleMode,
        setToggleMode,
        user,
        setUser,
        token,
        setToken,
        activeGenre,
        setActiveGenre,
        more,
        setMore,
        storedActiveGenre,
        selected,
        setSelected,
        loadMovies,
        page,
        setPage,
        getWishlist,
        searchMovies,
        searchMovie,
        setSearchMovie,
        searchTerm,
        setSearchTerm,
        searchError
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
