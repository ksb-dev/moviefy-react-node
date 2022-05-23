import React, { useState, useEffect } from 'react'

import { useGlobalContext } from '../../context/context'

import { motion } from 'framer-motion'

//import './Filter.css'

const Filter = ({ activeGenre, setActiveGenre }) => {
  const {
    movies,
    setFiltered,
    //wishlist,
    //setWishlistFiltered,
    more,
    setMore,
    isLoading,
    toggleMode,
    filtered,
    storedActiveGenre,
    //selected,
    setSelected
  } = useGlobalContext()

  const [isActive, setIsActive] = useState(false)

  const options = [
    'All',
    'Action',
    'Adventure',
    'Animation',
    'Thriller',
    'Comedy',
    'Crime',
    'Drama',
    'Horror',
    'Rating (1 - 9)',
    'Rating (9 - 1)',
    'Title (A - Z)',
    'Title (Z - A)'
  ]

  useEffect(() => {
    //console.log(localStorage.getItem('genre'))

    //let storedActiveGenre = Number(localStorage.getItem('activeGenre'))

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    if (storedActiveGenre === 0) {
      const films = movies.map(movies => movies)
      setFiltered(films)

      /*const wish = wishlist.map(movies => movies)
      setWishlistFiltered(wish)*/
      return
    }

    if (storedActiveGenre === 1) {
      const films = []

      movies.forEach(film => {
        films.push(film)
      })

      const lowestToHighest = films.sort(
        (a, b) => a.vote_average - b.vote_average
      )

      const inc = lowestToHighest.map(movie => movie)
      setFiltered(inc)

      /*const wish = []

      wishlist.forEach(film => {
        wish.push(film)
      })

      const lowestToHighestWishlist = wish.sort(
        (a, b) => a.movie_vote - b.movie_vote
      )

      const incw = lowestToHighestWishlist.map(movie => movie)

      
      setWishlistFiltered(incw)*/
      return
    }

    if (storedActiveGenre === 2) {
      const films = []

      movies.forEach(film => {
        films.push(film)
      })

      const highestToLowest = films.sort(
        (a, b) => b.vote_average - a.vote_average
      )

      const inc = highestToLowest.map(movie => movie)
      setFiltered(inc)

      /*const wish = []

      wishlist.forEach(film => {
        wish.push(film)
      })

      const highestToLowestWishlist = wish.sort(
        (a, b) => b.movie_vote - a.movie_vote
      )

      const incw = highestToLowestWishlist.map(movie => movie)

      
      setWishlistFiltered(incw)*/
      return
    }

    if (storedActiveGenre === 3) {
      const films = []

      movies.forEach(film => {
        films.push(film)
      })

      const ascendingMovies = films.sort(function (a, b) {
        if (a.title) return a.title.localeCompare(b.title)
      })

      const inc = ascendingMovies.map(movie => movie)
      setFiltered(inc)

      /*const wish = []

      wishlist.forEach(film => {
        wish.push(film)
      })

      const ascendingWishlist = wish.sort(function (a, b) {
        return a.movie_name.localeCompare(b.movie_name)
      })

      const incw = ascendingWishlist.map(movie => movie)

      
      setWishlistFiltered(incw)*/
      return
    }

    if (storedActiveGenre === 4) {
      const films = []

      movies.forEach(film => {
        films.push(film)
      })

      const descendingMovies = films.sort(function (a, b) {
        if (b.title) return b.title.localeCompare(a.title)
      })

      const inc = descendingMovies.map(movie => movie)
      setFiltered(inc)

      /*const wish = []

      wishlist.forEach(film => {
        wish.push(film)
      })

      const descendingWishlist = wish.sort(function (a, b) {
        return b.movie_name.localeCompare(a.movie_name)
      })

      const incw = descendingWishlist.map(movie => movie)

      
      setWishlistFiltered(incw)*/
      return
    }

    const filter = movies.filter(movie =>
      movie.genre_ids.includes(storedActiveGenre)
    )

    setFiltered(filter)

    /*const filterWishlist = wishlist.filter(movie =>
      movie.genre.includes(storedActiveGenre)
    )
    setWishlistFiltered(filterWishlist)*/
  }, [activeGenre, more, isLoading, movies, setFiltered, storedActiveGenre])

  const handleClick = genre => {
    if (genre === 'All') {
      setActiveGenre(0)
      localStorage.setItem('activeGenre', 0)
      setMore(!more)
    } else if (genre === 'Action') {
      setActiveGenre(28)
      localStorage.setItem('activeGenre', 28)
    } else if (genre === 'Adventure') {
      setActiveGenre(12)
      localStorage.setItem('activeGenre', 12)
    } else if (genre === 'Animation') {
      setActiveGenre(16)
      localStorage.setItem('activeGenre', 16)
    } else if (genre === 'Thriller') {
      setActiveGenre(53)
      localStorage.setItem('activeGenre', 53)
    } else if (genre === 'Comedy') {
      setActiveGenre(35)
      localStorage.setItem('activeGenre', 35)
    } else if (genre === 'Crime') {
      setActiveGenre(80)
      localStorage.setItem('activeGenre', 80)
    } else if (genre === 'Drama') {
      setActiveGenre(18)
      localStorage.setItem('activeGenre', 18)
    } else if (genre === 'Horror') {
      setActiveGenre(27)
      localStorage.setItem('activeGenre', 27)
    } else if (genre === 'Rating (1 - 9)') {
      setActiveGenre(1)
      localStorage.setItem('activeGenre', 1)
    } else if (genre === 'Rating (9 - 1)') {
      setActiveGenre(2)
      localStorage.setItem('activeGenre', 2)
    } else if (genre === 'Title (A - Z)') {
      setActiveGenre(3)
      localStorage.setItem('activeGenre', 3)
    } else {
      setActiveGenre(4)
      localStorage.setItem('activeGenre', 4)
    }
  }

  return (
    <div className='filter'>
      <i
        className={
          toggleMode === 'white'
            ? 'fa-solid fa-filter darkColor1'
            : 'fa-solid fa-filter lightColor1'
        }
      ></i>

      <div
        className={
          toggleMode === 'white'
            ? 'filter__dropdown darkColorBg2'
            : 'filter__dropdown lightColorBg2'
        }
      >
        <div className='filter__btn' onClick={() => setIsActive(!isActive)}>
          {/*{selected ? selected : 'All'}*/}
          {/*{filtered.length === 20 && selected}*/}

          <span className='filter__option'>
            {(filtered.length !== 20 || filtered.length === 20) &&
              localStorage.getItem('genre') &&
              localStorage.getItem('genre')}
          </span>

          {isActive ? (
            <i className='fa-solid fa-caret-up'></i>
          ) : (
            <i className='fa-solid fa-caret-down'></i>
          )}
        </div>

        {isActive && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.2 }}
            className={
              toggleMode === 'white'
                ? 'filter__content darkColorBg2'
                : 'filter__content lightColorBg2'
            }
          >
            {options.map((option, index) => {
              return (
                <div
                  key={index}
                  className='filter__item'
                  onClick={e => {
                    setSelected(e.target.textContent)
                    localStorage.setItem('genre', e.target.textContent)
                    setIsActive(!isActive)
                    handleClick(e.target.textContent)
                  }}
                >
                  {option}
                </div>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Filter
