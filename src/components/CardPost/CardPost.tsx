import { CiHeart } from "react-icons/ci";
import type { PostType } from "../../types/posts";

interface CardPostProps {
  data: PostType;
}

function CardPost({ data }: CardPostProps) {
  const date = new Date(data.createdAt).toLocaleDateString("pt-BR");
  const username = data.authorName.toLowerCase().replace(/\s+/g, "");

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
        <button className="hover:cursor-pointer flex items-center gap-1 group">
          <CiHeart className="text-gray-500 group-hover:text-red-500 text-2xl transition-colors"/>
          <span className="text-sm text-gray-500 group-hover:text-red-500 transition-colors">
            {data.likesCount}
          </span>
        </button>
      </div>
    </div>
  );
}

export default CardPost;