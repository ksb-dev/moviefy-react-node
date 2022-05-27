import React from 'react'

// Context
import { useGlobalContext } from '../../context/context'

const SmallNav = () => {
  const { toggleMode } = useGlobalContext()

  return <h4 className='small-navigation'>Moviefy</h4>
}

export default SmallNav
