import Post from "./Post";

const Posts = ({ postList }) => {
  return postList.map((post) => <Post postData={post} />);
};

export default Posts;
