import React from 'react'

// Context
import { useGlobalContext } from '../../context/context'

const SmallNav = () => {
  const { toggleMode } = useGlobalContext()

  return (
    <h4
      className={
        toggleMode === 'white'
          ? 'small-navigation lightBg2'
          : 'small-navigation darkBg2'
      }
    >
      Moviefy
    </h4>
  )
}

export default SmallNav
