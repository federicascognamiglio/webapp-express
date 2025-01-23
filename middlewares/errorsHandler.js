const errorsHandler = (err, req, res, next) => {
    const resObj = {
        status: "fail",
        message: "Internal Server error",
        error: err.message
    }
    if(process.env.ENVIRONMENT = "development") {
        resObj.details = err.stack;
    }

    return res.status(500).json(resObj);
}

module.exports = errorsHandler;