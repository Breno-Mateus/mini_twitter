import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useCreatePost } from "../../hooks/useCreatePost";

function CardPublication() {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    errors,
    imageUrl,
    isPending
  } = useCreatePost();

  function onSubmitForm(e?: React.BaseSyntheticEvent) {
    if (!token) {
      alert("Você precisa estar logado para postar.");
      navigate("/login", { state: { tab: 'login' } });
      return;
    }
    if (e) handleSubmit(e);
  }

  return (
    <form 
      onSubmit={onSubmitForm} 
      className="border border-borderPrimary rounded-lg shadow-lg p-3 md:p-4 flex flex-col gap-4 bg-white dark:bg-darkSecudary dark:border-darkBorder"
    >      
      <div className="flex flex-col gap-1 border-b border-borderPrimary dark:border-darkBorder pb-2">
        <input 
          type="text"
          placeholder="Título do seu post"
          {...register("title")}
          className={`w-full text-base md:text-lg font-bold focus:outline-none placeholder:text-secundary 
            ${errors.title ? "border-red-500" : ""}`}
        />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
      </div>

      <div className="flex flex-col gap-1 border-b border-borderPrimary dark:border-darkBorder pb-2 mt-2">
        <textarea 
          placeholder="E aí, o que tá rolando?"
          {...register("content")}
          className={`w-full resize-none focus:outline-none focus:ring-0 placeholder:text-secundary
            ${errors.content ? "border-red-500" : ""}`}
          rows={3}
        />
        {errors.content && <span className="text-red-500 text-xs">{errors.content.message}</span>}
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <input 
          type="text"
          placeholder="Cole a URL da imagem (opcional, ex: http://.../foto.jpg)"
          {...register("image")}
          className={`w-full text-sm border p-2 rounded focus:outline-none placeholder:text-secundary
            ${errors.image ? "border-red-500" : "border-borderPrimary dark:border-darkBorder"}`}
        />
        {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}

        {imageUrl?.trim() && !errors.image && (
          <div className="relative mt-2">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="w-full rounded-lg max-h-40 object-cover border border-borderPrimary dark:border-darkBorder"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end items-center mt-2">
        <button 
          type="submit"
          className="bg-textPrimary rounded-3xl border border-borderPrimary dark:border-none py-2 px-6 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:opacity-90 disabled:opacity-50 hover:cursor-pointer"
          disabled={isPending} 
        >
          {isPending ? "Postando..." : "Postar"}
        </button>
      </div>
    </form>
  );
}

export default CardPublication;