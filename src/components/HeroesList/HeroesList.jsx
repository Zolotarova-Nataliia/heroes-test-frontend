import HeroCard from "../HeroCard/HeroCard";
import { List } from "./HeroesList.styled";

export default function HeroesList({ heroesList }) {
  return (
    <List>
      {heroesList.map((el) => (
        <HeroCard
          key={el._id}
          id={el._id}
          image={el.image}
          nickname={el.nickname}
        />
      ))}
    </List>
  );
}
