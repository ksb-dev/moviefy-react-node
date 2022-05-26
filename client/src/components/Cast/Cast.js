import React from 'react'

// Components
import Person from '../Person/Person'

// Hooks
import { useGlobalContext } from '../../context/context'

import { motion } from 'framer-motion'

const Cast = ({ setPerson, setPersonError, detail, people }) => {
  const { toggleMode } = useGlobalContext()

  const getPersonDetail = async id => {
    const getPersonDetail = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`

    const response = await fetch(getPersonDetail)
    const details = await response.json()

    if (details) {
      setPerson(details)
      setPersonError(false)
      //detail.current.style.transform = 'translateX(0%)'
      detail.current.style.zIndex = '3'
      detail.current.style.opacity = '1'
      detail.current.style.transform = 'scale(1)'
    } else {
      setPersonError(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className={
        toggleMode === 'white' ? 'cast darkColor1' : 'cast lightColor1'
      }
    >
      {people && <h3>Cast</h3>}

      <div
        className={toggleMode === 'white' ? 'cast__content' : 'cast__content'}
      >
        {people &&
          people.map(person => {
            const { profile_path, character, original_name, id } = person

            return (
              <div className='cast__person' key={id}>
                <Person
                  profile_path={profile_path}
                  character={character}
                  original_name={original_name}
                  toggleMode={toggleMode}
                  getPersonDetail={getPersonDetail}
                  id={id}
                />
              </div>
            )
          })}
      </div>
    </motion.div>
  )
}

export default Cast
