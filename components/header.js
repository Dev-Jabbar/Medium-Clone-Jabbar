import Image from "next/image";
import Logo from "../static/logo.png";
import { useContext } from "react";
import { MediumContext } from "../context/MediumContext";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Link from "next/link";
import PostModal from "./PostModal";

Modal.setAppElement("#__next");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%,-50%)",
    backgorundColor: "#fff",
    padding: 0,
    border: "none",
  },

  overlay: {
    backgroundColor: "rgba(10,11,13,0.75)",
  },
};

const styles = {
  wrapper: "flex justify-center gap-10 p-5 bg-[#FCC017]",
  content: "max-w-7xl flex-1  flex justify-between gap-10  ",
  logoContainer: "flex items-center flex-start",

  logo: "cursor-pointer object-contain",
  bannerNav: "flex cursor-pointer items-center space-x-5",
  accentedButton: "bg-black text-white py-2 px-2 rounded-full",
};

const Header = () => {
  const router = useRouter();
  const { currentUser, handleUserAuth } = useContext(MediumContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image className={styles.logo} src={Logo} height={40} width={200} />
        </div>

        {currentUser ? (
          <div className={styles.bannerNav}>
            <div> our story</div>
            <div> membership</div>
            <Link href={"/?addNew=1"}>
              <div className={styles.accentedButton}> write</div>
            </Link>
            <div className={styles.accentedButton}> Get Unlimited access</div>
          </div>
        ) : (
          <div className={styles.bannerNav}>
            <div> our story</div>
            <div> membership</div>
            <div onClick={handleUserAuth}> sign in</div>
            <div className={styles.accentedButton}> Get Started</div>
          </div>
        )}
      </div>

      <Modal
        isOpen={Boolean(router.query.addNew)}
        onRequestClose={() => router.push("/")}
        style={customStyles}
      >
        <PostModal />
      </Modal>
    </div>
  );
};
export default Header;
