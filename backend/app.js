const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const schema = require("./schema/schema");

const app = express();

mongoose.connect(
  `mongodb+srv://stanley:${process.env.DB_PW}@cluster0.llbrq.mongodb.net/node-react-yipyap?retryWrites=true&w=majority`
);

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP.graphqlHTTP({ graphiql: true, schema: schema })
);

app.listen(4000, () => {
  console.log("listening on post 4000");
});
