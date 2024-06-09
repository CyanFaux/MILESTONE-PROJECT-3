import React, { useState, useEffect } from "react";
import { Request as fetchData } from "../Request";

function Main() {
    const [movieData, setMovieData] = useState(null)

    useEffect(() => {
        fetchData('Jurassic Park').then(data => {
            setMovieData(data)
        })
    }, [])

    return (
        <div>
            <h1>Welcome to MovieMind</h1>
            <h2>Example Data</h2>
            <p>{movieData}</p>
        </div>
    )
}