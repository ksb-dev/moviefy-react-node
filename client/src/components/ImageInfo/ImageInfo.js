import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Hooks
import { getTrailer } from '../../Hooks/useGetTrailer'
import { addWishlist } from '../../Hooks/useAddWishlist'
import { deleteWishlist } from '../../Hooks/useDeleteWishlist'

// Context
import { useGlobalContext } from '../../context/context'

import { motion } from 'framer-motion'

const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const ImageInfo = ({ movie, id, youtube_div, trailerUrl, setTrailerUrl }) => {
  const {
    toggleMode,
    wishlist,
    getWishlist,
    user,
    logPage
  } = useGlobalContext()

  const [bookmark, setBookmark] = useState(false)

  const {
    poster_path,
    title,
    release_date,
    genres,
    runtime,
    tagline,
    vote_average,
    vote_count,
    original_language,
    backdrop_path
  } = movie

  //console.log(wishlist)

  useEffect(() => {
    if (wishlist) {
      wishlist.map(wish => {
        if (wish.movie_id === Number(id)) setBookmark(true)
      })
    }
    if (wishlist.length === 0) setBookmark(false)
  }, [wishlist])

  const getClassByRate = vote => {
    if (vote >= 8) {
      return 'green'
    } else if (vote >= 5) {
      return 'orange'
    } else {
      return 'tomato'
    }
  }

  const showLog = () => {
    logPage.current.style.zIndex = '10'
    logPage.current.style.opacity = '1'
    logPage.current.style.transform = 'scale(1)'
  }

  return (
    <motion.div
      initial={{ x: '-100vw' }}
      animate={{ x: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className='first-segment'
      style={{ backgroundImage: `url(${IMG_PATH + backdrop_path})` }}
    >
      {/* start of Image + Rating */}

      <div
        className={
          toggleMode === 'white'
            ? 'first-segment__content alphaLightBg2 darkColor1'
            : 'first-segment__content alphaDarkBg2 lightColor1'
        }
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className='first-segment__image-rating'
        >
          <img
            className='first-segment__image'
            src={poster_path === null ? url : IMG_PATH + poster_path}
            alt={title}
          />

          {vote_average && (
            <h5
              className={`first-segment__rating ${getClassByRate(
                vote_average
              )}`}
            >
              <span>{vote_average}</span>
            </h5>
          )}

          {user && !bookmark && (
            <h5
              className='first-segment__add'
              onClick={() =>
                addWishlist(
                  id,
                  title,
                  poster_path,
                  release_date,
                  vote_average,
                  setBookmark,
                  getWishlist,
                  '/api/v1/wishlist'
                  //genre_ids
                )
              }
            >
              <i className='fa-solid fa-plus'></i> Wishlist
            </h5>
          )}

          {user && bookmark && (
            <h5
              className='first-segment__remove'
              onClick={() =>
                deleteWishlist(
                  setBookmark,
                  getWishlist,
                  `/api/v1/wishlist/${id}`
                )
              }
            >
              <i className='fa-solid fa-trash-can'></i> Wishlist
            </h5>
          )}

          {!user && (
            <h5 onClick={showLog} className='first-segment__add'>
              <Link to='#'>Login to wishlist</Link>
            </h5>
          )}
        </motion.div>

        {/* end of Image + Rating */}

        {/* start of more-info div */}

        <div className='first-segment__more-info'>
          {title && (
            <h3 className='first-segment__more-info--title'>{title}</h3>
          )}

          {tagline && (
            <h4
              className={` first-segment__more-info--tagline ${getClassByRate(
                vote_average
              )}`}
            >
              {tagline}
            </h4>
          )}

          {/* genre-div div */}

          <div className='first-segment__genre-div'>
            {genres &&
              genres.map(genre => {
                return (
                  <h4
                    className={
                      toggleMode === 'white'
                        ? 'first-segment__genre-div--genre darkBorder'
                        : 'first-segment__genre-div--genre lightBorder'
                    }
                    key={genre.id}
                  >
                    {genre.name}
                  </h4>
                )
              })}
          </div>

          {release_date && (
            <h5>
              release date -{' '}
              <span className='first-segment__more-info--release'>
                {release_date}
              </span>
            </h5>
          )}

          {runtime && (
            <h5>
              runtime -{' '}
              <span className='first-segment__more-info--runtime'>
                {runtime} minutes
              </span>
            </h5>
          )}

          {original_language && (
            <h5>
              language -{' '}
              <span className='first-segment__more-info--language'>
                {original_language}
              </span>{' '}
            </h5>
          )}

          {vote_count && (
            <h5>
              votes -{' '}
              <span className='first-segment__more-info--vote'>
                {vote_count}
              </span>{' '}
            </h5>
          )}

          {title && (
            <button
              className={
                toggleMode === 'white'
                  ? 'first-segment__more-info--trailer-btn darkColor2'
                  : 'first-segment__more-info--trailer-btn lightColor1'
              }
              onClick={() =>
                getTrailer(id, youtube_div, trailerUrl, setTrailerUrl)
              }
            >
              <i className='fa-solid fa-circle-play fa-3x'></i>
            </button>
          )}

          {!title &&
            !genres &&
            !vote_average &&
            !vote_count &&
            !original_language &&
            !runtime &&
            !release_date &&
            !tagline && <h5>No details found</h5>}
        </div>

        {/* end of more-info div */}
      </div>
    </motion.div>
  )
}

export default ImageInfo
