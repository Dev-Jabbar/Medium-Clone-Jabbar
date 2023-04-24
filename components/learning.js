import Image from "next/image";
import Logo from "../static/logo.png";

const styles = {
  wrapper: "flex justify-center gap-10 p-5 bg-[blue] ",
  content: `max-w-7xl  bg-[green]`,
  logoContainer: "flex items-center flex-start bg-[red]",
};

const Learning = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image className={styles.logo} src={Logo} height={40} width={200} />
        </div>
        <div className={styles.bannerNav}>
          <div> our story</div>
          <div> membership</div>
          <div> sign in</div>
          <div> Get Started</div>
        </div>
      </div>
    </div>
  );
};
export default Learning;
