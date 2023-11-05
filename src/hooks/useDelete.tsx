import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const useDelete = () => {
  const router = useRouter();
  const headers = {
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
    "access-token": Cookies.get("access-token"),
  };

  const deleteRecipe = async (recipe_id: number) => {
    const url = `http://localhost:3000/v1`;

    try {
      await axios.delete(`${url}/recipes/${recipe_id}`, { headers });
      router.refresh()
      router.back()
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return { deleteRecipe };
};

export default useDelete;