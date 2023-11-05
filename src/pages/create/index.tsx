import { useState } from "react";
import styles from "../../styles/Create.module.css"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [process, setProcess] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleProcess = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProcess(e.target.value);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImage(files[0]);
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("process", process);
    if (image) {
      formData.append("image", image);
    }
    await axios.post("http://localhost:3000/v1/recipes", formData, {
      headers: {
        client: Cookies.get("client"),
        uid: Cookies.get("uid"),
        "access-token": Cookies.get("access-token"),
      },
    });
    router.refresh();
    router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <h2>レシピ投稿画面</h2>
      <input type="text" value={name} onChange={handleName} placeholder="レシピのタイトルを入力して下さい" />
      <input type="file" name="file" onChange={handleFile} />
      <textarea
        placeholder="レシピの作り方を書いて下さい"
        value={process}
        onChange={handleProcess}
        cols={30}
        rows={10}
      ></textarea>
      <button onClick={handleClick} disabled={!name || !process}>送信</button>
    </div>
  );
};

export default Page;