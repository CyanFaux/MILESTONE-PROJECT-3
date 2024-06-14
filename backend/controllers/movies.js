const router = require('express').Router()
const db = require("../models")

const { Movie, Review, User } = db

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


router.get('/'), async (req, res) => {
    return `Search for a movie!`
}


router.get('/:imbdId', async (req, res) => {
    
})

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

router.post('/:imbdId/reviews', async (req, res) => {
    const movieId = Number(req.params.movieId)

    req.body.rant = req.body.rant ? true : false

    const movie = await Movie.findOne({
        where: { movieId: movieId }
    })

    if (!movie) {
        return res.status(404).json({ message: `Could not find movie with id "${movieId}"` })
    }

    if (!req.currentUser) {
        return res.status(404).json({ message: `You must be logged in to leave a review.` })
    }

    const review = await Review.create({
        ...req.body,
        authorId: req.currentUser.userId,
        movieId: movieId
    })

    res.send({
        ...review.toJSON(),
        author: req.currentUser
    })
})

router.delete('/:imbdId/reviews/:reviewId', async (req, res) => {
    let movieId = Number(req.params.movieId)
    let reviewId = Number(req.params.reviewId)

    if (isNaN(movieId)) {
        res.status(404).json({ message: `Invalid id "${movieId}"` })
    } else if (isNaN(reviewId)) {
        res.status(404).json({ message: `Invalid id "${reviewId}"` })
    } else {
        const review = await Review.findOne({
            where: { reviewId: reviewId, movieId: movieId }
        })
        if (!review) {
            res.status(404).json({ message: `Could not find review with id "${reviewId}" for place with id "${placeId}"` })
        } else if(review.authorId !== req.currentUser?.userId){
            res.status(403).json({ message: `You do not have permission to delete reviews "${review.reviewId}"`})
        }else {
            await review.destroy()
            res.json(review)
        }
    }
})


module.exports = router