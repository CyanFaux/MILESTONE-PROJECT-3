import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../Loading";
import { createResource } from "../Request";
import Image from "react-bootstrap/Image"

function Display() {
  const { imdbID } = useParams();

  const location = useLocation()
  const data = location.state?.movieData

  if(!data) {
    return <Loading />
  }

  if (data.imdbID !== imdbID) {
    return `Invalid ID`
  }

  return (
    <div>
      <Image src={data.Poster} alt="Movie Poster" rounded/>
      <h2>{data.Title}</h2>
      <h4>{data.Year}</h4>
      <h4>{data.Rating}</h4>
      <h3>IMDB Rating: {data.imdbRating}</h3>
    </div>
  )
}

export default Display;
