import { useEffect, useState } from "react";
import "./Principal.css";

const Principal = () => {
  const [pods, setPodcast] = useState([]);
  const [podsTemp, setPodcastTemp] = useState([]);
  

  useEffect(() => {
    const Podcast = async () => {
      const res = await fetch(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      if (res.ok) {
        const body = await res.json();
        const podcast = body.feed.entry;
        setPodcast(podcast); //Inicializamos todos los podcats, sobre los que filtraremos
        setPodcastTemp(podcast); //Inicializamos los podcast que se van apintar
      } else console.error("error");
    };

    Podcast();
  },[setPodcastTemp]);


 // Funcion para filtrar Podcast
              
    const filterPodcast = (filtro) => {
      return pods.filter(
        (pod) => pod["im:name"].label.toLowerCase().includes(filtro) || pod["im:artist"].label.toLowerCase().includes(filtro));
    };
       
  //Funcion manejadora del fitro de podcast

  const handleChange = (event) => {
    setPodcastTemp(filterPodcast(event.target.value.toLowerCase()));
  };


  return (
    <div className="container">
      <h1 className="podcaster">Podcaster</h1>
      <input type="text" onChange={handleChange} placeholder="Filter podcast" />
      <div className="podcast">
        {podsTemp.map((pod) => {
          const id = pod.id.attributes["im:id"];
          const tittle = pod["im:name"].label;
          const author = pod["im:artist"].label;

          return (
            <article key={id} id={id} className="ResultPodcast">
              <a title={tittle} href="https://itunes.apple.com/lookup?id={id}">
                <img
                  className="foto"
                  src={pod["im:image"][2].label}
                  alt={tittle}
                />
              </a>

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
