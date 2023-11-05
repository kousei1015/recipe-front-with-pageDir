import useFollow from "@/hooks/useFollow";

const FollowButton = ({ user_id }: { user_id: number }) => {
  const { followUser } = useFollow();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await followUser(user_id);
  };

  return <button onClick={handleClick}>フォローする</button>;
};

export default FollowButton;