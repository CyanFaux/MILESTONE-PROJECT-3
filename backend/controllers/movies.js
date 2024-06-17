const router = require("express").Router();
const db = require("../models");

const { Movie, Review } = db;

router.get("/", async (req, res) => {
  const movies = await Movie.findAll();
  console.log(res.json(movies));
});

router.get("/:imdbID", async (req, res) => {
  let imdbID = Number(req.params.imdbID);
  if (isNaN(imdbID)) {
    res.status(404).json({ message: `Invalid id "${imdbID}"` });
  } else {
    const movie = await Movies.findOne({
      where: { imdbID: imdbID },
      include: {
        association: "reviews",
        include: "author",
      },
    });
    if (!movie) {
      res
        .status(404)
        .json({ message: `Could not find movie with id "${imdbID}"` });
    } else {
      res.json(movie);
    }
  }
});

router.post("/:imdbID/reviews", async (req, res) => {
  const imdbID = Number(req.params.imdbID);

  req.body.rant = req.body.rant ? true : false;

  const movie = await Movie.findOne({
    where: { imdbID: imdbID },
  });

  if (!movie) {
    return res
      .status(404)
      .json({ message: `Could not find movie with id "${imdbID}"` });
  }

  if (!req.currentUser) {
    return res
      .status(404)
      .json({ message: `You must be logged in to leave a review.` });
  }

  const review = await Review.create({
    ...req.body,
    authorId: req.currentUser.userId,
    imdbID: imdbID,
  });

  res.send({
    ...review.toJSON(),
    author: req.currentUser,
  });
});

router.delete("/:imdbID/reviews/:reviewId", async (req, res) => {
  let imdbID = Number(req.params.imdbID);
  let reviewId = Number(req.params.reviewId);

  if (isNaN(imdbID)) {
    res.status(404).json({ message: `Invalid id "${imdbID}"` });
  } else if (isNaN(reviewId)) {
    res.status(404).json({ message: `Invalid id "${reviewId}"` });
  } else {
    const review = await Review.findOne({
      where: { reviewId: reviewId, imdbID: imdbID },
    });
    if (!review) {
      res
        .status(404)
        .json({
          message: `Could not find review with id "${reviewId}" for movie with id "${imdbId}"`,
        });
    } else if (review.authorId !== req.currentUser?.userId) {
      res
        .status(403)
        .json({
          message: `You do not have permission to delete reviews "${review.reviewId}"`,
        });
    } else {
      await review.destroy();
      res.json(review);
    }
  }
});

module.exports = router;
