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
    res.json({ message: "Show movie" })
}

module.exports = {
    index,
    show
}