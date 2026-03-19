import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function usePosts(search?: string) {
  return useInfiniteQuery({
    queryKey: ["posts", search],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await api.get("/posts", {
        params: {
          page: pageParam,
          ...(search && { search })
        }
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.limit);      
      const nextPage = lastPage.page + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },    
  });
}