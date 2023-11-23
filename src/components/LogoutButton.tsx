import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    useLogout();
    router.refresh();
  };

  return <button onClick={handleClick}>ログアウト</button>;
};

export default LogoutButton;
