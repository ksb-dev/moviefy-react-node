export const getTrailer = async (
  id,
  youtube_div,
  trailerUrl,
  setTrailerUrl
) => {
  youtube_div.current.style.transform = 'translateY(0%)'

  if (trailerUrl && id) {
    setTrailerUrl('')
  } else {
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_KEY}&language=en-US`
      )
      let trailerUrl = await response.json()

      trailerUrl.results.map(result => {
        if (result.official === true) {
          setTrailerUrl(result.key)
        }
        return 0
      })

      //setTrailerUrl(trailerUrl.results[0].key)
    } catch (error) {
      console.log(error)
    }
  }
}
