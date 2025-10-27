import { useQuery } from "@tanstack/react-query";

async function fetchUserPosts(userId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}

function UserPosts({ userId }) {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchUserPosts(userId),
  });

  if (isLoading) return <div className="loading-text">Loading posts...</div>;
  if (error) return <div className="error-text">Error loading posts</div>;

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-body">{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;
