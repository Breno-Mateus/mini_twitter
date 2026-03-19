import { CiImageOn } from "react-icons/ci";

function CardPublication() {
  return (
    <div className="border border-borderPrimary rounded-lg shadow-lg p-4 flex flex-col gap-4 bg-white">
      <div className="border-b border-borderPrimary">
        <textarea 
          placeholder="E aí, o que tá rolando?"
          className="w-full resize-none focus:outline-none focus:ring-0 placeholder:text-secundary"
          rows={3}
          maxLength={280}
        />
      </div>

      <div className="flex justify-between">
        <button>
          <CiImageOn className="text-textPrimary text-3xl hover:cursor-pointer"/>
        </button>
        
        <button className="bg-textPrimary rounded-3xl border border-borderPrimary py-2 px-4 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:opacity-90 hover:cursor-pointer">Postar</button>
      </div>
    </div>
  );
}

export default CardPublication;