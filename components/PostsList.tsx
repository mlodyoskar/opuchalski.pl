import { PostType } from '../types/post';
import { PostCard } from './PostCard';

const PostsList = ({ posts }: { posts: PostType[] }) => {
  return (
    <div className="my-4 flex flex-col gap-6">
      {posts.map(({ title, description, slug }, i) => (
        <PostCard
          key={slug}
          title={title}
          description={description}
          slug={slug}
          iterator={i}
        />
      ))}
    </div>
  );
};

export { PostsList };
