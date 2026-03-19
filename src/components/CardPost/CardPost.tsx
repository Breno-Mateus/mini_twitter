import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import type { PostType } from "../../types/posts";
import { useLikePost } from "../../hooks/useLikePost";

type CardPostData = PostType & {
  likedByMe?: boolean;
};

interface CardPostProps {
  data: CardPostData;
}

function CardPost({ data }: CardPostProps) {
  const date = new Date(data.createdAt).toLocaleDateString("pt-BR");
  const username = data.authorName.toLowerCase().replace(/\s+/g, "");

  const { isLiked, likesCount, handleLikeClick } = useLikePost({
    postId: data.id,
    initialLikesCount: data.likesCount || 0,
  });

  return (
    <div className="border border-borderPrimary rounded-lg p-4 flex flex-col gap-3 bg-white">      
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <p className="font-bold text-base text-black">{data.authorName}</p>
        <p>@{username}</p>
        <p>{date}</p>
      </div>

      <div>
        <p className="font-bold text-lg text-black">{data.title}</p>
        <p className="text-base whitespace-pre-wrap">{data.content}</p>
      </div>

      {data.image && (
        <div>
          <img 
            src={data.image}
            alt={`Imagem do post ${data.title}`}
            className="rounded-lg w-full" 
          />
        </div>
      )}

      <div className="mt-2">
        <button 
          onClick={handleLikeClick}
          className="flex items-center gap-2 group transition-all"
        >
          <div className={`p-2 rounded-full transition-colors hover:cursor-pointer
            ${isLiked ? 'text-red-500 bg-red-50' : 'text-secundary group-hover:bg-gray-100 group-hover:text-red-400'}`}
          >
            {isLiked ? <FaHeart/> : <CiHeart/>}
          </div>
          
          <span className={`text-sm font-medium ${isLiked ? 'text-red-500' : 'text-secundary group-hover:text-red-400'}`}>
            {likesCount}
          </span>
        </button>
      </div>
    </div>
  );
}

export default CardPost;