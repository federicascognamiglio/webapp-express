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
    const id = req.params.id;
    const sql = "SELECT * FROM `movies` WHERE `movies`.`id` = ?"
    const sqlReviews = `
    SELECT reviews.*
    FROM reviews
    JOIN movies
    ON reviews.movie_id = movies.id
    WHERE movies.id = ?
    `
    connection.query(sql, [id], (err, movieArray) => {
        if (err) return next(new Error("Internal Server error"));
        if (movieArray.length === 0) {
            return res.status(404).json({ status: "fail", message: "Movie not found", error: err.message})
        } else {
            connection.query(sqlReviews, [id], (err, reviews) => {
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

    // Check movie exists
    const movieSql = "SELECT * FROM `movies` WHERE id = ?"
    connection.query(movieSql, [movieId], (err, results) => {
        if(err) return next(new Error("Internal Server error"))
        if(results.length === 0) return res.status(404).json({ status: "fail", message: "Movie not found", error: err.message})
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