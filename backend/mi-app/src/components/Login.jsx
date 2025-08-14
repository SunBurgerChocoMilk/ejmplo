import useState from 'react';
import React from 'react';
function Login() {
    const [mensaje, setmensaje] = useState('');
    return (
        <div>
            <h2>Iniciar Sesiòn</h2>
            <form>
                <input
                    type="text"
                    name="username"
                    placeholder="Nombre de Usuario"
                    value= ""
                />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                />
            </form>
        </div>


    );
}
export default Login;
