import ButtonForms from "../ButtonForms/ButtonForms";
import FormLogin from "../FormLogin/FormLogin";
import { useState } from "react";
import FormRegister from "../FormRegister/FormRegister";
import { useLocation } from "react-router-dom";

function Login() {

  const location = useLocation();

  const homeTab = location.state?.tab || "login";

  const [ currentForm, setCurrentForm ] = useState(homeTab);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-6 p-30">
      <div className="flex flex-col items-center gap-14 w-120">
        <header>
          <h1 className="text-textPrimary text-center font-bold text-4xl">Mini Twitter</h1>
        </header>

        <div className="w-full flex justify-between">
          <ButtonForms 
            text="Login"
            onClick={() => setCurrentForm("login")}
            active={currentForm === "login"}
          />
          <ButtonForms 
            text="Cadastrar"
            onClick={() => setCurrentForm("cadastrar")}
            active={currentForm === "cadastrar"} 
          />
        </div>

        {currentForm === "login"
          ? <FormLogin />
          : <FormRegister />
        }
      </div>
    </main>
  );
}

export default Login;