import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useGlobalContext } from './context/context'

import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import Movie from './pages/Movie/Movie'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Wishlists from './pages/Wishlists/Wishlists'

import './App.css'

function App () {
  const { toggleMode, movies } = useGlobalContext()

  return (
    <div className={toggleMode === 'white' ? 'lightBg2' : 'darkBg2'}>
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />

            <Route path='/movie/:id' element={<Movie />} />

            <Route path='/search' element={<Search />} />

            <Route path='/bookmarks' element={<Wishlists movies={movies} />} />

            <Route path='/login' element={<Login />} />

            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  )
}

export default App
