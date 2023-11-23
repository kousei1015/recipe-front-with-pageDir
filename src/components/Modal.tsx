import styles from "./Modal.module.css";
import NoImage from "../../public/1560031.jpg";
import Link from "next/link";
import Image from "next/image";
import { ModalProps } from "../types";
const Modal = ({ isShow, setIsShow, user_name, avatar_url }: ModalProps) => {
  const closeModal = () => {
    setIsShow(false);
  };
  return isShow ? (
    <div className={styles.overlay}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.avatar_wrapper}>
          <Image
            src={avatar_url || NoImage}
            alt={avatar_url ? "アバター画像" : "画像なし"}
            width={100}
            height={100}
          />
          <p>{user_name}</p>
        </div>
        <ul className={styles.links_list}>
          <li className={styles.links_item}>
            <Link href="/followings">
              <h3>フォロー中</h3>
            </Link>
          </li>
          <li className={styles.links_item}>
            <Link href="/followers">
              <h3>フォロワー</h3>
            </Link>
          </li>
          <li className={styles.links_item}>
            <Link href="/profile_edit" className={styles.link}>
              プロフィールを編集する
            </Link>
          </li>
        </ul>

        <button onClick={closeModal}>閉じる</button>
      </div>
    </div>
  ) : null;
};

export default Modal;
