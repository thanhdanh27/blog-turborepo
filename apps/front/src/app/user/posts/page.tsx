import NoPost from "@/app/user/posts/_components/NoPost";
import PostList from "@/app/user/posts/_components/PostList";
import { fetchUserPosts } from "@/lib/actions/postAction";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function UserPostPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const { totalPosts, posts } = await fetchUserPosts({
    page: page ? +page : 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  return (
    <div>
      {!posts || !posts.length ? (
        <NoPost />
      ) : (
        <PostList
          posts={posts}
          currentPage={page ? +page : 1}
          totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
        />
      )}
    </div>
  );
}
