const express = require("express");

const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const app = express();
const typeDefs = require("./typeDefs/Root");
const resolvers = require("./resolvers/Root");
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.yox7k.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });
