interface ButtonFormsProps{
  text: string;
  active: boolean;
  onClick: () => void;
}

function ButtonForms({ text, onClick, active }: ButtonFormsProps){
  return (
    <button 
      className={`w-1/2 py-2 md:py-3 hover:cursor-pointer text-sm md:text-base font-bold transition-all ${
        active
          ? "border-textPrimary border-b-3 text-textPrimary"
          : "border-borderPrimary border-b"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ButtonForms;