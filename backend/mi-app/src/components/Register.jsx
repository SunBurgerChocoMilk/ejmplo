import { useState } from 'react'; // Conecta a backend

function Register() {
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState('');
    const [form, setForm] = useState({
        username: '',
        password: ''
});
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        if (response.ok) {
            setMensaje('Usuario registrado corerctamente');
            setTipoMensaje('EXITO');
            setForm({ username: '', password: ''})
        } else {
            const erro = await response.json();
            setMensaje(erro.mensaje);
            setTipoMensaje('Error');
        }
    }
    return(
        <div>   
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                
                <input
                    type="text"
                    name= "username"
                    placeholder="Nombre de Usuario"
                    value={form.username}
                    onChange={handleChange}
                />
                <br/>
                <input
                    type="password" 
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                />
                <br/>
                <br/>
                <button type="submit">Registrar</button>
            </form>
            <br/>
            
                {mensaje && (
                <div style= {{ color: tipoMensaje === 'EXITO' ? 'green' : 'red'}}>
                    {mensaje}
                </div>
            )}
            
    
        </div>


    );

}

export default Register;
