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
      // all posts by user
      type: GraphQLList(PostType),
      resolve(parent, args) {
        console.log(parent.id, args);
        return Post.find({ creator: parent.id });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post Type",
  fields: () => ({
    id: { type: GraphQLID }, // post id
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    image: { type: GraphQLString },
    creator: { type: GraphQLID }, // creator id
    username: { type: GraphQLString },
    user: {
      // user to query
      type: UserType,
      resolve(parent, args) {
        console.log(parent.creator, args);
        return User.findById(parent.creator);
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
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Post.findById(args.id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find();
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

        return user;
      },
    },
    createPost: {
      type: PostType,
      args: {
        // id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        image: { type: GraphQLString },
        creator: { type: GraphQLID },
        username: { type: GraphQLString },
      },
      resolve(parent, args) {
        let post = new Post({
          // id: args.id,
          title: args.title,
          content: args.content,
          image: args.image,
          creator: args.creator,
          username: args.username,
        });
        post.save();

        return post;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
