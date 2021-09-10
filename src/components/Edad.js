import React from "react";

const Edad = ({ resultado }) => {
  //extraemos los valores de la respuesta de la consulta
  const { name, age, country_id } = resultado;
  if (!name) return null;
  return (
    <div className="card-panel white col s12">
      <div className="black-text">
        <h2>La edad de {name} es: </h2>
        <p className="edad">{age} años</p>
        <h2>y está localizado/a en</h2>
        <p className="edad"> {country_id}</p>
      </div>
    </div>
  );
};

export default Edad;
