import useFollow from "@/hooks/useFollow";

const UnfollowButton = ({ follow_id }: { follow_id: number }) => {
    const { unfollowUser } = useFollow();
  
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await unfollowUser(follow_id);
    };
  
    return <button onClick={handleClick}>フォローを解除</button>;
  };
  
  export default UnfollowButton;