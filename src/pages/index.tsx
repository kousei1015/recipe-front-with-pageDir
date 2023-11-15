import Modal from "@/components/Modal";
import styles from "../styles/Top.module.css";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import NoImage from "../../public/1560031.jpg";
import { RECIPES, AUTHINFO } from "@/types";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const authInfo = await axios.get("http://localhost:3000/v1/users", {
      headers: {
        Accept: "application/json",
        uid: context.req.cookies.uid,
        client: context.req.cookies.client,
        "access-token": context.req.cookies["access-token"],
        "Content-Type": "application/json",
      },
    });
    const recipes = await axios.get("http://localhost:3000/v1/recipes", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return {
      props: {
        authInfo: authInfo.data,
        recipes: recipes.data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        error: "Error fetching data",
      },
    };
  }
};

const index = ({
  authInfo,
  recipes,
}: {
  authInfo: AUTHINFO;
  recipes: RECIPES;
}) => {
  const [isShow, setIsShow] = useState(false);

  const openModal = () => {
    setIsShow(true);
  };

  return (
    <>
      {authInfo?.is_login ? (
        <>
          <div className={styles.avatar_wrapper}>
            <div className={styles.avatar} onClick={openModal}>
              <Image
                src={authInfo.avatar_url || NoImage}
                alt={authInfo.avatar_url ? "レシピ画像" : "画像なし"}
                width={100}
                height={100}
              />
              <span>{authInfo.user_name}</span>
            </div>
          </div>

          <Modal
            isShow={isShow}
            setIsShow={setIsShow}
            user_name={authInfo.user_name as string}
            avatar_url={authInfo.avatar_url as string}
          />
        </>
      ) : null}
      <h2 className={styles.heading}>レシピ一覧</h2>
      <div className={styles.headers}>
        {authInfo?.is_login ? (
          <>
            <Link href="/favorites">
              <h3>保存済みレシピ</h3>
            </Link>
            <Link href="/create">
              <h3>レシピ投稿</h3>
            </Link>
          </>
        ) : (
          <>
            <Link href="/sign_in">ログイン</Link>
            <Link href="/sign_up">新規登録</Link>
          </>
        )}
      </div>

      <div className={styles.recipe_wrapper}>
        {recipes?.recipes.map((recipe) => (
          <article key={recipe.id} className={styles.recipe}>
            <Link href={`/${recipe.id}`}>
              <div className={styles.img_wrapper}>
                <Image
                  src={recipe.image_url || NoImage}
                  alt={recipe.image_url ? "レシピ画像" : "画像なし"}
                  width={100}
                  height={100}
                />
                <span className={styles.recipe_name}>{recipe.recipe_name}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
};

export default index;
