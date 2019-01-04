const express = require("express");
const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./schema/schema");

const app = express();

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect(
    "mongodb://bpliske:sdgPian0man@ds023664.mlab.com:23664/reservations"
);
mongoose.connection.once("open", () => {
    console.log("connected to database");
});

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs: schema, resolvers });

server.applyMidddleware({ app, path: "/graphql" });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql");
});
