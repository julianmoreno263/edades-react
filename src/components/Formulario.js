import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {
  //state para manejar el error
  const [error, guardarError] = useState(false);

  //extraer nombre y pais
  const { nombre, pais } = busqueda;

  //funcion que pasa los datos de los inputs al state
  const handleChange = (e) => {
    //actualizamos el state
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  //funcion que se ejecuta cuando el usuario envia el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    //validar el formulario
    if (nombre.trim() === "" || pais.trim() === "") {
      guardarError(true);
      return;
    }

    //si la validacion pasa
    guardarError(false);

    /*pasar los datos al componente principal por medio de guardarConsultar,
     cuando se de submit guardarConsultar pasa a true y el useEffect lo detecta*/
    guardarConsultar(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Ambos campos son obligatorios" /> : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={nombre}
          onChange={handleChange}
        />
        <label htmlFor="nombre">Nombre: </label>
      </div>

      <div className="input-field col s12">
        <input
          type="text"
          name="pais"
          id="pais"
          value={pais}
          onChange={handleChange}
        />
        <label htmlFor="País">Código del país: </label>
      </div>

      <div className="input-field col s12">
        <input
          type="submit"
          value="Buscar Edad"
          className="waves-effect waves-light btn-large btn-block yellow accent-4"
        />
      </div>
    </form>
  );
};

//documentacion de propTypes

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  guardarBusqueda: PropTypes.func.isRequired,
  guardarConsultar: PropTypes.func.isRequired,
};

export default Formulario;
