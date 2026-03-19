import { HiOutlineMail } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import InputForms from "../InputForms/InputForms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "../../schemas/registerSchema";
import { useRegister } from "../../hooks/useRegister"; 

function FormRegister() {

  const { register, handleSubmit, formState: {errors} } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { registerUser, isLoading, errorMessage } = useRegister();

  async function onSubmit(data: RegisterSchema) {
    try {
      await registerUser(data);
    } catch(error) {
      console.log(error);
    }
  }

  return(
    <>
      <div className="w-full">
        <h2 className="text-textPrimary text-[30px] font-bold">Olá, vamos começar!</h2>
        <p className="text-base font-normal">Por favor, insira os dados solicitados para fazer cadastro.</p>
      </div>

      <form 
        className="w-full flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputForms
          label="Nome"
          id="name"
          type="text"
          placeholder="Insira o seu nome"
          icon={<IoPersonOutline className="text-2xl"/>}
          error={errors.name}
          {...register("name")}
        />

        <InputForms
          label="E-mail"
          id="email"
          type="email"
          placeholder="Insira o seu e-mail"
          icon={<HiOutlineMail className="text-2xl"/>}
          error={errors.email}
          {...register("email")}
        />

        <InputForms
          label="Senha"
          id="password"
          type="password"
          placeholder="Insira a sua senha"
          icon={<IoEyeOutline className="text-2xl"/>}
          error={errors.password}
          {...register("password")}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm font-semibold text-center mb-2">
            {errorMessage}
          </p>
        )}

        <button 
          type="submit"
          disabled={isLoading} 
          className="bg-textPrimary rounded-3xl py-4 text-white text-[16px] font-bold transition-all duration-300 ease-in-out hover:opacity-90 hover:cursor-pointer"
        >
          {isLoading ? "Cadastrando..." : "Continuar"}
        </button>
      </form>

      <p className="text-center text-[12px] font-normal text-[#02274F] w-[320px]">Ao clicar em continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.</p>
    </>
  );
}

export default FormRegister;