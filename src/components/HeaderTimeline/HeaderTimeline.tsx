import { FiSearch } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

function HeaderTimeline() {

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputValue.trim() !== "") {
        setSearchParams({ search: inputValue });
      } else {
        searchParams.delete("search");
        setSearchParams(searchParams);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue, setSearchParams, searchParams]);

  return(
    <header className="flex-none px-10 py-3 flex justify-between items-center border-b border-borderPrimary">
      <h1 className="text-lg font-bold text-textPrimary">Mini Twitter</h1>
      
      <div className="flex items-center gap-1 bg-white py-2 px-4 rounded-md border border-borderPrimary text-sm w-80">
        <FiSearch />
        <input 
          type="text"
          placeholder="Buscar por post..."
          className="focus:outline-none focus:ring-0 placeholder:text-secundary"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <button 
          className="bg-white rounded-3xl border border-borderPrimary py-2 px-4 text-base font-bold transition-all duration-300 ease-in-out hover:opacity-90 hover:cursor-pointer"
          onClick={() => navigate("/login", { state: { tab: 'cadastrar' } })}
        >
          Registrar-se
        </button>
        <button 
          className="bg-textPrimary rounded-3xl border border-borderPrimary py-2 px-4 text-base font-bold text-white transition-all duration-300 ease-in-out hover:opacity-90 hover:cursor-pointer"
          onClick={() => navigate("/login", { state: { tab: 'login' } })}
        >
          Login
        </button>
      </div>
    </header>
  );
}

export default HeaderTimeline;