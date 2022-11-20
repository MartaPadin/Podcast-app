import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Principal.css";

const Principal = () => {
  const [pods, setPodcast] = useState([]);
  const [podsTemp, setPodcastTemp] = useState([]);

  useEffect(() => {
    //Función que pide los podcast a al Api
    const GetPodcast = async () => {
      const res = await fetch(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      if (res.ok) {
        const body = await res.json();
        return body.feed.entry;
      }
    };

    //Borramos el localStorage al pasar un dia y actualizamos
    const ActualizarCliente = async () => {
      let fecha = localStorage.getItem("fechaPodcast");

      if (fecha == null) {
        fecha = new Date();
        localStorage.setItem("fechaPodcast", fecha);
        const pod = await GetPodcast();
        localStorage.setItem("pods", JSON.stringify(pod));
        setPodcast(pod); //Inicializamos todos los podcats, sobre los que filtraremos
        setPodcastTemp(pod); //Inicializamos los podcast que se van a pintar

        return pod;
      } else {
        if (fecha - new Date() > 24 * 60 * 60 * 1000) {
          localStorage.removeItem("pods");
          const pod = GetPodcast();
          localStorage.setItem("pods", JSON.stringify(pod));
          return pod;
        }
      }
    };

    const Podcast = async () => {
      ActualizarCliente();
      let podcast = JSON.parse(localStorage.getItem("pods"));
      if (podcast == null) {
        podcast = await GetPodcast();
      }

      setPodcast(podcast); //Inicializamos todos los podcats, sobre los que filtraremos
      setPodcastTemp(podcast); //Inicializamos los podcast que se van a pintar
    };
    Podcast();
  }, [setPodcastTemp]);

  // Funcion para filtrar Podcast
  const filterPodcast = (filtro) => {
    return pods.filter(
      (pod) =>
        pod["im:name"].label.toLowerCase().includes(filtro) ||
        pod["im:artist"].label.toLowerCase().includes(filtro)
    );
  };

  //Funcion manejadora del fitro de podcast
  const handleChange = (event) => {
    setPodcastTemp(filterPodcast(event.target.value.toLowerCase()));
  };

  return (
    <div className="container">
      <div className="head">
        <button className="contador"> {Object.keys(podsTemp).length} </button>
        <input
          className="filtro"
          type="text"
          onChange={handleChange}
          placeholder="Filter podcast"
        />
      </div>

      <div className="podcast">
        {podsTemp.map((pod) => {
          const id = pod.id.attributes["im:id"];
          const tittle = pod["im:name"].label;
          const author = pod["im:artist"].label;

          return (
            <article key={id} id={id} className="ResultPodcast">
              <Link to={`/podcast/${id}`}>
                <img
                  className="foto"
                  src={pod["im:image"][2].label}
                  alt={tittle}
                />
              </Link>

              <p className="titulo">{JSON.stringify(tittle)}</p>
              <p> Autor : {JSON.stringify(author)} </p>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Principal;
