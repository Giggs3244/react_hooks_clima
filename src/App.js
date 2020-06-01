import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, setConsultar] = useState(false);
  const [error, setError] = useState(false);
  const [resultado, setResultado] = useState({});
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = "f99bbd9e4959b513e9bd0d7f7356b38d";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        setConsultar(false);
        setError(false);
        if (resultado.cod === "404") {
          setError(true);
        }
      }
    };
    consultarAPI();
  }, [ciudad, consultar, pais]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado}></Clima>;
  }

  return (
    <>
      <Header titulo="Clima React App"></Header>

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              ></Formulario>
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
