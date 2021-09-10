import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Edad from "./components/Edad";
import Error from "./components/Error";

function App() {
  //state principal
  const [busqueda, guardarBusqueda] = useState({
    nombre: "",
    pais: "",
  });

  const [consultar, guardarConsultar] = useState(false);

  //state para guadar el resultado de la consulta a la API
  const [resultado, guardarResultado] = useState({});

  //state para manejar el error
  const [error, guardarError] = useState(false);

  //extraemos nombre y pais del state
  const { nombre, pais } = busqueda;

  //useEffect que evalua si el state principal cambia
  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const url = `https://api.agify.io?name=${nombre}&country_id=${pais}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        console.log(resultado);

        guardarResultado(resultado);

        /*regresamos el state consultar a false para que permitarealizar otra consulta dinamicamente sin recargar la app*/
        guardarConsultar(false);

        //detecta si hubo resultados correctos en la consulta
        if (resultado.count === 0) {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };

    consultarAPI();
  }, [consultar]);

  let componente;
  if (error) {
    componente = (
      <Error mensaje="Sin resultados,verifica los datos ingresados" />
    );
  } else {
    componente = <Edad resultado={resultado} />;
  }

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
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
