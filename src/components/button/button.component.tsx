import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import "./button.styles.scss"

const Button: React.FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, className ,  ...props }) => {

  return (
    <button
      className={`${className} button-container`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
