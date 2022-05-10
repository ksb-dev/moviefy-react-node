import axios from 'axios'

export const deleteWishlist = async (setBookmark, getWishlist, url) => {
  //console.log('Inside delete wishlist')
  const token = localStorage.getItem('token')

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    //console.log(response.data.wishlist)

    if (response) {
      setBookmark(false)
      getWishlist()
    }
  } catch (error) {
    //console.log(error.response.data.message)
  }
}
