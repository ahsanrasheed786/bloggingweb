"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import Loader from '@/components/loader/Loader';
import ReactScroller from 'react-scrollbars-custom'; // Import ReactScroller
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
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
  const [metaRobots, setMetaRobots] = useState("index, follow");
  const [metaDisc, setMetaDisc] = useState("");
  // =======FQA ======
  const [fqa, setFqa] = useState([{ question: "", answer: "" }]);
 // ==========artical=========
const [heading, setHeading] = useState("");
const [featureImage, setFeatureImage] = useState("");
const [discription, setDiscription] = useState("");
const [ articalBody, setArticalBody] = useState("");
// ==========artical=========

  const [author, setAuthor] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const [adminArray, setAdminArray] = useState([]);
  const [fetchingLoader, setFetchingLoader] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [varifyDoctor, setVarifyDoctor] = useState([]);
  const [doctorVal, setDoctorVal] = useState('');
  const [imageUpload,setImageUpload]=useState('')
  const [imgAlt,setImgAlt]= useState('');
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    async function fetchAccessData() {
      try {
        const response = await fetch('/api/access/');
        if (response.ok) {
          const data = await response.json();
          setAdminArray(data.filter((item) => item.isAdmin === true));
          setAuthor(data.map((item) => item.name));
        } else {
          setError('Failed to fetch access data.');
        }
      } catch (err) {
        setError('An error occurred while fetching access data.');
      } finally {
        setFetching(false);
      }
    }
    fetchAccessData();
  }, []);


  useEffect(() => {
    fetchVarifyDoctor();
  }, []);

  const fetchVarifyDoctor = async () => {
    try {
      const res = await fetch( "/api/author");
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setVarifyDoctor(data);
    } catch (error) {
      console.error('Error fetching varify authors:', error);
    }
  };

  
  useEffect(() => {
    if (!fetching) {
      if (!adminArray.some((item) => item.email === userEmail)) {
        setUnauthorized(true);
        setFetchingLoader(false);
      } else {
        setFetchingLoader(false);
      }
    }
  }, [fetching, adminArray, userEmail]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (file) {
      const storage = getStorage(app);
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setImageUpload(`${progress}  %` )
        },
        (error) => console.error(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setMedia(downloadURL));
        }
      );
    }
  }, [file]);

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    if (!title || !value) {
      alert("Please fill in all the required fields before submitting.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          img: media,
          imgAlt,
          desc: value,
          slug: slugify(title),
          catSlug: catSlug || "style",
          metaTitle,
          metaKeywords,
          metaAuthor,
          metaRobots,
          metaDisc,
           fqa ,
           artical:{
           heading: heading || "heading" ,
           featureImage: featureImage || "featureImage" , 
           description : discription || "discription" ,
           articleBody : articalBody || "articalBody", 
          },
          doctor :doctorVal || "ahsan",
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Post creation failed.");
    } finally {
      setLoading(false);
    }
  };
  const handleFqaChange = (index, field, value) => {
    const updatedFqa = [...fqa];
    updatedFqa[index][field] = value;
    setFqa(updatedFqa);
  };
  const removeFqa = (index) => {
    const updatedFqa = fqa.filter((_, i) => i !== index);
    setFqa(updatedFqa);
  };
  const addFqa = () => setFqa([...fqa, { question: "", answer: "" }]);

  const toggleFullscreen = () => setFullscreen(!fullscreen);
  const togglePreview = () => setShowPreview(!showPreview);

  if (fetchingLoader) return <Loader />;

  if (unauthorized) {
    return (
      <div className={styles.unauthorizedContainer}>
        <p className={styles.unauthorizedMessage}>Unauthorized access</p>
        <button onClick={() => window.history.back()} className={styles.backButton}>
          Go Back
        </button>
      </div>
    );
  }

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['blockquote', 'code-block'],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['clean'],
      ],
      handlers: {
        // video: () => {
        //   const url = prompt('Enter video URL');
        //   if (url) {
        //     const range = this.quill.getSelection();
        //     this.quill.insertEmbed(range.index, 'video', url);
        //   }
        // }
      }
    }
  };

  return (
    <div className={styles.container}>
           <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className={styles.fileInput}/> : {imageUpload}
        <input
        type="text"
        placeholder="Image Alt"
        className={styles.input}
        onChange={(e) => setImgAlt(e.target.value)}/>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}/>
      <select className={styles.select} value={categories[0].title} onChange={(e) => setCatSlug (e.target.value)}>
        {categories.map((item, index) => (
         <option key={index} value={item.slug}>

            {item.title}
          </option>
        ))}
      </select>
      <select   className={styles.select} value={categories[0].id} onChange={(e) => setDoctorVal(e.target.value)}>
        {varifyDoctor.map((item, index) => (
         <option key={index} value={item.id}>
            {item.name + " " + item.specialist + " "  + " (" +item.experience+")"}
          </option>
        ))}
      </select>
{/* ===========metadata starts=============== */}
<hr/>
         <h3>MetaData Markup</h3>    
     <input
        type="text"
        placeholder="Meta Title"
        className={styles.input}
        onChange={(e) => setMetaTitle(e.target.value)}/>
      <input
        type="text"
        placeholder="Meta Disc"
        className={styles.input}
        onChange={(e) => setMetaDisc(e.target.value)}/>
      <input
        type="text"
        placeholder="Meta Keywords (comma separated)"
        className={styles.input}
        onChange={(e) => setMetaKeywords(e.target.value)}/>
      <select className={styles.select} onChange={(e) => setMetaAuthor(e.target.value)}>
        {author.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select className={styles.select}  onChange={(e) => setMetaRobots(e.target.value)}>
        <option value="index, follow" selected >index, follow</option>
        <option value="noindex, nofollow">noindex, nofollow</option>
      </select>

 
{/* ===========blog schema =============== */}
     <hr/>
     <h3>Blog schema Markup</h3>
      <input
        type="text"
        placeholder="headline"
        className={styles.input}
        onChange={(e) => setHeading(e.target.value)}/>
      <input
        type="text"
        placeholder="Discription"
        className={styles.input}
        onChange={(e) => setDiscription(e.target.value)}/>
      <input
        type="text"
        placeholder="Article Body"
        className={styles.input}
        onChange={(e) => setArticalBody(e.target.value)}/>
        <input
        type="text"
        placeholder="Feature Image Url"
        className={styles.input}
        onChange={(e) => setFeatureImage(e.target.value)}/>

{/* ===========FQA schema=============== */}
<hr/>
<h3>FQA schema Markup</h3>
        {fqa.map((item, index) => (
      <div key={index}>
        <input
          type="text"
          placeholder={`Question ${index + 1}`}
          className={styles.input}
          value={item.question}
          onChange={(e) => handleFqaChange(index, "question", e.target.value)}
        />
        <input
          type="text"
          placeholder={`Answer ${index + 1}`}
          className={styles.input}
          value={item.answer}
          onChange={(e) => handleFqaChange(index, "answer", e.target.value)}
        />
         <button type="button" onClick={() => removeFqa(index)} className={styles.removeFqaButton}>Remove FQA</button>
      </div>
    ))}
    <button type="button" onClick={addFqa}>Add FQA</button>
      
{/* ===========FQA schema ends=============== */}
 
      
 {media && (
        <div className={styles.previewContainer}>
          <img 
            src={media} 
            alt="Preview" 
            className={styles.previewImage} 
            width={50}  
            height={50} />
        </div>
      )}

      <div className={fullscreen ? styles.fullscreenEditor : styles.editor}>
        <div className={styles.buttonContainer}>
          <button className={styles.fullscreenToggle} onClick={toggleFullscreen}>
            {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
          
        </div>

        {/* Scrollable editor */}
        <ReactScroller style={{ height: "100%", width: "100%" }}>
          <ReactQuill
            className={styles.textArea}
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            placeholder="Tell your story..."/>
        </ReactScroller>
      </div>
 
      <div className={styles.buttonContainer}>
      <button className={styles.previewToggle} onClick={togglePreview}>
            {showPreview ? "Hide Preview" : "Preview"}
          </button>
        <button className={styles.publish} onClick={handleSubmit} disabled={loading}>
          {loading ? ( "loading...." ) : ( "Publish")}
        </button>
      </div>


      {showPreview && (
        <div className={styles.postPreview}>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: value }} />
         </div>
      )}
      {showPreview && (
            <textarea className={styles.textAreaPreview} type="text"  value={value}   onChange={(e) => setValue(e.target.value)}   />
       )}

    </div>
  );
};

export default WritePage;
