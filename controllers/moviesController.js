const connection = require("../data/movies_db");


// Index
const index = (req, res) => {
    // Query string params
    const filters = req.query;
    const params = [];
    // SQL
    let sql = "SELECT * FROM `movies`"
    if (filters.search) {
        sql += "WHERE `movies`.`title` LIKE ?"
        params.push(`%${filters.search}%`)
    }
    // Query
    connection.query(sql, [params], (err, movies) => {
        if (err) return next(new Error("Internal Server error"));
        res.status(200).json({
            status: "success",
            data: movies
        })
    })
}

// Show
const show = (req, res) => {
    const slug = req.params.slug;
    const sql = "SELECT * FROM `movies` WHERE `movies`.`slug` = ?"
    const sqlReviews = `
    SELECT reviews.*
    FROM reviews
    JOIN movies
    ON reviews.movie_id = movies.id
    WHERE movies.slug = ?
    `
    connection.query(sql, [slug], (err, movieArray) => {
        if (err) return next(new Error("Internal Server error"));
        if (movieArray.length === 0 || movieArray[0].id === null) {
            return res.status(404).json({ status: "fail", message: "Movie not found"})
        } else {
            connection.query(sqlReviews, [slug], (err, reviews) => {
                if (err) return next(new Error("Internal Server error"));
                res.status(200).json({
                    status: "success",
                    data: [{...movieArray[0], reviews}]
                })
            })
        }
    })
}

// Store review
const storeReview = (req, res, next) => {
    const movieId = req.params.id;
    const {name, vote, text} = req.body;

    // Validation
    // Check vote
    if (isNaN(vote) || vote < 0 || vote > 5) {
        return res.status(400).json({
            status: "fail",
            message: "Insert vote from 0 to 5"
        })
    }
    // Check name
    if (name.length <= 3) {
        return res.status(400).json({
            status: "fail",
            message: "Name should be at least 4 characters"
        })
    }
    // Check text
    if (text && text.length > 0 && text.length < 5) {
        return res.status(400).json({
            status: "fail",
            message: "Text should be at least 10 characters"
        })
    }

    // Check movie exists
    const movieSql = "SELECT * FROM `movies` WHERE id = ?"
    connection.query(movieSql, [movieId], (err, results) => {
        if(err) return next(new Error("Internal Server error"))
        if(results.length === 0) return res.status(404).json({ status: "fail", message: "Movie not found"})
    });

    // Store new review
    const sql = "INSERT INTO reviews(movie_id, name, vote, text) VALUES (?, ?, ?, ?)"
    connection.query(sql, [movieId, name, vote, text], (err, results) => {
        if(err) return next(new Error("Internal Server error"))
        res.status(201).json({status: "success", message: "Review added"})
    })
}

module.exports = {
    index,
    show,
    storeReview
}