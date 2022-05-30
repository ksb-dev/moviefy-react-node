import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Context
import { useGlobalContext } from '../../context/context'

const SmallNav = () => {
  const { wishlistFiltered, loadMovies } = useGlobalContext()

  const navigate = useNavigate()

  return (
    <div className='small-navigation'>
      <h4
        className='title'
        onClick={() => {
          localStorage.setItem('activeGenre', 0)
          localStorage.setItem('genre', 'All')
          navigate('/')
          loadMovies('popular', 1)
        }}
      >
        Moviefy
      </h4>

      {window.location.pathname.includes('/bookmarks') ? (
        <p className='wish-link-small'>
          <Link to='/bookmarks'>
            <span className='activeLink' style={{ padding: '0' }}>
              Wishlists
            </span>
            <span className='length activeLength'>
              {wishlistFiltered.length}
            </span>
          </Link>
        </p>
      ) : (
        <p className='wish-link-small'>
          <Link to='/bookmarks'>
            Wishlists
            <span className='length inactiveLength'>
              {wishlistFiltered.length}
            </span>
          </Link>
        </p>
      )}
    </div>
  )
}

export default SmallNav
