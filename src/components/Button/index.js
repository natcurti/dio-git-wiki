import { ButtonContainer } from "./styles";

function Button({title, onClick}) {
  return (
    <ButtonContainer onClick={onClick}>{title}</ButtonContainer>
  )
}

export default Button;
