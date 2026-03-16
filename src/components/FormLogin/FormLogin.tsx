import { HiOutlineMail } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import InputForms from "../InputForms/InputForms";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function FormLogin() {

  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    console.log(data);
  }

  return(
    <>
      <div className="w-full">
        <h2 className="text-textPrimary text-[30px] font-bold">Olá, de novo!</h2>
        <p className="text-base font-normal">Por favor, insira os seus dados para fazer login.</p>
      </div>

      <form 
        className="w-full flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <button type="submit" className="bg-textPrimary rounded-3xl py-4 text-white text-[16px] font-bold">
          {isSubmitting ? "Entrando..." : "Continuar"}
        </button>
      </form>

      <p className="text-center text-[12px] font-normal text-[#02274F] w-[320px]">Ao clicar em continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.</p>
    </>
  );
}

export default FormLogin;