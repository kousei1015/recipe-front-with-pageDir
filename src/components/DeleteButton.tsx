import useDelete from "@/hooks/useDelete";

const DeleteButton = ({ recipe_id }: { recipe_id: number }) => {
  const { deleteRecipe } = useDelete();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteRecipe(recipe_id)
  };

  return <button onClick={handleClick}>削除</button>;
};

export default DeleteButton;