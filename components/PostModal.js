import { MediumContext } from "../context/MediumContext";
import { useState, useContext } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
const styles = {
  wrapper:
    "2xl:h-[50rem] 2xl:w-[80rem] xl:w-[70rem] xl:h-[40rem] lg:w-[60rem] lg:h-[30rem] md:h-[30rem] md:w-[50rem] h-[40rem] w-[20rem]  flex flex-col justify-start items-center gap-[1rem] p-[1rem] font-mediumSerif overflow-scroll",

  title: "my-[2rem] font-bold text-3xl",
  smallField: "w-full flex justify-between gap-[1rem]",
  fieldTitle: "flex-1 text-end",

  inputContainer: "flex-[5] h-min border-2 border-[#787878]",
  inputField: "w-full border-0 outline-none background-transparent",
  accentedButton: "bg-black text-white py-2 px-4 rounded-full",
};

const PostModal = () => {
  const { currentUser } = useContext(MediumContext);

  const [title, setTitle] = useState("");

  const [brief, setBrief] = useState("");

  const [category, setCategory] = useState("");

  const [postLength, setPostLength] = useState("");
  const [bannerImage, setBannerImage] = useState("");

  const [body, setBody] = useState("");
  const [status, setStatus] = useState(""); // "", "saving", "success", "error"

  const addPostToFirebase = async (event) => {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      setStatus("error");
      return;
    }

    setStatus("saving");

    const parsedLength = parseInt(postLength, 10);
    const safePostLength = Number.isFinite(parsedLength) ? parsedLength : 1;

    try {
      await addDoc(collection(db, "Articles"), {
        bannerImage: bannerImage,
        body: body,
        category: category,
        brief: brief,
        postedOn: serverTimestamp(),
        postLength: safePostLength,
        title: title,
        author: currentUser.email,
      });

      // Clear the form after a successful save
      setTitle("");
      setBrief("");
      setCategory("");
      setPostLength("");
      setBannerImage("");
      setBody("");
      setStatus("success");
    } catch (error) {
      console.error("Error saving post:", error);
      setStatus("error");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}> Create New Post</div>
      <div className={styles.smallField}>
        <span className={styles.fieldTitle}>Title</span>
        <span className={styles.inputContainer}>
          <input
            className={styles.inputField}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </span>
      </div>

      <div className={styles.smallField}>
        <span className={styles.fieldTitle}>Brief</span>
        <span className={styles.inputContainer}>
          <input
            className={styles.inputField}
            type="text"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
          />
        </span>
      </div>
      <div className={styles.smallField}>
        <span className={styles.fieldTitle}>BannerImage Url</span>
        <span className={styles.inputContainer}>
          <input
            className={styles.inputField}
            type="text"
            value={bannerImage}
            onChange={(event) => setBannerImage(event.target.value)}
          />
        </span>
      </div>

      <div className={styles.smallField}>
        <span className={styles.fieldTitle}>Category</span>
        <span className={styles.inputContainer}>
          <input
            className={styles.inputField}
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </span>
      </div>

      <div className={styles.smallField}>
        <span className={styles.fieldTitle}>
          Estimated Read Length (in minutes)
        </span>
        <span className={styles.inputContainer}>
          <input
            className={styles.inputField}
            type="number"
            min="1"
            value={postLength}
            onChange={(event) => setPostLength(event.target.value)}
          />
        </span>
      </div>

      <div className={styles.smallField}>
        <span className={styles.fieldTitle}>Article Text</span>
        <span className={styles.inputContainer}>
          <textarea
            className={styles.inputField}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={12}
          />
        </span>
      </div>

      <button onClick={addPostToFirebase} className={styles.accentedButton}>
        {status === "saving" ? "Saving..." : "Submit"}
      </button>

      {status === "success" && (
        <div className="text-[#1A8917] font-semibold">
          ✅ Post saved successfully!
        </div>
      )}
      {status === "error" && (
        <div className="text-red-600 font-semibold">
          ⚠️ Something went wrong. Make sure Title and Article Text are filled
          in, then try again.
        </div>
      )}
    </div>
  );
};

export default PostModal;
