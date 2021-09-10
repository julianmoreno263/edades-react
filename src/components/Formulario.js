import React, { useState } from "react";

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
      {error ? (
        <p className="red darken-4 error">Todos los campos son obligatorios</p>
      ) : null}
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
        <label htmlFor="País">País: </label>
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

export default Formulario;
