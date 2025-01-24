const express = require("express");
// Routers
const moviesRouter = require("./routers/moviesRouter");
// Middlewares
const errorsHandler = require("./middlewares/errorsHandler");
const notFoundRoute = require("./middlewares/notFoundRoute");

// Express App
const app = express();
const port = process.env.SERVER_PORT;

// Make Public folder accessible
app.use(express.static("public"));

// Router Groups
app.use("/movies", moviesRouter);

// Error Handler
app.use(errorsHandler);

// NotFound Route Handler 
app.use(notFoundRoute)

// Server listening
app.listen(port, () => console.log(`App is listening on port ${port}`))