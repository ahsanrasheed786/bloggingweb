"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
// import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import ReactQuill's styles
import style from './editPost.module.css';
import { useSession } from "next-auth/react";
import Loader from '@/components/loader/Loader';
import dynamic from "next/dynamic";
const Ads = dynamic(() => import ('@/components/ads/Ads'), { ssr: false });
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AdminPosts = () => { 
  const [posts, setPosts] = useState([]);
  const [singlePost,setSinglePost]=useState([]);
  const [editPost, setEditPost] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [value, setValue] = useState(""); // For ReactQuill editor
  const [htmlContent, setHtmlContent] = useState(""); // For HTML preview
  const [loading, setLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [adminArray, setAdminArray] = useState([]);
  const [fetchingLoader, setFetchingLoader] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [htmlpreview, setHtmlpreview] = useState(false);
  const [preview, setPreview] = useState(false);
  const [categories,setCategories]=useState([])
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(''); 
   

  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [varifyDoctor, setVarifyDoctor] = useState([]);
  

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('/api/ads');  
        const data = await response.json();
        setAds(data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    fetchVarifyDoctor();
  }, []);

  const fetchVarifyDoctor = async () => {
    try {
      const res = await fetch( `/api/author `);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setVarifyDoctor(data);
    } catch (error) {
      console.error('Error fetching varify authors:', error);
    }
  };

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
    const fetchrelated = async () => {
      const res = await fetch(`${process.env.WEBSIT_URL}/api/related`, {
        // cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed");
      }
      return res.json();}
      fetchrelated()
  },[ editData?.related])
  
  // useEffect(() => {
  //   async function fetchAccessData() {
  //     try {
  //       const response = await fetch('/api/access/');
  //       if (response.ok) {
  //         const data = await response.json();
  //         setAdminArray(data.filter((item) => item.isAdmin === true));
  //       } else {
  //         console.error('Failed to fetch access data.');
  //       }
  //     } catch (err) {
  //       console.error('An error occurred while fetching access data.');
  //     } finally {
  //       setFetching(false);
  //     }
  //   }
  //   fetchAccessData();
  // }, []);

  // useEffect(() => {
  //   if (!fetching) {
  //     if (!adminArray.some((item) => item.email === userEmail)) {
  //       setUnauthorized(true);
  //       setFetchingLoader(false);
  //     } else {
  //       setFetchingLoader(false);
  //     }
  //   }
  // }, [fetching, adminArray, userEmail]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data.posts);
        if (!res.ok) { 
          setUnauthorized(true); 
        }
      } catch (err) {
        console.error('An error occurred while fetching access data:', err);
      } finally {
        setFetching(false);
                setFetchingLoader(false); }  };
  
    fetchPosts();
  }, []);
  
  
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(',', '');
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setEditData({ ...post });
    setValue(post.desc);  
    setHtmlContent(post.desc); 
    setSelectedImage(post.img);
  };
  // const handleEdit =async (slug) => {
  //   const res = await fetch(`/api/posts/${slug}`);
  //     const data = await res.json();
  //     console.log(data)
  //   setEditPost(data);
  //   setEditData({ ...data });
  //   setValue(data.desc);  
  //   setHtmlContent(data.desc); 
  //   setSelectedImage(data.img);
  // };





