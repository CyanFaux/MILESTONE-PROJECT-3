import React, { useState, useEffect } from "react";
import Display from "../components/Display";
import ReviewCard from "./ReviewCard";

function MovieIndex() {
  return (
    <div>
      <Display />
      <ReviewCard />
    </div>
  );
}

export default MovieIndex;
