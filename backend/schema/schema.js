const graphql = require("graphql");
const _ = require("lodash");

const usersData = [
  {
    id: "123",
    name: "stanley",
    email: "stanley@mbshighway.com",
    password: "password1",
  },
  {
    id: "456",
    name: "andrew",
    email: "andrew@mbshighway.com",
    password: "password1",
  },
  {
    id: "789",
    name: "brady",
    email: "brady@mbshighway.com",
    password: "password1",
  },
];

const postData = [
  {
    id: "pID-1",
    title: "post Title 1",
    body: "this is the body",
    author: "author",
  },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

// types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "User Type",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post Type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: { type: GraphQLString },
  }),
});

// root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return _.find(usersData, { id: args.id });
      },
    },
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(postData, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
