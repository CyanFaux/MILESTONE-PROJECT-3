import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { createResource } from "../Request";

function Display() {
  const { imdbID } = useParams();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    if (imdbID) {
      const resource = createResource(imdbID);
      setResource(resource);
    }
  }, [imdbID]);

  const renderMovie = () => {
    if (resource) {
      try {
        const data = resource.result.read();
        return (
          <div>
            <img src={data.Poster} alt="Movie Poster" />
            <h2>{data.Title}</h2>
            <h4>{data.Year}</h4>
            <h4>{data.Rated}</h4>
            <h3>IMDB Rating: {data.imdbRating}</h3>
          </div>
        );
      } catch (error) {
        if (error instanceof Promise) {
          return <Loading />;
        }
        throw error;
      }
    }
    return <Loading />;
  };

  return <div>{renderMovie()}</div>;
}

export default Display;
