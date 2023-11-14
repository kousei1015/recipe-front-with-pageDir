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
        <p>{user_name}</p>
        <Image
          src={avatar_url || NoImage}
          alt={avatar_url ? "アバター画像" : "画像なし"}
          width={100}
          height={100}
        />
        <Link href="/profile_edit">プロフィールを編集する</Link>
        <button onClick={closeModal}>閉じる</button>
      </div>
    </div>
  ) : null;
};

export default Modal;
