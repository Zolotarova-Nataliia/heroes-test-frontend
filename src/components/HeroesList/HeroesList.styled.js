import styled from "styled-components";

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 30px 0;
  margin-right: -15px;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
