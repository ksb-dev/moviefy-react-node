import React, { useEffect, useRef } from 'react'

// Context
import { useGlobalContext } from '../../context/context'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const PersonDetail = ({ detail, person }) => {
  const { toggleMode } = useGlobalContext()

  const detailInner = useRef(null)

  useEffect(() => {
    // Function for click event
    function handleOutsideClick (event) {
      if (
        detail.current.contains(event.target) &&
        !detailInner.current.contains(event.target)
      ) {
        //console.logPage('you just clicked outside of box!')
        detail.current.style.opacity = '0'
        detail.current.style.zIndex = '-1'
        detail.current.style.transform = 'scale(0)'
      }
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [detail])

  const closeDetail = () => {
    //detail.current.style.transform = 'translateX(-120%)'
    detail.current.style.zIndex = '-1'
    detail.current.style.opacity = '0'
    detail.current.style.transform = 'scale(0)'
  }

  return (
    <div
      ref={detail}
      className={
        toggleMode === 'white'
          ? 'person-detail alphaLightBg2'
          : 'person-detail alphaDarkBg2'
      }
    >
      <div
        ref={detailInner}
        className={
          toggleMode === 'white'
            ? 'person-detail__content lightBg2 darkColor1'
            : 'person-detail__content darkBg2 lightColor2'
        }
      >
        <div className='person-detail__content__close'>
          <i className='fa-solid fa-xmark fa-2x' onClick={closeDetail}></i>
        </div>

        <div className='person-detail__content__more'>
          <img className='img' src={IMG_PATH + person.profile_path} alt='' />

          <div className='person-detail__content__more__birth'>
            <h3>{person.name}</h3>
            {person.birthday && person.place_of_birth && (
              <>
                <h5>
                  Birthday - <span>{person.birthday}</span>
                </h5>
                <h5>
                  Birth Place - <span>{person.place_of_birth}</span>
                </h5>
              </>
            )}
          </div>
        </div>

        <div className='person-detail__content__bio'>
          {person.biography ? (
            <h4>{person.biography}</h4>
          ) : (
            <h4>No Details Found</h4>
          )}
        </div>
      </div>
    </div>
  )
}

export default PersonDetail
