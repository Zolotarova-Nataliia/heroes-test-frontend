import { HeaderEl } from "./Header.styled";

import image from "../../assets/images/theavengers_lob_mas_dsk_03_1.jpg";

export default function Header() {
  return (
    <HeaderEl>
      <p>Superheroes App</p>
      <div>
        <img src={image}></img>
      </div>
    </HeaderEl>
  );
}
