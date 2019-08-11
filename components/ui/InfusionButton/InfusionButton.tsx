import Button from "@material-ui/core/Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  && {
    /* background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%); */

    background: ${props =>
      props.color === "primary" ? "#a000ff" : props.color};
    border-radius: 3px;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);

    &:hover {
      background: ${props =>
        props.color === "primary" ? "#a000ff" : props.color};
      opacity: 0.5;
    }
  }
`;

const IntenseButton = styled.button`
  padding: 10px 25px;
  outline: none;
  display: inline-block;
  width: auto;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  transition: all 0.15s ease;
  background-color: ${props =>
    (props.color === "green" && "#3ECF8E") ||
    (props.color === "danger" && "red")};
  color: white;
  cursor: pointer;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    font-size: 150%;
    // position: relative;
    margin-right: 15px;
  }
`;

function InfusionButton({ buttonStyle = "", children, ...props }) {
  switch (buttonStyle) {
    case "intense":
      return <IntenseButton {...props}>{children}</IntenseButton>;
    default:
      return (
        <StyledButton {...props}>
          <ButtonContent>{children}</ButtonContent>
        </StyledButton>
      );
  }
}

export default InfusionButton;
