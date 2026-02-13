import logoMiroHorizontal from "@/assets/logo-miro-horizontal.png";

interface StaticLogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const StaticLogo = ({ className = "", variant = "dark" }: StaticLogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoMiroHorizontal}
        alt="Clínica Miró - Odontología de Excelencia"
        className={`h-14 md:h-20 w-auto ${variant === "light" ? "brightness-0 invert" : ""}`}
      />
    </div>
  );
};

export default StaticLogo;
