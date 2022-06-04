import React, { useEffect } from 'react'

import CountUp from 'react-countup'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Header from '../../components/Header/Header'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import MovieCard from '../../components/MovieCard/MovieCard'
import SmallNav from '../../components/SmallNav/SmallNavigation'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

const Wishlists = () => {
  const {
    isLoading,
    toggleMode,
    wishlistFiltered,
    setWishlistFiltered,
    wishlist,
    filtered,
    error
  } = useGlobalContext()

  useEffect(() => {
    setWishlistFiltered(wishlist)

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  if (isLoading) {
    return <div className='loading'></div>
  }

  if (error.show) {
    return <div className='error'>{error.msg}</div>
  }

  return (
    <>
      <Login />

      <Signup />

      <Header />

      <NavigationBar filtered={filtered} />

      <div
        className={toggleMode === 'white' ? 'whole lightBg1' : 'whole darkBg1'}
      >
        <SmallNav />

        <section className='wishlists'>
          <div className='wishlist-list'>
            {wishlistFiltered.length > 0 &&
              wishlistFiltered.map(movie => {
                const {
                  movie_id,
                  movie_name,
                  poster_path,
                  release_date,
                  movie_vote
                } = movie

                return (
                  <MovieCard
                    key={movie_id}
                    movie={movie}
                    id={movie_id}
                    title={movie_name}
                    poster_path={poster_path}
                    vote_average={movie_vote}
                    release_date={release_date}
                  />
                )
              })}

            {wishlistFiltered.length === 0 && (
              <h3
                style={{
                  color: 'tomato',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}
              >
                Add movies to wishlist
              </h3>
            )}
          </div>
          <h6
            className={toggleMode === 'white' ? 'hrlineBlack' : 'hrlineWhite'}
          ></h6>
        </section>
      </div>
    </>
  )
}

export default Wishlists
