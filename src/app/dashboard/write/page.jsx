
"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {getStorage,ref,uploadBytesResumable,getDownloadURL,} from "firebase/storage";
import { app } from "@/utils/firebase";
import 'react-quill/dist/quill.snow.css'; // Import ReactQuill's styles
import dynamic from "next/dynamic";


const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaAuthor, setMetaAuthor] = useState("");
  const [metaRobots, setMetaRobots] = useState("index, follow"); // Default value
const ReactQuill=dynamic(()=>import('react-quill'),{ssr:false})

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };



  useEffect(() => {
    fetchCategories();

    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
 
  const handleSubmit = async () => {

    if (!title || !value || !catSlug || !metaTitle || !metaKeywords || !metaAuthor) {
      alert("Please fill in all the required fields before submitting.");
      return;
    }
    setLoading(true); 

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc: value,
          img: media,
          slug: slugify(title),
          catSlug: catSlug || "style",
          metaTitle,
          metaKeywords,
          metaAuthor,
          metaRobots,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}/>
      <input
        type="text"
        placeholder="Meta Title"
        className={styles.input}
        onChange={(e) => setMetaTitle(e.target.value)} />
      <input
        type="text"
        placeholder="Meta Keywords (comma separated)"
        className={styles.input}
        onChange={(e) => setMetaKeywords(e.target.value)}/>
      <input
        type="text"
        placeholder="Meta Author"
        className={styles.input}
        onChange={(e) => setMetaAuthor(e.target.value)}/>
      <select className={styles.select} onChange={(e) => setMetaRobots(e.target.value)}>
        <option value="index, follow">index, follow</option>
        <option value="noindex, nofollow">noindex, nofollow</option>
        <option value="noindex, follow">noindex, follow</option>
        <option value="index, nofollow">index, nofollow</option>
      </select>
      
      <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
       {categories.map((item,index)=>{
        return <option key={index} value={item.slug}>{item.title}</option>
       })}
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
      {/* <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button> */}
      <button
        className={styles.publish}
        onClick={handleSubmit}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
       
       <svg
         xmlns="http://www.w3.org/2000/svg"
         className="icon icon-tabler icon-tabler-loader"
         width="45"
         height="10"
         viewBox="0 0 24 24"
         strokeWidth="2"
         stroke="currentColor"
         fill="none"
         strokeLinecap="round"
         strokeLinejoin="round"
       >
         <circle
           cx="12"
           cy="12"
           r="4"
           stroke="currentColor"
           strokeWidth="2"
           fill="currentColor"
         >
           <animate
             attributeName="r"
             from="4"
             to="8"
             dur="1s"
             begin="0s"
             repeatCount="indefinite"
             keyTimes="0;0.5;1"
             values="4;8;4"
           />
         </circle>
       </svg>
       
        ) : (
          "Publish"
        )}
      </button>
    </div>
  );
};

export default WritePage;
