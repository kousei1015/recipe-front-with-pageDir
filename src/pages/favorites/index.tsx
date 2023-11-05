import styles from "../../styles/Recipes.module.css";
import { GetServerSideProps } from "next";
import { FavRecipes } from "@/types";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import NoImage from "./../../../public/1560031.jpg";
import UnfavoriteButton from "@/components/UnfavoriteButton";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const favoriteRecipes = await axios.get(
    "http://localhost:3000/v1/favorites",
    {
      headers: {
        Accept: "application/json",
        uid: context.req.cookies.uid,
        client: context.req.cookies.client,
        "access-token": context.req.cookies["access-token"],
        "Content-Type": "application/json",
      },
    }
  );

  return {
    props: {
      favoriteRecipes: favoriteRecipes.data,
    },
  };
};

const index = ({ favoriteRecipes }: { favoriteRecipes: FavRecipes }) => {
  return (
    <>
      <h2 className={styles.heading}>保存済みレシピ</h2>
      <div className={styles.wrapper}>
        {favoriteRecipes.map((recipe) => {
          return (
            <article key={recipe.favorite_id} className={styles.recipe}>
              <Link href={`/${recipe.recipe_id}`}>
                <div className={styles.img_wrapper}>
                  <Image
                    src={recipe.image_url || NoImage}
                    alt={recipe.image_url ? "レシピ画像" : "画像なし"}
                    width={100}
                    height={100}
                  />
                  <span className={styles.recipe_name}>
                    {recipe.recipe_name}
                  </span>
                </div>
                <p>ユーザー名: {recipe.user_name}</p>
                <UnfavoriteButton favorite_id={recipe.favorite_id} />
              </Link>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default index;
