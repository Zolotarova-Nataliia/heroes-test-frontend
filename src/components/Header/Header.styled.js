import styled from "styled-components";

export const HeaderEl = styled.header`
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
  > p {
    font-size: 18px;
    font-weight: 800;
    text-transform: uppercase;
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.7);
    letter-spacing: 0.1em;
    color: #ffff;
  }
  > div {
    width: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  @media screen and (min-width: 768px) {
    height: 150px;
    > p {
      font-size: 40px;
      letter-spacing: 0.5em;
    }
  }
  @media screen and (min-width: 1100px) {
    height: 200px;
  }
`;
