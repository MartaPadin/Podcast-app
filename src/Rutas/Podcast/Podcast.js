import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Iframe from "react-iframe";

const Podcast = () => {
  const [track, setTracks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const UrlExterna = async () => {
      const res = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
      const body = await res.json();
      const trackview = body.results[0].trackViewUrl;
      setTracks(trackview);
      console.log(trackview);
    };
    UrlExterna();
  });

  //Función para acceder a recursos externos.

 /* const GrupoPodcast = async () => {
    await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(track)}`
    )
      .then((response) => {
        if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
      })
      .then((data) => console.log(data.contents));
  };
  GrupoPodcast();*/


  return <div>
    
    <a href={track} target='_blank' rel="noopener noreferrer"> {track} </a>

  </div>;
};

export default Podcast;
