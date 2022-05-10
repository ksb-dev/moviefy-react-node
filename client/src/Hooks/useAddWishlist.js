import axios from 'axios'

export const addWishlist = async (
  id,
  title,
  poster_path,
  release_date,
  vote_average,
  setBookmark,
  getWishlist,
  url
) => {
  //console.log('Inside delete wishlist')

  const token = localStorage.getItem('token')

  try {
    const response = await axios.post(
      url,
      {
        movie_data: {
          movie_id: id,
          movie_name: title,
          poster_path,
          movie_vote: vote_average,
          release_date
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (response) {
      setBookmark(true)
      getWishlist()
    }
    //console.log(response.data.wish)
  } catch (error) {
    //console.log(error.response.data.message)
  }
}
