import { useEffect, useState } from "react";
import "./Principal.css";

const Principal = () => {
  const [pods, setPodcast] = useState([]);

  const Podcast = async () => {
    const res = await fetch(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    );
    if (res.ok) {
      const body = await res.json();
      const podcast = body.feed.entry;
      setPodcast(podcast);
      console.log(podcast);
    }
  };
  useEffect(() => {
    Podcast();
  }, []);

  return (
    <div className="container">
      <h1 className="podcaster">Podcaster</h1>
      <div className="podcast">
        {pods.map((pods) => {
          const id = pods.id.attributes["im:id"];
          console.log(id);
          const tittle = pods["im:name"].label;
          const author = pods["im:artist"].label;

          console.log(author);

          return (
            <article key={id} id={id} className="ResultPodcast">
            <a title={tittle}  href='https://itunes.apple.com/lookup?id={id}'>
            <img
              className="foto"
              src={pods["im:image"][2].label}
              
              alt={tittle}
            />
            </a>
                    
            
              <p className="titulo">
                {JSON.stringify(tittle)}
                
              </p>
              <p > Autor : {JSON.stringify(author)} </p>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Principal;
