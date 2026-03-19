import { CiHeart } from "react-icons/ci";

function CardPost() {
  return (
    <div className="border border-borderPrimary rounded-lg p-4 flex flex-col gap-3 bg-white">
      <div className="flex items-center gap-1.5 text-sm">
        <p className="font-bold text-base text-black">Lucas Costa</p>
        <p>@lucascosta</p>
        <p>15/02/2026</p>
      </div>

      <div>
        <p className="font-bold text-lg text-black">Iniciando um novo processo seletivo! 🚀</p>
        <p className="text-base">Really excited to share what we've been working on. The team has put in
countless hours to make this seamless. Check out the screenshot below!
#product #launch</p>
      </div>

      <div>
        <img 
          className="rounded-lg"
        />
      </div>

      <div>
        <button className="hover:cursor-pointer">
          <CiHeart className="text-red-500 text-2xl"/>
        </button>
      </div>
    </div>
  );
}

export default CardPost;