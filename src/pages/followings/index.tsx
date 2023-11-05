import styles from "../../styles/Follow.module.css"
import { GetServerSideProps } from "next";
import Link from "next/link";
import axios from "axios";
import { FOLLOW } from "@/types";
import UnfollowButton from "@/components/UnfollowButton";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authInfo = await axios.get("http://localhost:3000/v1/users", {
    headers: {
      Accept: "application/json",
      uid: context.req.cookies.uid,
      client: context.req.cookies.client,
      "access-token": context.req.cookies["access-token"],
      "Content-Type": "application/json",
    },
  });

  const followings = await axios.get(
    `http://localhost:3000/v1/users/myfollowings`,
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
      authInfo: authInfo.data,
      followings: followings.data,
    },
  };
};

const index = ({followings}: {followings: FOLLOW}) => {
  return (
    <div className={styles.wrapper}>
      <h2>フォロー</h2>
      {followings.map((following) => {
        return (
          <div key={following.id}>
            <h3 className={styles.name}>{following.user_name}</h3>
            <Link href={`followings/${following.followed_id}/recipes`}>
              この人の投稿を見る
            </Link>
            <UnfollowButton follow_id={following.id} />
          </div>
        );
      })}
    </div>
  );
};

export default index
