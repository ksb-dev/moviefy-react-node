import React from 'react'

// Context

// Components
import Login from '../Login/Login'
import Movies from '../Movies/Movies'

// Styles
import './Home.css'
import '../../styles/main.scss'

const Home = () => {
  return (
    <main className='home'>
      <Login />
      <Movies />
    </main>
  )
}

export default Home
