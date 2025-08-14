import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Perfil from './components/Perfil.jsx'
import Register from './components/Register.jsx'


function App() {
  return (
    <>
      <div>
        <h1>Bienvenidos</h1>
        <Register />
        <Login />
        <perfil />
      </div>
    </>
  )
}

export default App
