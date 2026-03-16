import { HiOutlineMail } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import InputForms from "../InputForms/InputForms";

function FormLogin() {
  return(
    <>
      <div className="w-full">
        <h2 className="text-textPrimary text-[30px] font-bold">Olá, de novo!</h2>
        <p className="text-base font-normal">Por favor, insira os seus dados para fazer login.</p>
      </div>

      <form className="w-full flex flex-col gap-5">
        <InputForms
          label="E-mail"
          id="email"
          type="email"
          placeholder="Insira o seu e-mail"
          icon={<HiOutlineMail className="text-2xl"/>}
        />

        <InputForms
          label="Senha"
          id="password"
          type="password"
          placeholder="Insira a sua senha"
          icon={<IoEyeOutline className="text-2xl"/>}
        />

        <button type="submit" className="bg-textPrimary rounded-3xl py-4 text-white text-[16px] font-bold">Continuar</button>
      </form>

      <p className="text-center text-[12px] font-normal text-[#02274F] w-[320px]">Ao clicar em continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.</p>
    </>
  );
}

export default FormLogin;