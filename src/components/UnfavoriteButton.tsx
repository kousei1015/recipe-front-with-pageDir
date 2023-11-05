import useFavorite from "@/hooks/useFavorite";

const UnfavoriteButton = ({ favorite_id }: { favorite_id: number }) => {
  const { unfavorite } = useFavorite();
  
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await unfavorite(favorite_id);
  };

  return <button onClick={handleClick}>お気に入りを解除</button>;
};

export default UnfavoriteButton;