// Function to handle changes to related blogs

  const handleDelete = async (slug) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter(post => post.slug !== slug));
    }
  };

  const handelhtmlPreview = () => {
    setHtmlpreview(!htmlpreview);
  };

  const handelPreview = () => {
    setPreview(!preview);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const { id, createdAt, ...updateData } = editData;
    updateData.desc = value;

    try {
      let res;

      if (selectedImage !== editPost.img) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('data', JSON.stringify(updateData));

        res = await fetch(`/api/posts/${editData.slug}`, {
          method: 'PATCH',
          body: formData,
        });
 

      } else {
        res = await fetch(`/api/posts/${editData.slug}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        });
      }

      if (res.ok) {
        const updatedPost = await res.json();
        setPosts(posts.map(post => (post.slug === updatedPost.slug ? updatedPost : post)));
        setEditPost(null);
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const handleFqaChange = (index, field, value) => {
    const updatedFqa = [...editData.fqa]; 
    updatedFqa[index][field] = value;  
     setEditData({
      ...editData,
      fqa: updatedFqa,
    });
  };
   const addFqa = () => {
    setEditData({
      ...editData,
      fqa: [...editData.fqa, { question: "", answer: "" }],
    });
  };
 
  const handleFetchRelated = async (slug, index) => {
    try {
      const res = await fetch(`/api/related/${slug}`);
      const data = await res.json();
  
      if (res.ok && data) {
        const updatedRelated = [...editData.related];
        updatedRelated[index] = {
          slug: slug, // Ensure slug is always set
          title: data?.post?.title || '',
          img: data?.post?.img || '',
          createdAt: data?.post?.createdAt || '',
          author: data?.post?.metaAuthor || '',
          catSlug: data?.category?.slug || '',
          catTitle: data?.category?.title || '',
          catColor: data?.category?.color || '',
        };
        setEditData({
          ...editData,
          related: updatedRelated,
        });
      } else {
        console.error('No data found for the provided slug');
      }
    } catch (error) {
      console.error("Failed to fetch related blog data:", error);
    }
  };
  
  const handleRelatedChange = (index, field, value) => {
    const updatedRelated = [...editData.related]; 
    updatedRelated[index][field] = value;  
     setEditData({
      ...editData,
      related: updatedRelated,
    });
  };
   const addRelated = () => {
    setEditData({
      ...editData,
      related: [...editData.related, { slug:'' ,title:'',img:'',createdAt:'',author:'',catSlug:'',catTitle:'',catColor:'' }],
    });
  };
   const removeFqa = (index) => {
     const updatedFqa = editData.fqa.filter((_, i) => i !== index);
    setEditData({ ...editData, fqa: updatedFqa });
  };
  const removeRelatedBlog = (index) => { 
    const updatedRelated = editData.related.filter((_, i) => i !== index);
    setEditData({ ...editData, related: updatedRelated });
  };
    

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setEditData({ ...editData, img: URL.createObjectURL(file) });
  };

  const handleHtmlContentChange = (e) => {
    setHtmlContent(e.target.value);
    setValue(e.target.value);
  };

  if (fetchingLoader) {
    return <Loader />;
  }

  if (unauthorized) {
    return (
      <div className={style.unauthorizedContainer}>
        <p className={style.unauthorizedMessage}>Unauthorized access</p>
        <button onClick={() => window.history.back()} className={style.backButton}>
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
        ['bold', 'italic', 'underline', 'strike'], // Added 'strike' for strikethrough text
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'], // Added 'video' for embedding videos
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['blockquote', 'code-block'], // Added 'blockquote' and 'code-block' for blockquote and code block formatting
        [{ 'indent': '-1' }, { 'indent': '+1' }], // Added indent and outdent options
        ['clean'], 
      ],
    }
  };
   return (
    <section className={style.section}>
      <div className={style.cardsContainer}>
        {posts.map((post) => (
          <div key={post.slug} className={style.card}>
            <h3 className={style.cardTitle}>{post.title}</h3>
            {post.img && (
              // <Image
              //   src={post.img}
              //   alt="Post Image"
              //   width={100}
              //   height={60}
              //   className={style.cardImage}
              // />
              <img
                src={post.img}
                alt="Post Image"
                width={100}
                height={60}
                className={style.cardImage}
              />
            )}
            <p className={style.cardDate}>Created At: {formatDate(post.createdAt)}</p>
            <p className={style.cardAuthor}>Author: {post.metaAuthor}</p>
            <div className={style.cardActions}>
              {/* <button onClick={() => handleEdit(post.slug)} className={style.editButton}> */}
              <button onClick={() => handleEdit(post)} className={style.editButton}>
                Edit
              </button>
              <button onClick={() => handleDelete(post.slug)} className={style.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editPost && (
        <div className={style.popUp} onClick={() => setEditPost(null)} />
      )}

      {editPost && (
        <div className={style.modal}>
          <h2>Edit Post</h2>
          <input
            type="text"
            value={editData.title}
            className={style.editinputs}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            placeholder="Title"/>
            
          <div className={style.editorContainer}>
            <ReactQuill
              className={style.reactQuill}
              theme="snow"
              value={value}
              modules={modules}
              onChange={(content) => {
                setValue(content);
                setHtmlContent(content);  
              }}
              placeholder="Description"/>
          </div>
          <h4>Created At</h4>
          <input
            type="text"
            value={editData.createdAt}
            onChange={(e) => setEditData({ ...editData, createdAt: e.target.value })}
            placeholder="createdAt"
            className={style.editinputs}/>
          <h4>Updated At</h4>
          <input
            type="text"
            value={editData.updatedAt}
            onChange={(e) => setEditData({ ...editData, updatedAt: e.target.value })}
            placeholder="updatedAt"
            className={style.editinputs}/>
          <hr />
          <h4>Slug</h4>
          <input
            type="text"
            value={editData.slug}
            onChange={(e) => setEditData({ ...editData, slug: e.target.value })}
            placeholder="slug"
            className={style.editinputs}/>
          <hr />
          <h4>Categories</h4>
          <select className={style.select} onChange={(e) => setCatSlug (e.target.value)}>
        {categories.map((item, index) => (
         <option key={index} value={item.slug}>
            {item.title}
          </option>
        ))}
      </select>
          <h4>Main Image</h4>
          <input
            type="text"
            value={editData.img}
            onChange={(e) => setEditData({ ...editData, img: e.target.value })}
            placeholder="Main Image"
            className={style.editinputs}/>
            <hr />
          <h4>Main Image Alt</h4>
          <input
            type="text"
            value={editData.imgAlt}
            onChange={(e) => setEditData({ ...editData, imgAlt: e.target.value })}
            placeholder="metaAuthor"
            className={style.editinputs}/> 
          <hr />
          {/* <h4>Likes</h4>
          <input
            type="text"
            value={editData.totalLikes}
            onChange={(e) => setEditData({ ...editData, totalLikes: e.target.value })}
            placeholder="totalLikes"
            className={style.editinputs}/>
              <hr /> */}
          {/* <h4>Views</h4>
          <input
            type="text"
            value={editData.views}
            onChange={(e) => setEditData({ ...editData, views: e.target.value })}
            placeholder="totalViews"
            className={style.editinputs}/>
          <hr /> */}
          {/* <h4>Rating</h4>
          Total & Average
          <input
            type="text"
            value={editData?.totalRating?.count}
            // onChange={(e) => setEditData({ ...editData, count: e.target.value })}
            // onChange={(e) => setEditData({ ...editData {...editData.totalRating ,count: e.target.value }})}
            onChange={(e) => setEditData({
              ...editData,
              totalRating: { 
                ...editData.totalRating, 
                count: e.target.value 
              }
            })}
            
            placeholder="Total"
            className={style.editinputs}/>
          <input
            type="text"
            value={editData.totalRating?.average}
            onChange={(e) => setEditData({ ...editData, average: e.target.value })}
            placeholder="Avarage"
            className={style.editinputs}/> */}
          <hr />
          <h3>Blog Varified By</h3>
          <select
           className={style.select}
           value={editData.doctor}  
           onChange={(e) => setEditData({ ...editData, doctor: e.target.value })}>
           {varifyDoctor.map((item, index) => (
           <option key={index} value={item.id}    >
          {`${item.name} ${item.specialist} (${item.experience})`}
            </option>
           ))}
          </select>
          <hr />
          <h3>MetaData</h3>
          <input
            type="text"
            value={editData.metaTitle}
            onChange={(e) => setEditData({ ...editData, metaTitle: e.target.value })}
            placeholder="Meta Title"
            className={style.editinputs}/>
            <input
            type="text"
            value={editData.metaAuthor}
            onChange={(e) => setEditData({ ...editData, metaAuthor: e.target.value })}
            placeholder="metaAuthor"
            className={style.editinputs}/>
          <input
            type="text"
            value={editData.metaKeywords}
            onChange={(e) => setEditData({ ...editData, metaKeywords: e.target.value })}
            placeholder="Meta Keywords"
            className={style.editinputs}/>
          <input
            type="text"
            value={editData.metaDisc}
            onChange={(e) => setEditData({ ...editData, metaDisc: e.target.value })}
            placeholder="Meta Description"
            className={style.editinputs}/>
         <hr />
          <h3>Blog Schema Markup</h3>
          <input
            type="text"
            placeholder="Heading"
            className={style.editinputs}
            value={editData.artical.heading}
            onChange={(e) =>
              setEditData({
                ...editData,
                artical: { ...editData.artical, heading: e.target.value }, 
              })}  />
          <input
            type="text"
            placeholder="Description"
            className={style.editinputs}
            value={editData.artical.discription}
            onChange={(e) =>
              setEditData({
                ...editData,
                artical: { ...editData.artical, discription: e.target.value }, 
              })}  />
          <input
            type="text"
            placeholder="Article Body"
            className={style.editinputs}
            value={editData.artical.articalBody}
            onChange={(e) =>
              setEditData({
                ...editData,
                artical: { ...editData.artical, articalBody: e.target.value }, 
              })}  />
          <input
            type="text"
            placeholder="Feature Image URL"
            className={style.editinputs}
            value={editData.artical.featureImage}
                 onChange={(e) =>
                  setEditData({
                    ...editData,
                    artical: { ...editData.artical, featureImage: e.target.value }, 
                  })}    />

          {/* FQA Schema Markup */}
          <hr />
          <h3>FQA Schema Markup</h3>
          {editData.fqa.map((item, index) => (
            <div key={index} className={style.fqaItem}>
              <input
                type="text"
                placeholder={`Question ${index + 1}`}
                className={style.editinputs}
                value={item.question}
                onChange={(e) => handleFqaChange(index, "question", e.target.value)}  />
              <input
                type="text"
                placeholder={`Answer ${index + 1}`}
                className={style.editinputs}
                value={item.answer}
                onChange={(e) => handleFqaChange(index, "answer", e.target.value)}/>
              <button type="button" onClick={() => removeFqa(index)} className={style.deleteButton}>
                Remove FQA </button>            
               </div>
            
          ))}
          <button type="button" onClick={addFqa} className={style.addFqaButton}>
            Add FQA
          </button>
{/* ===========related blogs======= */}
 
         {editData.related.map((item, index) => (
            <div key={index} className={style.fqaItem}>
              <input
                type="text"
                placeholder={`Slug ${index + 1}`}
                className={style.editinputs}
                value={item.slug}
                 onChange={(e) => {
                  handleRelatedChange(index, "slug", e.target.value);
                  handleFetchRelated(e.target.value, index);  
                }}
                />
              <input
                type="text"
                placeholder={`title ${index + 1}`}
                className={style.editinputs}
                value={item.title }
                onChange={(e) => handleRelatedChange(index, "title", e.target.value)}/>
                <input
                type="text"
                placeholder={`image ${index + 1}`}
                className={style.editinputs}
                value={item.img }
                onChange={(e) => handleRelatedChange(index, "img", e.target.value)}/>
                <input
                type="text"
                placeholder={`createdAt ${index + 1}`}
                className={style.editinputs}
                value={item.createdAt}
                onChange={(e) => handleRelatedChange(index, "createdAt", e.target.value)}/><input
                type="text"
                placeholder={`author ${index + 1}`}
                className={style.editinputs}
                value={item.author}
                onChange={(e) => handleRelatedChange(index, "author", e.target.value)}/><input
                type="text"
                placeholder={`catSlug ${index + 1}`}
                className={style.editinputs}
                value={item.catSlug}
                onChange={(e) => handleRelatedChange(index, "catSlug", e.target.value)}/>
                <input
                type="text"
                placeholder={`catTitle ${index + 1}`}
                className={style.editinputs}
                value={item.catTitle}
                onChange={(e) => handleRelatedChange(index, "catTitle", e.target.value)}/>
                <input
                type="color"
                placeholder={`catColor ${index + 1}`}
                 value={item.catColor}
                onChange={(e) => handleRelatedChange(index, "catColor", e.target.value)}/><br/>
                {item?.img &&  <img src={item.img} width={150}/> }<br/>
                <button type="button" onClick={() => removeRelatedBlog(index)} className={style.deleteButton}>
                  Remove Related Blog
                 </button>            
                </div>
          ))}
          <button type="button" onClick={addRelated} className={style.addFqaButton}>
            Add Related Blog
          </button> 

          <h3>Allow For Ai</h3>
         <input
        type="text"
        value={editData.aiQuestion}
        placeholder="write allow keywords seperated by comma"
        className={style.editinputs}
        onChange={(e) => setEditData({...editData,aiQuestion:e.target.value})}/>
        
        <hr />
          <h4> Select Ads</h4>
      <label htmlFor="ads">Select an Ad:</label>
       {/* <select id="ads" className={style.select} value={editData.ad} onChange={(e)=>({...editData,ad:e.target.value})}>
        <option value="">-- Select an Ad --</option> 
        {ads.map((ad) => (
          <option key={ad.id} value={ad.id}>
            {ad.name}
          </option>
        ))}
      </select> */}
            <select id="ads" className={style.select} value={editData.ad} onChange={(e) => setEditData({...editData, ad: e.target.value})}>
             <option value="">-- Select an Ad --</option> 
              {ads.map((ad) => (
             <option key={ad.id} value={ad.id}>
              {ad.name}
              </option>
           ))}
           </select>
                    { editData?.ad &&
                     <div><h2>Selected Ad</h2>
                         <Ads adId={editData.ad} />
                      </div>
                      } 
          <input
            type="file"
            onChange={handleImageChange}
            className={style.fileInput}/>
        
          <div className={style.modalActions}>
            <button onClick={handelhtmlPreview} style={{backgroundColor: 'blue'}} className={style.greenbtn}>
              Html Preview
            </button>
            <button onClick={handelPreview} style={{backgroundColor: 'blue'}} className={style.greenbtn}>
              Preview
            </button>
            <button onClick={handleUpdate} className={style.greenbtn}>
              Save
            </button>
            <button onClick={() => setEditPost(null)} className={style.closebtn}>
              Close
            </button>
            {htmlpreview &&
            <div className={style.previewContainer}>
              <h3>HTML Preview</h3>
              <textarea
                className={style.previewTextarea}
                value={htmlContent}
                onChange={handleHtmlContentChange}
              />
            </div>}
            {preview && <div className={style.previewContainer}>
              <h3>Preview</h3>
              <div
                className={style.previewTextarea}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>}
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminPosts;