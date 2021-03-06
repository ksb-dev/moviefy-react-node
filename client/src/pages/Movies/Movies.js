import React, { useEffect } from 'react'

import CountUp from 'react-countup'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Header from '../../components/Header/Header'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import MovieCard from '../../components/MovieCard/MovieCard'
import Pagination from '../../components/Pagination/Pagination'
import SmallNav from '../../components/SmallNav/SmallNavigation'
import Filter from '../../components/Filter/Filter'

const Movies = () => {
  let {
    isLoading,
    category,
    toggleMode,
    filtered,
    error,
    loadMovies,
    activeGenre,
    setActiveGenre
  } = useGlobalContext()

  useEffect(() => {}, [filtered])

  const handleClick = page => {
    if (category === 'popular') loadMovies('popular', page)
    if (category === 'trending') loadMovies('trending', page)
    if (category === 'now playing') loadMovies('now playing', page)
    if (category === 'upcoming') loadMovies('upcoming', page)
    if (category === 'top rated') loadMovies('top rated', page)
  }

  if (isLoading) {
    return <div className='loading'></div>
  }

  if (error.show) {
    return <div className='error'>{error.msg}</div>
  }

  return (
    <>
      <Header />

      <SmallNav />

      <NavigationBar filtered={filtered} />

      <section className='movies'>
        {category && (
          <div
            className={
              toggleMode === 'white'
                ? 'category__filter__length lightBg2'
                : 'category__filter__length darkBg2'
            }
          >
            <h4
              className={
                toggleMode === 'white'
                  ? 'category__filter__length-category lightBg2 darkColor1'
                  : 'category__filter__length-category darkBg2 lightColor2'
              }
            >
              <span>{category}</span>
            </h4>

            <div className='category__filter__length-filter-length'>
              <Filter
                activeGenre={activeGenre}
                setActiveGenre={setActiveGenre}
              />
              <h4
                className={
                  toggleMode === 'white'
                    ? 'length lightColorBg2'
                    : 'length darkColorBg2'
                }
              >
                <span>
                  <CountUp start={0} end={filtered.length} duration={0.1} />
                </span>
              </h4>
            </div>
          </div>
        )}

        <div className='movie-list'>
          {filtered.length > 0 &&
            filtered.map(movie => {
              const {
                id,
                title,
                poster_path,
                release_date,
                vote_average,
                genre_ids
              } = movie

              return (
                <MovieCard
                  key={id}
                  movie={movie}
                  id={id}
                  title={title}
                  poster_path={poster_path}
                  vote_average={vote_average}
                  release_date={release_date}
                  genre_ids={genre_ids}
                />
              )
            })}

          {filtered.length === 0 && (
            <h3 style={{ color: 'tomato' }}>
              No {`${localStorage.getItem('genre')}`} movies found
            </h3>
          )}
        </div>

        <h6
          className={toggleMode === 'white' ? 'hrlineBlack' : 'hrlineWhite'}
        ></h6>

        <div className='paginate-div'>
          <Pagination
            data={filtered}
            pageLimit={5}
            dataLimit={20}
            handleClick={handleClick}
          />
        </div>
      </section>
    </>
  )
}

export default Movies
