import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useCreatePost } from "../../hooks/useCreatePost";

function CardPublication() {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  
  const {
    title, setTitle,
    content, setContent,
    imageImageUrl, setImageImageUrl,
    submitPost,
    isPending
  } = useCreatePost();

  function handleClickButtonPublication() {
    if (!token) {
      alert("Você precisa estar logado para postar.");
      navigate("/login", { state: { tab: 'login' } });
      return;
    }
    submitPost();
  }

  return (
    <div className="border border-borderPrimary rounded-lg shadow-lg p-4 flex flex-col gap-4 bg-white">
      
      <input 
        type="text"
        placeholder="Título do seu post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-sm font-bold focus:outline-none placeholder:text-secundary border-b border-borderPrimary pb-2"
        maxLength={50}
      />

      <div className="border-b border-borderPrimary">
        <textarea 
          placeholder="E aí, o que tá rolando?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full text-sm resize-none focus:outline-none focus:ring-0 placeholder:text-secundary mt-2"
          rows={3}
          maxLength={280}
        />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <input 
          type="text"
          placeholder="Cole a URL da imagem (opcional, ex: http://.../foto.jpg)"
          value={imageImageUrl}
          onChange={(e) => setImageImageUrl(e.target.value)}
          className="w-full text-sm border-b border-borderPrimary p-2 rounded focus:outline-none placeholder:text-secundary"
        />

        {imageImageUrl.trim() && (
          <div className="relative">
            <img 
              src={imageImageUrl} 
              alt="Preview" 
              className="rounded-lg max-h-40 object-cover border border-borderPrimary"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end items-center mt-2">
        <button 
          className="bg-textPrimary rounded-3xl border border-borderPrimary py-2 px-6 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:opacity-90 disabled:opacity-50 hover:cursor-pointer"
          onClick={handleClickButtonPublication}
          disabled={isPending} 
        >
          {isPending ? "Postando..." : "Postar"}
        </button>
      </div>
    </div>
  );
}

export default CardPublication;