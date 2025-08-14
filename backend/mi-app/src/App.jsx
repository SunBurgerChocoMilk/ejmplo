import { useState } from 'react'
import './App.css'
import Perfil from './components/Perfil.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'

function App() {
  const [vista, setVista] = useState('register');

  return (
    <div>
      <h1>Bienvenidos</h1>
      <button onClick={() => setVista('register')}>Registrarse</button>
      <button onClick={() => setVista('login')}>Iniciar Sesión</button>
      <br /><br />
      {vista === 'register' && <Register />}
      {vista === 'login' && <Login />}
    </div>
  )
}

export default App