import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';




const Formulario = ({crearCita}) => {

    // Crear State de Citas
    const [cita, actualizarCita] = useState({ // esto es un objeto
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''

    });

    const [error, actualizarError] = useState(false)

    //Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita ({
            ...cita, //Para copiar los State y no se reescriban al llenar el formulario
            [e.target.name] : e.target.value // el evento mediante el name es reescribe lo que el usuario llena en el formulario con el .value y con el onChange ejecuta la funcion en cada uno de los input
        })
    }

    //Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas} = cita;

    //Cuando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();

        //Validar
            //.trim elimina espacios a la hora de escribir al inicio y al final
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
            actualizarError(true);
            return;
        }
        //Eliminar el mensaje previo
        actualizarError(false)

        //Asignar un ID
        cita.id = uuidv4();

        //Crear la cita
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>


            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                  <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={actualizarState}
                    value={propietario}

                />
                  <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}

                />
                  <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}

                />
                  <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}

                ></textarea>
                <button 
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}
 
export default Formulario;