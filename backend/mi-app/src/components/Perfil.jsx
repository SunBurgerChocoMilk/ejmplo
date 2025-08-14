import React from 'react';
import useState from 'react';

function Perfil() {
    const [mensaje, setMensaje] = useState ('');
    const [tipoMensaje, setTipoMensaje] = useState ('');
    const [form, setform] = useState({
        username: '',
        password: '',
    });
    const handleChange = (e) => {
        setform()
        








    }
    return(
        <div>
            <h2>Perfil de Usuario</h2>
            <p>Bienvenido a tu perfil.</p>
        </div>
    );
}

export default Perfil;

