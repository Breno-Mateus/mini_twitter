import { FiSearch } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuthStore } from "../../store/authStore";
import { api } from "../../services/api";
import { useQueryClient } from "@tanstack/react-query";

function HeaderTimeline() {

  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("search") || "");
  const queryClient = useQueryClient();

  async function handleClickButtonLogout() {
    try {
      await api.post("/auth/logout");
      queryClient.clear();
      logout();
      navigate("/login", { state: { tab: 'login' } });
    } catch(error) {
      console.error("Erro ao fazer logout no servidor:", error);
      queryClient.clear();
      logout();
      navigate("/login", { state: { tab: 'login' } });
    }
  }

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
    <header className="flex-none px-4 md:px-10 py-3 flex flex-wrap justify-between items-center gap-4 border-b border-borderPrimary dark:border-darkBorder">
      <h1 className="text-base md:text-lg font-bold text-textPrimary dark:text-white">Mini Twitter</h1>
      
      <div className="flex items-center gap-1 bg-white dark:bg-darkSecudary py-2 px-4 rounded-md border border-borderPrimary dark:border-darkBorder text-sm w-full md:w-80 order-last md:order-0">
        <FiSearch />
        <input 
          type="text"
          placeholder="Buscar por post..."
          className="w-full focus:outline-none focus:ring-0 placeholder:text-secundary"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      {token != null ? (
        <div className="flex items-center gap-2">
          <button 
            className="bg-textPrimary dark:bg-darkSecudary p-2 text-white dark:text-darkBorder text-lg rounded-full transition-all duration-300 ease-in-out hover:opacity-90 hover:cursor-pointer"
            onClick={handleClickButtonLogout}
          >
            <RiLogoutBoxLine />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button 
            className="bg-white dark:bg-darkSecudary rounded-3xl border border-borderPrimary dark:border-darkBorder dark:text-white py-2 px-4 text-sm md:text-base font-bold transition-all duration-300 ease-in-out hover:opacity-90 hover:cursor-pointer"
            onClick={() => navigate("/login", { state: { tab: 'cadastrar' } })}
          >
            Registrar
          </button>
          <button 
            className="bg-textPrimary rounded-3xl border border-borderPrimary dark:border-none py-2 px-4 text-sm md:text-base font-bold text-white transition-all duration-300 ease-in-out hover:opacity-90 hover:cursor-pointer"
            onClick={() => navigate("/login", { state: { tab: 'login' } })}
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
}

export default HeaderTimeline;