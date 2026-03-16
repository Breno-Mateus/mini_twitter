import { HiOutlineMail } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

function FormRegister() {
  return(
    <>
      <div className="w-full">
        <h2 className="text-textPrimary text-[30px] font-bold">Olá, vamos começar!</h2>
        <p className="text-base font-normal">Por favor, insira os dados solicitados para fazer cadastro.</p>
      </div>

      <form className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nome</label>
          <div className="bg-white rounded-md border border-borderPrimary p-4 flex items-center justify-between">
            <input 
              id="name" 
              type="text"
              placeholder="Insira o seu nome"
              className="focus:outline-none focus:ring-0 placeholder:text-secundary w-9/12"
            />
            <IoPersonOutline className="text-2xl"/>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">E-mail</label>
          <div className="bg-white rounded-md border border-borderPrimary p-4 flex items-center justify-between">
            <input 
              id="email" 
              type="email"
              placeholder="Insira o seu e-mail"
              className="focus:outline-none focus:ring-0 placeholder:text-secundary w-9/12"
            />
            <HiOutlineMail className="text-2xl"/>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Senha</label>
          <div className="bg-white rounded-md border border-borderPrimary p-4 flex items-center justify-between">
            <input 
              id="password" 
              type="password"
              placeholder="Insira o seu senha"
              className="focus:outline-none focus:ring-0 placeholder:text-secundary w-9/12"
            />
            <IoEyeOutline className="text-2xl"/>
          </div>
        </div>

        <button type="submit" className="bg-textPrimary rounded-3xl py-4 text-white text-[16px] font-bold">Continuar</button>
      </form>

      <p className="text-center text-[12px] font-normal text-[#02274F] w-[320px]">Ao clicar em continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.</p>
    </>
  );
}

export default FormRegister;