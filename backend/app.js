const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
mongoose.connect(process.env.DBPATH);
mongoose.connection.once("open", () => {
    console.log("connected to database");
});

// bind express with graphql
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen(4000, () => {
    console.log("now listening for requests on port 4000");
});
