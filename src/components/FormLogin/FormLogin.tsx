import { AiOutlineMail } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import InputForms from "../InputForms/InputForms";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";

function FormLogin() {

  const { register, handleSubmit, formState: {errors} } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { login, isLoading } = useAuth();

  async function onSubmit(data: LoginSchema) {
    try {
      await login(data);
    } catch(error) {
      console.log(error);
    }
  }

  return(
    <>
      <div className="w-full">
        <h2 className="text-textPrimary dark:text-white text-2xl md:text-[30px] font-bold">Olá, de novo!</h2>
        <p className="text-sm md:text-base font-normal">Por favor, insira os seus dados para fazer login.</p>
      </div>

      <form 
        className="w-full flex flex-col gap-4 md:gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputForms
          label="E-mail"
          id="email"
          type="email"
          placeholder="Insira o seu e-mail"
          icon={<AiOutlineMail className="text-2xl"/>}
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

        <button 
          type="submit"
          disabled={isLoading} 
          className="bg-textPrimary rounded-3xl py-4 text-white text-base font-bold transition-all duration-300 ease-in-out hover:opacity-90 hover:cursor-pointer"
        >
          {isLoading ? "Entrando..." : "Continuar"}
        </button>
      </form>

      <p className="text-center text-[12px] font-normal text-[#02274F] dark:text-darkBorder w-full max-w-[320px]">
        Ao clicar em continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
      </p>
    </>
  );
}

export default FormLogin;