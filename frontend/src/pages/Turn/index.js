import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./styles.css"

export default function Turn() {
    const [formularioEnviado, cambiarFormularioEnviado] = useState(false)
    return (
        <>
            <h1 id="title" >Welcome To Turns</h1>
            <Formik
                initialValues={{
                    fecha: '',
                    hora: '',
                    doctor: '',
                    paciente: ''
                    
                }}
                validate={(valores) => {
                    let errores = {};

                    //validacion nombre
                    if(!valores.doctor){
                        errores.doctor = 'porfavor ingresa el nombre del doctor'
                    } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.doctor)){
                        errores.doctor = 'El nombre solo puede contener letras y espacios'
                    }

                    //validacion correo
                    if(!valores.paciente){
                        errores.paciente = 'porfavor ingresa el nombre del paciente'
                    } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.paciente)){
                        errores.paciente = 'El nombre solo puede contener letras y espacios'
                    }

                    //validacion hora
                    if(!valores.hora){
                        errores.hora = 'porfavor ingresa una hora'
                    } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.hora)){
                        errores.hora = 'Por favor ingresa una hora'
                    }
                 
                    //validacion fecha
                    if(!valores.fecha){
                        errores.fecha = 'porfavor ingresa una fecha'
                    } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.fecha)){
                        errores.fecha = 'Por favor ingresa una fecha'
                    }
                    return errores;
                    
                }}
                onSubmit={(valores, {resetForm}) => {
                    resetForm();
                    console.log('Formulario enviado'); 
                    cambiarFormularioEnviado(true);  
                    setTimeout(() => cambiarFormularioEnviado(false), 5000);

                }}

                
            >
            
                {( {errors} ) => (
                <Form className="formulario">
                        
                    <div>
                        <label htmlFor="fecha">Fecha</label>
                        <Field 
                            type="date" 
                            id="fecha" 
                            name="fecha" 
                            placeholder="DD/MM/YYYY" 

                        />
                            <ErrorMessage name="fecha" component={() => (
                                <div className="error">{errors.fecha}</div>
                            )} />
 
                    </div>
                    <div>
                        <label htmlFor="hora">Hora</label>
                        <Field  
                            type="number" 
                            id="hora" 
                            name="hora" 
                            placeholder="HH/MM" 

                        />
                            <ErrorMessage name="hora" component={() => (
                                <div className="error">{errors.hora}</div>
                            )} />
 
                    </div>
                    <div>
                        <label htmlFor="paciente">Paciente</label>
                        <Field  
                            type="text" 
                            id="paciente" 
                            name="paciente" 
                            placeholder="Nombre del paciente" 
                            

                            />
                            <ErrorMessage name="paciente" component={() => (
                                <div className="error">{errors.paciente}</div>
                            )} />
                            
                    </div>
                    <div>
                        <label htmlFor="doctor">Doctor</label>
                        <Field  
                            type="text" 
                            id="doctor" 
                            name="doctor" 
                            placeholder="Nombre del doctor" 
                            
                            />
                            <ErrorMessage name="doctor" component={() => (
                                <div className="error">{errors.doctor}</div>
                            )} />
                    </div>


                    <button type="submit">Enviar</button>
                    {formularioEnviado && <p className="exito">Formulario enviado con éxito!</p>}
                </Form>
                )}
            </Formik>
        </>
    )
}
