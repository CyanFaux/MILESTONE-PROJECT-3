const router = require("express").Router();
const db = require("../models");

const { Movie, Review } = db;

/* router.post('/', async (req, res) => {
    if (!req.body.pic) {
        req.body.pic = 'http://placekitten.com/400/400'
    }
    if (!req.body.city) {
        req.body.city = 'Anytown'
    }
    if (!req.body.state) {
        req.body.state = 'USA'
    }
    if (req.currentUser?.role !== 'admin') {
        return res.status(403).json({ message: 'You are not allowed to create a place' })
    }
    const place = await Place.create(req.body)
    res.json(place)
}) */

router.get("/", async (req, res) => {
  const movies = await Movie.findAll();
  console.log(res.json(movies));
});

router.get("/:imdbId", async (req, res) => {
  let imdbId = Number(req.params.imdbId);
  if (isNaN(imdbId)) {
    res.status(404).json({ message: `Invalid id "${imdbId}"` });
  } else {
    const movie = await Movies.findOne({
      where: { imdbId: imdbId },
      include: {
        association: "reviews",
        include: "author",
      },
    });
    if (!movie) {
      res
        .status(404)
        .json({ message: `Could not find movie with id "${imdbId}"` });
    } else {
      res.json(movie);
    }
  }
});

/* router.put('/:imbdId', async (req, res) => {
    let movieId = Number(req.params.movieId)
    if (isNaN(movieId)) {
        res.status(404).json({ message: `Invalid id "${movieId}"` })
    } else {
        const movie = await Movie.findOne({
            where: { movieId: movieId },
        })
        if (!movie) {
            res.status(404).json({ message: `Could not find movie with id "${movieId}"` })
        } else {
            Object.assign(movie, req.body)
            await movie.save()
            res.json(movie)
        }
    }
    if (req.currentUser?.role !== 'admin') {
        return res.status(403).json({ message: 'You are not allowed to edit movies' })
    }
})

router.delete('/:imbdId', async (req, res) => {
    let movieId = Number(req.params.movieId)
    if (isNaN(movieId)) {
        res.status(404).json({ message: `Invalid id "${movieId}"` })
    } else {
        const movie = await Movie.findOne({
            where: {
                movieId: movieId
            }
        })
        if (!movie) {
            res.status(404).json({ message: `Could not find movie with id "${movieId}"` })
        } else {
            await movie.destroy()
            res.json(movie)
        }
    }
    if (req.currentUser?.role !== 'admin') {
        return res.status(403).json({ message: 'You are not allowed to delete movies' })
    }
}) */

router.post("/:imdbId/reviews", async (req, res) => {
  const imdbId = Number(req.params.imdbId);

  req.body.rant = req.body.rant ? true : false;

  const movie = await Movie.findOne({
    where: { imdbId: imdbId },
  });

  if (!movie) {
    return res
      .status(404)
      .json({ message: `Could not find movie with id "${imdbId}"` });
  }

  if (!req.currentUser) {
    return res
      .status(404)
      .json({ message: `You must be logged in to leave a review.` });
  }

  const review = await Review.create({
    ...req.body,
    authorId: req.currentUser.userId,
    imdbId: imdbId,
  });

  res.send({
    ...review.toJSON(),
    author: req.currentUser,
  });
});

router.delete("/:imdbId/reviews/:reviewId", async (req, res) => {
  let imdbId = Number(req.params.imdbId);
  let reviewId = Number(req.params.reviewId);

  if (isNaN(imdbId)) {
    res.status(404).json({ message: `Invalid id "${imdbId}"` });
  } else if (isNaN(reviewId)) {
    res.status(404).json({ message: `Invalid id "${reviewId}"` });
  } else {
    const review = await Review.findOne({
      where: { reviewId: reviewId, imdbId: imdbId },
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
