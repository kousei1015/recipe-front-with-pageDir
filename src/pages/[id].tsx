import styles from "../styles/DetailRecipe.module.css";
import NoImage from "../../public/1560031.jpg";
import DeleteButton from "@/components/DeleteButton";
import FollowButton from "@/components/FollowButton";
import FavoriteButton from "@/components/FavoriteButton";
import UnfollowButton from "@/components/UnfollowButton";
import UnfavoriteButton from "@/components/UnfavoriteButton";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { AUTHINFO, RECIPE } from "@/types";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  const authInfo = await axios.get("http://localhost:3000/v1/users", {
    headers: {
      Accept: "application/json",
      uid: context.req.cookies.uid,
      client: context.req.cookies.client,
      "access-token": context.req.cookies["access-token"],
      "Content-Type": "application/json",
    },
  });

  const recipe = await axios.get(`http://localhost:3000/v1/recipes/${id}`, {
    headers: {
      Accept: "application/json",
      uid: context.req.cookies.uid,
      client: context.req.cookies.client,
      "access-token": context.req.cookies["access-token"],
      "Content-Type": "application/json",
    },
  });
  return {
    props: {
      authInfo: authInfo.data,
      recipe: recipe.data,
    },
  };
};

const RecipeDetail = ({
  recipe,
  authInfo,
}: {
  recipe: RECIPE;
  authInfo: AUTHINFO;
}) => {
  const isLogin = authInfo.is_login;
  const isOwnRecipe = recipe.user_id === authInfo.user_id;
  const isFavorited = !!recipe.favorite_id;
  const isFollowed = !!recipe.follow_id;
  return (
    <div className={styles.wrapper}>
      <div className={styles.recipe}>
        <h2 className={styles.recipe_name}>{recipe.recipe_name}</h2>
        <div className={styles.img_wrapper}>
          <Image
            src={recipe.image_url || NoImage}
            alt={recipe.image_url ? "レシピ画像" : "画像なし"}
            width={100}
            height={100}
          />
        </div>
        <div className={styles.process}>
          <p>{recipe.process}</p>
        </div>
        <h3>材料</h3>
        <ul className={styles.ingredient_list}>
          {recipe.ingredients?.map((ingredient) => {
            return (
              <li className={styles.ingredient_item}>
                {ingredient.name} {ingredient.quantity}
              </li>
            );
          })}
        </ul>
        {/*自身の投稿の場合は削除ボタンを表示させる。 そうでない場合は投稿したユーザー名を表示させる */}
        {isOwnRecipe ? (
          <DeleteButton recipe_id={recipe.id} />
        ) : (
          <div className={styles.avatar_wrapper}>
            <Image
              src={recipe.avatar_url || NoImage}
              alt={recipe.avatar_url ? "レシピ画像" : "画像なし"}
              width={100}
              height={100}
            />
            <p>{recipe.user_name}</p>
          </div>
        )}

        {/*ログインしていて、かつ既にレシピがお気に入り済みの場合はお気に入りを解除させる そうでない場合は保存させる */}
        {isLogin && (
          <>
            {isFavorited ? (
              <UnfavoriteButton favorite_id={recipe.favorite_id as number} />
            ) : (
              <FavoriteButton recipe_id={recipe.id} />
            )}
          </>
        )}

        {/*ログインしていて、かつユーザーを既にフォロー済みの場合はフォローを解除する。 そうでない場合はフォローする */}
        {isLogin && (
          <>
            {isFollowed ? (
              <UnfollowButton follow_id={recipe.follow_id as number} />
            ) : (
              <FollowButton user_id={recipe.user_id} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
