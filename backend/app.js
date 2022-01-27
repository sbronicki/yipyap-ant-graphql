const express = require("express");
const graphqlHTTP = require("express-graphql");
require("dotenv").config();

const mongoose = require("mongoose");

const pw = process.env.DB_PW;

mongoose.connect(
  `mongodb+srv://stanley:${process.env.DB_PW}@cluster0.llbrq.mongodb.net/node-react-yipyap?retryWrites=true&w=majority`
);
mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

const schema = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP.graphqlHTTP({ graphiql: true, schema: schema })
);

app.listen(4000, () => {
  console.log("listening on post 4000");
});
