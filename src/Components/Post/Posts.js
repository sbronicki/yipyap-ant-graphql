import Post from "./Post";

const Posts = ({ postList }) => {
  return postList.map((post, i) => (
    <Post
      postData={post}
      className={
        i === 0
          ? "first-post"
          : i === postList.length - 1
          ? "last-post"
          : "post"
      }
    />
  ));
};

export default Posts;
