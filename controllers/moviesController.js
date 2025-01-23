const connection = require("../data/movies_db");

// Index
const index = (req, res) => {
    const sql = "SELECT * FROM `movies`"
    connection.query(sql, (err, movies) => {
        if (err) return res.status(500).json({ status: "fail", error: err.message })
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
        if (err) return res.status(500).json({ status: "fail", error: err.message });
        if (movieArray.length === 0) {
            return res.status(404).json({ error: "Movie not found" })
        } else {
            connection.query(sqlReviews, [id], (err, reviews) => {
                if (err) return res.status(500).json({ status: "fail", error: err.message });
                res.status(200).json({
                    status: "success",
                    data: [{...movieArray[0], reviews}]
                })
            })
        }
    })
}

module.exports = {
    index,
    show
}