const connection = require("../data/movies_db");

// Index
const index = (req, res) => {
    res.json({message: "All movies"})
}

// Show
const show = (req, res) => {
    res.json({message: "Show movie"})
}

module.exports = {
    index,
    show
}