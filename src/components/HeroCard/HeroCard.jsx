import { useDispatch } from "react-redux";
import { API_HOST } from "../../constants";
import { openHeroEdit } from "../../redux/heroes/heroesOperations";
import { Card } from "./HeroCard.styled";

export default function HeroCard({ id, image, nickname }) {
  const imageUrl = `${API_HOST}/heroes/download/${image}`;
  const dispatch = useDispatch();
  return (
    <Card
      onClick={() => {
        dispatch(openHeroEdit({ heroId: id }));
      }}
    >
      <img src={imageUrl}></img>
      <p>{nickname}</p>
    </Card>
  );
}
