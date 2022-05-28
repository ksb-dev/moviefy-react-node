import React, { useEffect, useState } from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import SearchedMovies from '../../components/SearchedMovies/SearchedMovies'
import Navigation from '../../components/Navigation/Navigation'
import SideMenu from '../../components/SideMenu/SideMenu'
import SmallNav from '../../components/SmallNav/SmallNavigation'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

import './Search.css'

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&query="`

const Search = () => {
  const { searchMovies, toggleMode, isLoading, filtered } = useGlobalContext()
  const [query, setQuery] = useState('')

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    const query = localStorage.getItem('term')
    if (isLoading && query) searchMovies(SEARCH_API + query, query)
  }, [isLoading])

  /*useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  })*/

  return (
    <>
      <Login />
      <Signup />

      <div
        className={toggleMode === 'white' ? 'full lightBg1' : 'full darkBg1'}
      >
        <Navigation />

        <SideMenu filtered={filtered} />

        <SmallNav />

        <div
          className={
            toggleMode === 'white'
              ? 'search alphaLightBg2'
              : 'search alphaDarkBg2'
          }
        >
          {/*<label
          className={toggleMode === 'white' ? 'darkColor1' : 'lightColor1'}
          id='input'
        >
          Enter your search here
      </label>*/}

          <form
            className={
              toggleMode === 'white'
                ? 'search-form lightBg2'
                : 'search-form darkBg2'
            }
            onSubmit={e => {
              e.preventDefault()
              localStorage.setItem('term', query)
              searchMovies(SEARCH_API + query, query)
            }}
            id='input'
          >
            <input
              type='text'
              placeholder='Search'
              className={
                toggleMode === 'white'
                  ? 'form-input darkColor1'
                  : 'form-input lightColor2'
              }
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </form>
        </div>

        <SearchedMovies setQuery={setQuery} />
      </div>
    </>
  )
}

export default Search
