import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignIn } from "@/types";
import axios from "axios";
import Cookies from "js-cookie";

const validationSchema = z.object({
  email: z
    .string()
    .min(1)
    .email("正しいメールアドレスを入力して下さい"),
  password: z.string().min(6, "パスワードは6文字以上入力して下さい"),
});

const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: SignIn) => {
    const response = await axios.post(
      "http://localhost:3000/v1/auth/sign_in",
        data,
    );
    const { uid, client, "access-token": accessToken } = response.headers;
    Cookies.set("client", client);
    Cookies.set("access-token", accessToken);
    Cookies.set("uid", uid);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>ログインフォーム</h2>
      <input
        type="text"
        {...register("email")}
        placeholder="emailを入力してください"
      />
      <input
        type="password"
        {...register("password")}
        placeholder="passwordを入力してください"
      />
      <button type="submit">送信する</button>
    </form>
  );
};

export default index;