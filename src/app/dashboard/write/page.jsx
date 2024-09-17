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
const Ads = dynamic(() => import ('@/components/ads/Ads'), { ssr: false });
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
  // =========related posts =======
  const [related, setRelated] = useState([{ slug: "", title: "" ,img:"",createdAt:'',author:'',  catSlug:'' ,catTitle:'', catColor:'' }]);

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
  const [aiQuestion, setAiQuestion] = useState('');
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState('');
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

  // useEffect(() => {
  //   const fetchrelated = async () => {
  //     const res = await fetch(`${process.env.WEBSIT_URL}/api/related`, {
  //       // cache: "no-store",
  //     });
  //     if (!res.ok) {
  //       throw new Error("Failed");
  //     }
  //     return res.json();}
  //     fetchrelated()
  // },[related])

  useEffect(() => {
    fetchVarifyDoctor();
  }, []);

// fatching ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('/api/ads'); // Assuming your API route returns all ads
        const data = await response.json();
        setAds(data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
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
           related  ,
           aiQuestion,
           ad : selectedAd || "ads",
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
  // const handleRelatedChange = (index, field, value) => {
  //   const updatedRelated = [...related];
  //   updatedRelated[index][field] = value;
  //   setRelated(updatedRelated);
  // };
  const handleFetchRelated = async (slug, index) => {
    // console.log(slug, index=1);
    try {
      const res = await fetch(`/api/related/${slug}`);
      const data = await res.json();
      const updatedRelated = [...related];
      updatedRelated[index] = {
        ...updatedRelated[index],
        title: data?.post?.title,
        img: data?.post?.img,
        createdAt: data?.post?.createdAt,
        author: data?.post?.metaAuthor,
        catSlug: data?.category?.slug,
        catTitle: data?.category?.title,
        catColor: data?.category?.color,
      };
      setRelated(updatedRelated);
    } catch (error) {
      console.error("Failed to fetch related blog data:", error);
    }
  };
  
  const handleRelatedChange = (index, field, value) => {
    const updatedRelated = [...related];
    console.log(updatedRelated);
    console.log(related);
    updatedRelated[index][field] = value;
    setRelated(updatedRelated);
  };
  const removeRelated = (index) => {
    const updatedRelated = [...related];   
    updatedRelated.splice(index, 1);  
    setRelated(updatedRelated);   
  };
  
  
  // const removeRelated = (index) => {
  //   const updatedRelated = related.filter((_, i) => i !== index);
  //   setFqa(updatedRelated);
  // };
  const addRelated = () => setRelated([...related, { slug: "", title: "" ,img:"",createdAt:'',author:'' ,  catSlug:'' ,catTitle:'', catColor:'' }]);
  const toggleFullscreen = () => setFullscreen(!fullscreen);
  const togglePreview = () => setShowPreview(!showPreview);

  // const handleFetchRelated=async(slug)=>{
  //   // console.log("console log slug in handle fetch"+slug);
  //   // api/related/vitimans
  //  try {
  //   const res = await fetch(`/api/related/${slug}`);
  //   const data = await res.json();
  //   console.log(data)
  //   setRelated([...related, {  
  //      title:data?.post?.title ,
  //      img:data?.post?.img,
  //      catSlug:data?.category?.slug,
  //      catTitle:data?.category?.title,
  //      catColor:data?.category?.color,
  //      createdAt:data?.post?.createdAt,
  //      author:data?.post?.metaAuthor}])
  //   // if (Array.isArray(data)) {
  //   //   setRelated(data);
  //   // }
  // } catch (error) {
  //   console.error("Failed to fetch categories:", error);
  // }
  //  }
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
         [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }],
         [{ 'size': ['small', false, 'large', 'huge',1] }],
         [{ 'list': 'ordered' },{ 'list': 'bullet' },{ 'list': 'check' }, ],
         ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
         [{ 'script': 'sub' }, { 'script': 'super' }],
         [{ 'color': [] }, { 'background': [] }],
         [{ 'align': [] }],
         ['link', 'image', 'video'],
         [{ 'indent': '-1' }, { 'indent': '+1' }],
           ['clean'],
      ],
    }, 
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
    <button type="button" className={styles.addFqaButton} onClick={addFqa}>Add FQA</button>
      
{/* ===========FQA schema ends=============== */}
{/* ===========Related=============== */}
<hr/>
          

{related.map((item, index) => (
  <div key={index}>
    <input
      type="text"
      placeholder={`slug${index + 1}`}
      className={styles.input}
      value={item.slug}
      onChange={(e) => {
        handleRelatedChange(index, "slug", e.target.value);
        handleFetchRelated(e.target.value, index);  
      }}/>
    <input
      type="text"
      placeholder={`title ${index + 1}`}
      className={styles.input}
      value={item.title}
      onChange={(e) => handleRelatedChange(index, "title", e.target.value)}/>
    <input
      type="text"
      placeholder={`img Url ${index + 1}`}
      className={styles.input}
      value={item.img}
      onChange={(e) => handleRelatedChange(index, "img", e.target.value)}/>
    <input
      type="text"
      placeholder={`createdAt: ${index + 1}`}
      className={styles.input}
      value={item.createdAt}
      onChange={(e) => handleRelatedChange(index, "createdAt", e.target.value)}/>   
    <input
      type="text"
      placeholder={`author: ${index + 1}`}
      className={styles.input}
      value={item.author}
      onChange={(e) => handleRelatedChange(index, "author", e.target.value)}/>
    <input
      type="text"
      placeholder={`catSlug: ${index + 1}`}
      className={styles.input}
      value={item.catSlug}
      onChange={(e) => handleRelatedChange(index, "catSlug", e.target.value)}/>
    <input
    type="text"
    placeholder={`catTitle: ${index + 1}`}
    className={styles.input}
    value={item.catTitle}
    onChange={(e) => handleRelatedChange(index, "catTitle", e.target.value)} />
  <input
  type="color"
  placeholder={`catColor: ${index + 1}`}
   value={item.catColor}
  onChange={(e) => handleRelatedChange(index, "catColor", e.target.value)}/><br/>
    {item.img && <img src={item.img} width={150} alt="image not found" />}<br/>
    <button type="button" onClick={() => removeRelated(index)} className={styles.removeFqaButton}>Remove Related Blog</button>
  </div>
))}
    <button type="button" className={styles.addFqaButton} onClick={addRelated}>Add Related Blog</button>  

      
{/* ===========Related ends=============== */}


  <h3>Allow For Ai</h3>
        <input
        type="text"
        placeholder="write allow keywords seperated by comma"
        className={styles.input}
        onChange={(e) => setAiQuestion(e.target.value)}/>
      
<hr/>
     <div>
      <label htmlFor="ads">Select an Ad:</label>
      <select id="ads" value={selectedAd} onChange={(e) => setSelectedAd(e.target.value)}>
        <option value="">-- Select an Ad --</option> 
        {ads.map((ad) => (
          <option key={ad.id} value={ad.id}>
            {ad.name}
          </option>
        ))}
      </select>

      {/* Display the selected ad information (optional) */}
      {selectedAd && (
        <div>
          <h2>Selected Ad</h2>
          {/* <p>Ad ID: {selectedAd}</p> */}
          <Ads adsId={selectedAd} />

        </div>
        // <Ads id={selectedAd} />
      )}
    </div>




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
