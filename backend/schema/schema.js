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

const postsData = [
  {
    id: "pID-1",
    title: "post Title 1",
    body: "this is the body",
    userID: "123",
  },
  {
    id: "pID-4",
    title: "post Title 4",
    body: "this is the body",
    userID: "123",
  },
  {
    id: "pID-5",
    title: "post Title 5",
    body: "this is the body",
    userID: "123",
  },
  {
    id: "pID-2",
    title: "post Title 2",
    body: "this is the body",
    userID: "456",
  },
  {
    id: "pID-3",
    title: "post Title 3",
    body: "this is the body",
    userID: "789",
  },
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
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
    posts: {
      type: GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postsData, {
          userID: parent.id,
        });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post Type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userID });
      },
    },
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
        return _.find(postsData, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
