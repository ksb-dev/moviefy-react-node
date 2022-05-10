import React from 'react'

// Context
import { useGlobalContext } from '../../context/context'

// Components
import ReactPlayer from 'react-player'

const Youtube = ({ youtube_div, off, trailerUrl, setTrailerUrl }) => {
  const { toggleMode } = useGlobalContext()

  const close = () => {
    setTimeout(() => {
      setTrailerUrl('')
    }, 500)
    youtube_div.current.style.transform = 'translateY(100%)'
  }

  return (
    <div
      ref={youtube_div}
      className={
        toggleMode === 'white' ? 'youtube lightBg2' : 'youtube darkBg2'
      }
    >
      {trailerUrl && (
        <>
          <div
            className={
              toggleMode === 'white'
                ? 'youtube__close darkColor1'
                : 'youtube__close lightColor1'
            }
            ref={off}
            onClick={() => close()}
          >
            <i className='fa-solid fa-xmark fa-3x'></i>
          </div>

          <div className='youtube__wrapper'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailerUrl}`}
              controls={true}
              playing={true}
              width='100%'
              height='100%'
            />
          </div>
        </>
      )}

      {!trailerUrl && (
        <>
          <button className='youtube__close' ref={off} onClick={() => close()}>
            <i
              className={
                toggleMode === 'white'
                  ? 'fa-solid fa-xmark fa-3x darkColor1'
                  : 'fa-solid fa-xmark fa-3x lightColor1'
              }
            ></i>
          </button>
          <div
            className={
              toggleMode === 'white'
                ? 'youtube__not-found darkColor1'
                : 'youtube__not-found lightColor1'
            }
          >
            trailer not found
          </div>
        </>
      )}
    </div>
  )
}

export default Youtube
