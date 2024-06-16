import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReviewCard from "./ReviewCard";
import NewReviewForm from "./NewReviewForm";

function MovieDetails() {
  const { imdbId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/movies/${imdbId}`
        );
        const resData = await response.json();
        setMovie(resData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
    fetchData();
  }, [imdbId]);

  if (!movie) {
    return <h1>Loading...</h1>;
  }

  async function deleteReview(deletedReview) {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/movies/${movie.movieId}/reviews/${deletedReview.reviewId}`,
      {
        method: "DELETE",
      }
    );

    setMovie({
      ...movie,
      reviews: movie.reviews.filter(
        (review) => review.reviewId !== deletedReview.reviewId
      ),
    });
  }

  async function createReview(reviewAttributes) {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/movies/${movie.movieId}/reviews`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewAttributes),
      }
    );

    const review = await response.json();
    setMovie({
      ...movie,
      reviews: [...movie.reviews, review],
    });
  }

  return (
    <main>
      <div className="row">
        <div className="col-sm-6">
          <img style={{ maxWidth: 200 }} src={movie.pic} alt={movie.name} />
        </div>
        <div className="col-sm-6">
          <h1>{movie.name}</h1>
          <br />
          <br />
          {/* Movie actions can be added here */}
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => deleteReview()}
          >
            Delete
          </button>
        </div>
      </div>
      <hr />
      <h2>Reviews</h2>
      <div className="row">
        {movie.reviews.map((review) => (
          <ReviewCard
            key={review.reviewId}
            review={review}
            onDelete={() => deleteReview(review)}
          />
        ))}
      </div>
      <hr />
      <NewReviewForm movie={movie} onSubmit={createReview} />
    </main>
  );
}

export default MovieDetails;
