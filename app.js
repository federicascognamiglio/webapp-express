const express = require("express");
const moviesRouter = require("./routers/moviesRouter");

// Express App
const app = express();
const port = process.env.SERVER_PORT;

// Make Public folder accessible
app.use(express.static("public"));

// Router Groups
app.use("/movies", moviesRouter);

// Server listening
app.listen(port, () => console.log(`App is listening on port ${port}`))