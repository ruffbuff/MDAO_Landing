import styled from "styled-components";

const Alert = styled.div<{ padding?: string; mb?: string }>`
  background-color: ${(props) => props.color || "#FFF"};
  padding: ${(props) => props.padding || "1rem"};
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: ${(props) => props.mb || "0"};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Alert;
