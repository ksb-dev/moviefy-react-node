import React, { useEffect, useState } from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import SearchedMovies from '../../components/SearchedMovies/SearchedMovies'
import Navigation from '../../components/Navigation/Navigation'
import SmallNav from '../../components/SmallNav/SmallNavigation'

import './Search.css'

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_KEY}&query="`

const Search = () => {
  const { searchMovies, toggleMode, isLoading } = useGlobalContext()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const query = localStorage.getItem('term')
    if (isLoading && query) searchMovies(SEARCH_API + query, query)
  }, [isLoading])

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  })

  return (
    <>
      <Navigation />

      <SmallNav />

      <div
        className={
          toggleMode === 'white' ? 'search lightBg1' : 'search darkBg1'
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
                : 'form-input lightColor1'
            }
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </form>
      </div>

      <SearchedMovies setQuery={setQuery} />
    </>
  )
}

export default Search
