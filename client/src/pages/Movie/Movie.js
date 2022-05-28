import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import Navigation from '../../components/Navigation/Navigation'
import ImageInfo from '../../components/ImageInfo/ImageInfo'
import Youtube from '../../components/Youtube/Youtube'
import Cast from '../../components/Cast/Cast'
import PersonDetail from '../../components/PersonDetail/PersonDetail'
import SmallNav from '../../components/SmallNav/SmallNavigation'
import SideMenu from '../../components/SideMenu/SideMenu'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

import { motion } from 'framer-motion'

const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState({})
  const [trailerUrl, setTrailerUrl] = useState('')
  const [people, setPeople] = useState([])
  const [person, setPerson] = useState({})
  const [personError, setPersonError] = useState(false)
  const [read, setRead] = useState(false)

  const {
    toggleMode,
    error,
    setError,
    isLoading,
    setIsLoading,
    filtered
  } = useGlobalContext()

  // URL's
  const GET_DETAILS = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`
  const GET_CAST = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_KEY}&language=en-US`

  // Ref's
  const off = useRef(null)
  const youtube_div = useRef(null)
  const detail = useRef(null)

  const fetchMovie = useCallback(
    async url => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })

      setIsLoading(true)

      try {
        const response = await fetch(url)
        const data = await response.json()

        if (data) {
          setIsLoading(false)
          setMovie(data)
        }
      } catch (error) {
        setIsLoading(false)
        setError({ show: true, msg: 'Movie Details Not Found' })
      }
    },
    [setError, setIsLoading]
  )

  // Fetch Movie

  useEffect(() => {
    fetchMovie(GET_DETAILS)
  }, [id, GET_DETAILS, fetchMovie])

  useEffect(() => {
    const getCast = async url => {
      const response = await fetch(url)
      const cast = await response.json()

      if (cast) {
        setPeople(cast.cast)
      }
    }
    getCast(GET_CAST)
  }, [GET_CAST])

  if (isLoading) {
    return <div className='loading'></div>
  }

  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.msg}</h1>
      </div>
    )
  }

  return (
    <>
      <Login />
      <Signup />

      <div className='movie'>
        {/* Navigation */}

        <Navigation />

        <SideMenu filtered={filtered} />

        <SmallNav />

        {/* Single Movie */}

        <div
          className={
            toggleMode === 'white'
              ? 'movie__main lightBg1'
              : 'movie__main darkBg1'
          }
        >
          <div className='movie__content'>
            {/* Image Information */}

            <ImageInfo
              movie={movie}
              id={id}
              trailerUrl={trailerUrl}
              youtube_div={youtube_div}
              setTrailerUrl={setTrailerUrl}
            />

            <motion.h6
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.75 }}
              className={toggleMode === 'white' ? 'hrlineBlack' : 'hrlineWhite'}
            ></motion.h6>

            {/* Overview */}

            {movie.overview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.75 }}
                className={
                  toggleMode === 'white'
                    ? 'movie__overview darkColor1'
                    : 'movie__overview lightColor2'
                }
              >
                <h3>Overview</h3>

                <h4>
                  {!read && movie.overview.substring(0, 250)}

                  {!read && movie.overview.length > 250 && (
                    <span onClick={() => setRead(true)}>
                      {' '}
                      read more <i className='fa-solid fa-plus'></i>
                    </span>
                  )}

                  {read && movie.overview}

                  {read && movie.overview.length > 250 && (
                    <span onClick={() => setRead(false)}>
                      {' '}
                      hide more <i className='fa-solid fa-minus'></i>
                    </span>
                  )}
                </h4>
              </motion.div>
            )}

            <motion.h6
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className={toggleMode === 'white' ? 'hrlineBlack' : 'hrlineWhite'}
            ></motion.h6>

            {/* Cast */}

            {people && (
              <Cast
                people={people}
                setPerson={setPerson}
                personError={personError}
                setPersonError={setPersonError}
                detail={detail}
              />
            )}
          </div>
        </div>

        {/* person detail */}
        <PersonDetail detail={detail} person={person} />

        {/* youtube-div div*/}
        <Youtube
          off={off}
          youtube_div={youtube_div}
          trailerUrl={trailerUrl}
          setTrailerUrl={setTrailerUrl}
        />
      </div>
    </>
  )
}

export default Movie
