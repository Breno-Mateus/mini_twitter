import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FiEdit2, FiTrash2, FiX, FiCheck } from "react-icons/fi";
import type { PostType } from "../../types/posts";
import { useLikePost } from "../../hooks/useLikePost";
import { useEditPost } from "../../hooks/useEditPost";
import { useAuthStore } from "../../store/authStore";
import { useDeletePost } from "../../hooks/useDeletePost";

interface CardPostProps {
  data: PostType;
}

function CardPost({ data }: CardPostProps) {
  const date = new Date(data.createdAt).toLocaleDateString("pt-BR");
  const username = data.authorName.toLowerCase().replace(/\s+/g, "");
  
  const user = useAuthStore((state) => state.user);
  const isMyPost = user?.id ? String(user.id) === String(data.authorId) : false;

  const { isLiked, likesCount, handleLikeClick } = useLikePost({
    postId: data.id,
    initialLikesCount: data.likesCount || 0,
  });

  const {
    isEditing, startEditing, cancelEditing,
    register, handleSubmit, errors, imageUrl, isPending
  } = useEditPost(data.id, { 
    title: data.title, 
    content: data.content, 
    image: data.image || ""
  });

  const deleteMutation = useDeletePost(data.id);

  function handleDeleteClick() {
    if (window.confirm("Tem certeza que deseja excluir este post permanentemente?")) {
      deleteMutation.mutate();
    }
  }

  return (
    <div className="border border-borderPrimary rounded-lg p-4 flex flex-col gap-3 bg-white">      
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-base">
          
          <div className="flex flex-col gap-1">
            <input 
              {...register("title")}
              placeholder="Título do post"
              className={`font-bold border-b pb-1 focus:outline-none placeholder:font-normal ${errors.title ? "border-red-500" : "border-borderPrimary"}`}
            />
            {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <textarea 
              {...register("content")}
              placeholder="Conteúdo"
              rows={3}
              className={`w-full resize-none border p-2 text-base rounded focus:outline-none ${errors.content ? "border-red-500" : "border-borderPrimary"}`}
            />
            {errors.content && <span className="text-red-500 text-xs">{errors.content.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <input 
              {...register("image")}
              placeholder="URL da nova imagem (opcional)"
              className={`w-full text-sm border p-2 rounded focus:outline-none ${errors.image ? "border-red-500" : "border-borderPrimary"}`}
            />
            {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}
            
            {imageUrl?.trim() && !errors.image && (
              <img 
                src={imageUrl} 
                alt="Preview da edição" 
                className="mt-2 rounded-lg w-full max-h-60 object-cover border border-borderPrimary opacity-80"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            )}
          </div>

          <div className="flex justify-end gap-3 mt-1 text-base">
            <button 
              type="button" 
              onClick={cancelEditing}
              className="flex items-center gap-1 text-sm font-medium bg-borderPrimary px-4 py-1.5 rounded-full hover:opacity-80 transition-opacity disabled:opacity-50 hover:cursor-pointer"
            >
              <FiX /> Cancelar
            </button>
            <button 
              type="submit"
              disabled={isPending}
              className="flex items-center gap-1 text-sm font-bold bg-textPrimary text-white px-4 py-1.5 rounded-full hover:opacity-80 transition-opacity disabled:opacity-50 hover:cursor-pointer"
            >
              <FiCheck /> {isPending ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>

      ) : (
        <>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <p className="font-bold text-base text-black">{data.authorName}</p>
              <p>@{username}</p>
              <p>• {date}</p>
            </div>

            {isMyPost && (
              <div className="flex gap-3 text-base">
                <button 
                  onClick={startEditing} 
                  className="hover:text-blue-500 transition-colors hover:cursor-pointer" 
                  title="Editar Post"
                >
                  <FiEdit2 />
                </button>
                <button 
                  onClick={handleDeleteClick}
                  className="hover:text-red-500 transition-colors hover:cursor-pointer" 
                  title="Excluir Post"
                >
                  <FiTrash2 />
                </button>
              </div>
            )}
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
              <div className={`p-2 rounded-full text-xl transition-colors hover:cursor-pointer
                ${isLiked ? 'text-red-500 bg-red-50' : 'group-hover:bg-gray-100 group-hover:text-red-400'}`}
              >
                {isLiked ? <FaHeart/> : <CiHeart />}
              </div>
              
              <span className={`text-sm font-medium ${isLiked ? 'text-red-500' : 'group-hover:text-red-400'}`}>
                {likesCount}
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CardPost;