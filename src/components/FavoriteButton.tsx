import useFavorite from "@/hooks/useFavorite";

const FavoriteButton = ({ recipe_id }: { recipe_id: number }) => {
  const { saveFavorite } = useFavorite();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await saveFavorite(recipe_id);
    e.preventDefault();
  };

  return <button onClick={handleClick}>保存</button>;
};

export default FavoriteButton;