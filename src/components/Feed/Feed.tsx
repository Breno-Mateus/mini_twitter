import CardPost from "../CardPost/CardPost";
import CardPublication from "../CardPublication/CardPublication";
import { usePosts } from "../../hooks/usePosts";
import type { PostType } from "../../types/posts";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useThemeStore } from "../../store/themeStore";

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

  const { theme, toggleTheme, initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return(
    <>
      <main className="flex-1 overflow-y-auto scrollbar-hide py-4 md:py-9 px-4 md:px-0 mx-auto w-full max-w-2xl flex flex-col gap-6 md:gap-8 relative">
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
                 className="mx-auto mt-4 px-6 py-2 bg-textPrimary text-white rounded-full font-bold hover:opacity-90 disabled:opacity-50 hover:cursor-pointer"
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

      <button
        onClick={toggleTheme}
        className="fixed bottom-16 right-6 md:bottom-20 md:right-10 p-4 bg-textPrimary text-white rounded-full shadow-lg hover:opacity-90 hover:cursor-pointer transition-transform hover:scale-105 z-50 flex items-center justify-center"
        title={theme === 'light' ? 'Mudar para Modo Escuro' : 'Mudar para Modo Claro'}
      >
        {theme === 'light' ? <FiMoon className="text-2xl" /> : <FiSun className="text-2xl" />}
      </button>
    </>
  );
}

export default Feed;