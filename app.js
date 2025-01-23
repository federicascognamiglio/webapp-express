const express = require("express");
const moviesRouter = require("./routers/moviesRouter");
const errorsHandler = require("./middlewares/errorsHandler");

// Express App
const app = express();
const port = process.env.SERVER_PORT;

// Make Public folder accessible
app.use(express.static("public"));

// Router Groups
app.use("/movies", moviesRouter);

// Error Handler
app.use(errorsHandler);

// Server listening
app.listen(port, () => console.log(`App is listening on port ${port}`))