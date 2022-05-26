import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useGlobalContext } from '../context/context'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const navigate = useNavigate()

  const {
    setUser,
    setToken,
    logPage,
    loadMovies,
    setSearchMovie,
    setSearchTerm
  } = useGlobalContext()

  const login = async (email, password, setEmail, setPassword) => {
    console.log(1)
    setError(null)
    setIsPending(true)

    try {
      console.log(2)

      // Sign the user in
      const response = await axios.post('/api/v1/auth/login', {
        email,
        password
      })

      console.log(3)

      if (!response) {
        console.log(4)

        throw new Error('Could not complete signup')
      } else {
        console.log(5)

        localStorage.setItem('name', response.data.user.name)
        localStorage.setItem('token', response.data.token)
        setUser(response.data.user.name)
        setToken(response.data.token)
        setEmail('')
        setPassword('')

        localStorage.removeItem('term')
        localStorage.setItem('mode', 'white')
        localStorage.setItem('genre', 'All')
        localStorage.setItem('page', 1)
        localStorage.setItem('category', 'popular')
        localStorage.setItem('activeGenre', 0)
        loadMovies('popular', 1)
        setSearchMovie([])
        setSearchTerm('')

        navigate('/')

        logPage.current.style.zIndex = '-1'
        logPage.current.style.opacity = '0'
        logPage.current.style.transform = 'scale(0)'

        //window.location.reload()
      }

      console.log(6)

      // Update state
      if (isCancelled) {
        console.log(7)

        setError(null)
        setIsPending(false)
      }

      console.log(8)
    } catch (error) {
      console.log(9)
      if (isCancelled) {
        console.log(10)

        setError(error.response.data.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => {
      console.log(11)

      setIsCancelled(true)
    }
  }, [])

  return { error, isPending, login }
}
