import Cookies from "js-cookie";
const useLogout = () => {
  Cookies.remove("uid");
  Cookies.remove("client")
  Cookies.remove("access-token");
};

export default useLogout;
