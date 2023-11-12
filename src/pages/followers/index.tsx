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

  const followers = await axios.get(
    `http://localhost:3000/v1/users/myfollowers`,
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
      followers: followers.data
    },
  };
};

const index = ({followers}: {followers: FOLLOW}) => {
  return (
    <div className={styles.wrapper}>
      <h2>フォロワー</h2>
      {followers.map((follower) => {
        return (
          <div key={follower.id}>
            <h3 className={styles.name}>{follower.user_name}</h3>
            <Link href={`followings/${follower.followed_id}/recipes`}>
              この人の投稿を見る
            </Link>
            <UnfollowButton follow_id={follower.id} />
          </div>
        );
      })}
    </div>
  );
};

export default index
