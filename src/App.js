import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";

function App() {
  //state principal
  const [busqueda, guardarBusqueda] = useState({
    nombre: "",
    pais: "",
  });

  const [consultar, guardarConsultar] = useState(false);

  //state para guadar el resultado de la consulta a la API
  const [resultado, guardarResultado] = useState({});

  //extraemos nombre y pais del state
  const { nombre, pais } = busqueda;

  //useEffect que evalua si el state principal cambia
  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const url = `https://api.agify.io?name=${nombre}&country_id=${pais}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
      }
    };

    consultarAPI();
  }, [consultar]);

  return (
    <Fragment>
      <Header titulo="Edades React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">2</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
