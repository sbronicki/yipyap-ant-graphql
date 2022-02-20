const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const schema = require("./schema/schema");

const app = express();

mongoose
  .connect(
    `mongodb+srv://stanley:${process.env.DB_PW}@cluster0.llbrq.mongodb.net/node-react-yipyap?retryWrites=true&w=majority`
  )
  .catch(() => {
    console.log("Connnection failed...");
  });

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP.graphqlHTTP({ graphiql: true, schema: schema })
);

app.listen(4000, () => {
  console.log("listening on port 4000");
});

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var graphql = JSON.stringify({
//   query:
//     "{\r\n  User {\r\n    Comment\r\n    author {\r\n      name\r\n    }\r\n  }\r\n}",
//   variables: {},
// });
// var requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   body: graphql,
//   redirect: "follow",
// };

// fetch("http://localhost:4000/graphql", requestOptions)
//   // .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));
