import React from "react";

function Display(props){

    return (
        <div>
            <img src={props.item.Poster} alt="Movie Poster" />
            <h2>{props.item.Title}</h2>
            <div>
                <h4>{props.item.Year}</h4>
                <h4>{props.item.Rated}</h4>
            </div>
        </div>
    )
}

export default Display