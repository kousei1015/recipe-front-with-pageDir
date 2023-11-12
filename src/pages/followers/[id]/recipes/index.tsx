import styles from "../../../../styles/Recipes.module.css";
import { GetServerSideProps } from "next";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { RECIPES } from "@/types";
import NoImage from "./../../../../../public/1560031.jpg";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const recipes = await axios.get(
    `http://localhost:3000/v1/users/${id}/recipes`,
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
      recipes: recipes.data,
    },
  };
};

const index = ({ recipes }: { recipes: RECIPES }) => {
  return (
    <div className={styles.wrapper}>
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
            <p className={styles.user_name}>ユーザー名: {recipe.user_name}</p>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default index;
