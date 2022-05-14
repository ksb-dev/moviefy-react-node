import React, { useEffect } from 'react'

import CountUp from 'react-countup'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import MovieCard from '../../components/MovieCard/MovieCard'
import Navgation from '../../components/Navigation/Navigation'
import SmallNav from '../../components/SmallNav/SmallNavigation'

const Wishlists = () => {
  const {
    isLoading,
    toggleMode,
    wishlistFiltered,
    setWishlistFiltered,
    wishlist,
    error
  } = useGlobalContext()

  useEffect(() => {
    setWishlistFiltered(wishlist)
  }, [])

  if (isLoading) {
    return <div className='loading'></div>
  }

  if (error.show) {
    return <div className='error'>{error.msg}</div>
  }

  return (
    <div
      className={toggleMode === 'white' ? 'whole lightBg2' : 'whole darkBg2'}
    >
      <Navgation />

      <SmallNav />

      {/*<SideMenu filtered={wishlistFiltered} />*/}

      <section className='wishlists'>
        <div className='category-length'>
          <h4 className='category'>
            <span
              className={toggleMode === 'white' ? 'darkColor1' : 'lightColor1'}
            >
              wishlists
            </span>
          </h4>

          <h4
            className={
              toggleMode === 'white'
                ? 'length darkColor1'
                : 'length lightColor1'
            }
          >
            <CountUp start={0} end={wishlistFiltered.length} duration={0.1} />
          </h4>
        </div>

        <div className='wishlist-list'>
          {/*{wishlist.length === 0 && (
            <h3 style={{ color: 'tomato' }}>Add Movies To Wishlist</h3>
          )}*/}

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
            <h3 style={{ color: 'tomato' }}>Add movies to wishlist</h3>
          )}
        </div>
      </section>
    </div>
  )
}

export default Wishlists
