import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Principal.css";
import useLocalStorage from "../../Hooks/useLocalStorage";


const Principal = () => {
  const [pods, setPodcast] = useLocalStorage("pods", "");
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
        setPodcastTemp(podcast); //Inicializamos los podcast que se van a pintar
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
      <div className="head">
     
         <button className="contador"> {Object.keys(podsTemp).length} </button>
      <input className="filtro" type="text" onChange={handleChange} placeholder="Filter podcast" />
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
