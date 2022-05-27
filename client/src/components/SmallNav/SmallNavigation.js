import React from 'react'
import { Link } from 'react-router-dom'

// Context
import { useGlobalContext } from '../../context/context'

const SmallNav = () => {
  const { wishlistFiltered } = useGlobalContext()

  return (
    <div className='small-navigation'>
      <h4 className='title'>
        Moviefy
        {window.location.pathname.includes('/movie') && (
          <span style={{ color: '#fff' }}> / movie</span>
        )}
        {window.location.pathname.includes('/search') && (
          <span style={{ color: '#fff' }}> / search</span>
        )}
        {window.location.pathname.includes('/bookmarks') && (
          <span style={{ color: '#fff' }}> / wishlists</span>
        )}
      </h4>
      <p className='wish-link-small'>
        <Link to='/bookmarks'>
          Wishlists
          <span className='lightColorBg1'>{wishlistFiltered.length}</span>
        </Link>
      </p>
    </div>
  )
}

export default SmallNav
