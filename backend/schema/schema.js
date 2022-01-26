const graphql = require("graphql");
const _ = require("lodash");
const User = require("../models/user");
const Post = require("../models/post");

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
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    posts: {
      type: GraphQLList(PostType),
      resolve(parent, args) {
        // return _.filter(postsData, {
        //   userID: parent.id,
        // });
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
    content: { type: GraphQLString },
    image: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        // return _.find(usersData, { id: parent.userID });
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
        // return _.find(usersData, { id: args.id });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // return usersData;
      },
    },
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // return _.find(postsData, { id: args.id });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        // return postsData;
      },
    },
  },
});

// mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        // id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = new User({
          username: args.username,
          email: args.email,
          password: args.password,
        });
        user.save();
      },
    },
    createPost: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        userID: { type: GraphQLID },
      },
      resolve(parent, args) {
        let post = {
          // id: args.id,
          title: args.title,
          content: args.content,
          userID: args.userID,
        };
        return post;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
