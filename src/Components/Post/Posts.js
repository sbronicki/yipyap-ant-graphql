import Post from "./Post";

const Posts = ({ postList, noDataMsg, deleteCB }) => {
  if (postList.length === 0) {
    return <h1>{noDataMsg || "No posts data!"}</h1>;
  }

  return postList
    .slice(0)
    .reverse()
    .map((post, i) => (
      <Post
        key={i}
        postData={post}
        deleteCB={deleteCB}
        className={`post ${
          i === 0 ? "first-post" : i === postList.length - 1 ? "last-post" : ""
        }`}
      />
    ));
};

export default Posts;
