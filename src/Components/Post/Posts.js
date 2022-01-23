import Post from "./Post";

const Posts = ({ postList }) => {
  return postList.map((post, i) => (
    <Post
      postData={post}
      className={`post ${
        i === 0 ? "first-post" : i === postList.length - 1 ? "last-post" : ""
      }`}
    />
  ));
};

export default Posts;
