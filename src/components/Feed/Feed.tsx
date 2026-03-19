import CardPost from "../CardPost/CardPost";
import CardPublication from "../CardPublication/CardPublication";
import { usePosts } from "../../hooks/usePosts";
import type { PostType } from "../../types/posts";
import { useSearchParams } from "react-router-dom";

function Feed() {

  const [searchParams] = useSearchParams();
  const searchUrl = searchParams.get("search") || undefined;

  const { 
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
   } = usePosts(searchUrl);

   const allPosts = data?.pages.flatMap((pagina) => pagina.posts) || [];

  return(
    <main className="flex-1 overflow-y-auto scrollbar-hide py-9 mx-auto w-full max-w-2xl flex flex-col gap-8">
      <CardPublication />
      {isLoading ? (
        <p className="text-center font-bold">Carregando feed...</p>
      ) : (
        <>
          {allPosts.map((post: PostType) => (
            <CardPost key={post.id} data={post} />
          ))}

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="mx-auto mt-4 px-6 py-2 bg-textPrimary text-white rounded-full font-bold hover:opacity-90 disabled:opacity-50"
            >
              {isFetchingNextPage ? "Carregando..." : "Mostrar mais posts"}
            </button>
          )}

          {!hasNextPage && allPosts.length > 0 && (
            <p className="text-center">
              Você já viu todos os posts!
            </p>
          )}
        </>
      )}
    </main>
  );
}

export default Feed;