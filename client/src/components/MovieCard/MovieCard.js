import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Context
import { useGlobalContext } from '../../context/context'

// Hooks
import { addWishlist } from '../../Hooks/useAddWishlist'
import { deleteWishlist } from '../../Hooks/useDeleteWishlist'

import { motion } from 'framer-motion'

const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date
  //genre_ids
}) => {
  const { toggleMode, wishlist, user, getWishlist } = useGlobalContext()

  const [bookmark, setBookmark] = useState(false)

  //console.log(wishlist)

  useEffect(() => {
    if (wishlist) {
      for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i].movie_id === id) {
          setBookmark(true)
        }
      }
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

  return (
    <div className='movie-card'>
      {/*Image and Rating */}

      <Link to={`/movie/${id}`}>
        <div
          className={
            toggleMode === 'white'
              ? 'movie-card__image-rating lightBg2'
              : 'movie-card__image-rating darkBg2'
          }
        >
          <img
            className='movie-card__image'
            src={poster_path === null ? url : IMG_PATH + poster_path}
            alt={title}
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`movie-card__rating ${getClassByRate(vote_average)}`}
          >
            <span>{vote_average}</span>
          </motion.div>
        </div>
      </Link>

      {/* Movie-Info (Title, Year, Button) */}

      <div
        className={
          toggleMode === 'white'
            ? 'movie-card__info lightBg2'
            : 'movie-card__info darkBg2'
        }
      >
        {/* Titele and Year */}

        <div className='movie-card__title-year'>
          <h5
            className={
              toggleMode === 'white'
                ? 'movie-card__title darkColor1'
                : 'movie-card__title lightColor1'
            }
          >
            {title &&
              (title.length > 25 ? title.substring(0, 25) + '...' : title)}
          </h5>

          <div>
            <h5
              className={
                toggleMode === 'white'
                  ? 'movie-card__year darkColor1'
                  : 'movie-card__year lightColor1'
              }
            >
              {release_date ? release_date.substring(0, 4) : ''}
            </h5>
          </div>
        </div>

        {/* Wishlist Button */}

        <div className='movie-card__wishlist-btn'>
          {user && !bookmark && (
            <h5
              id='addCard'
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
              id='removeCard'
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

          {!user && <h5 id='addCard'>Login to wishlist</h5>}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
