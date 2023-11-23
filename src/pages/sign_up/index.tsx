import styles from "../../styles/Sign.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignUp } from "@/types";
import axios from "axios";
import Cookies from "js-cookie";

const validationSchema = z
  .object({
    email: z.string().email("正しいメールアドレスを入力して下さい"),
    password: z.string().min(6, "パスワードは6文字以上入力して下さい"),
    password_confirmation: z
      .string()
      .min(6, "パスワードは6文字以上入力して下さい"),
    name: z.string().min(1, "名前を入力して下さい"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "確認用のパスワードと入力したパスワードが一致しません",
  });

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: SignUp) => {
    const response = await axios.post("http://localhost:3000/v1/auth/", data);
    const { uid, client, "access-token": accessToken } = response.headers;
    Cookies.set("client", client);
    Cookies.set("access-token", accessToken);
    Cookies.set("uid", uid);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <h2>新規登録</h2>
      <input
        type="text"
        {...register("email")}
        placeholder="emailを入力してください"
      />
      {errors.email?.message && (
        <p className={styles.error} data-testid="email-validation">
          {errors.email?.message}
        </p>
      )}
      <input
        type="password"
        {...register("password")}
        placeholder="passwordを入力してください"
      />
      {errors.password?.message && (
        <p className={styles.error} data-testid="password-validation">
          {errors.password?.message}
        </p>
      )}
      <input
        type="password"
        {...register("password_confirmation")}
        placeholder="パスワード確認用"
      />
      {errors.password_confirmation?.message && (
        <p className={styles.error} data-testid="confirm-password-validation">
          {errors.password_confirmation.message}
        </p>
      )}
      <input
        type="text"
        {...register("name")}
        placeholder="名前を入力して下さい"
      />
      {errors.name?.message && (
        <p className={styles.error} data-testid="name-validation">
          {errors.name.message}
        </p>
      )}
      <button type="submit">送信する</button>
    </form>
  );
};

export default Page;
