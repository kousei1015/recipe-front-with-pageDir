import { useRef } from "react";
import styles from "../../styles/Sign.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProfileEditProps } from "../../types";
import axios from "axios";
import Cookies from "js-cookie";

const validationSchema = z.object({
  name: z.string().min(1, "名前を入力して下さい"),
});

const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileEditProps>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const fileInput = useRef<HTMLInputElement | null>(null);

  const { ref } = register("avatar");

  const router = useRouter();

  const onSubmit = async (data: ProfileEditProps) => {
    const formData = new FormData();

    formData.append("name", data.name);

    if (fileInput.current?.files?.[0]) {
      formData.append("avatar", fileInput.current.files[0]);
    }

    await axios.patch("http://localhost:3000/v1/auth", formData, {
      headers: {
        uid: Cookies.get("uid"),
        client: Cookies.get("client"),
        "access-token": Cookies.get("access-token"),
      },
    });

    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <h2>プロフィール編集</h2>
      <input
        type="text"
        {...register("name")}
        placeholder="名前を入力してください"
        className={styles.input}
      />
      {errors.name?.message && (
        <p className={styles.error} data-testid="name-validation">
          {errors.name?.message}
        </p>
      )}
      <input
        type="file"
        ref={(e) => {
          ref(e);
          fileInput.current = e;
        }}
      />
      <button type="submit">送信する</button>
    </form>
  );
};

export default index;
