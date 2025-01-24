const notFoundRoute = (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "Route not found"
    })
}

module.exports = notFoundRoute;