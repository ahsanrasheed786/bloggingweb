"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import ReactQuill's styles
import style from './editPost.module.css';

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:3000/api/posts');
      const data = await res.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setEditPost(post);
    setEditData({ ...post });
    setValue(post.desc); // Set the current post description in the editor
    setSelectedImage(post.img);
  };

  const handleDelete = async (slug) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      await fetch(`http://localhost:3000/api/posts/${slug}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter(post => post.slug !== slug));
    }
  };

  const handleUpdate = async () => {
    setLoading(true); // Start loading
    const { id, createdAt, ...updateData } = editData;
    updateData.desc = value; // Update the description with the ReactQuill content

    try {
      let res;

      if (selectedImage !== editPost.img) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('data', JSON.stringify(updateData));

        res = await fetch(`http://localhost:3000/api/posts/${editData.slug}`, {
          method: 'PATCH',
          body: formData,
        });
      } else {
        res = await fetch(`http://localhost:3000/api/posts/${editData.slug}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        });
      }

      if (res.ok) {
        const updatedPost = await res.json();
        setPosts(posts.map(post => (post.slug === updatedPost.slug ? updatedPost : post)));
        setEditPost(null); // Close the modal
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setEditData({ ...editData, img: URL.createObjectURL(file) });
  };

  return (
    <section className={style.section}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th className={style.th}>Serial No</th>
            <th className={style.th}>Title</th>
            <th className={style.th}>Description</th>
            <th className={style.willhide}>Meta Title</th>
            <th className={style.willhide}>Meta Keywords</th>
            <th className={style.willhide}>Meta Author</th>
            <th className={style.willhide}>Meta Robots</th>
            <th className={style.th}>Image</th>
            <th className={style.willhide}>Views</th>
            <th className={style.willhide}>CreatedAt</th>
            <th className={style.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.slug}>
              <td className={style.th}>{index + 1}</td>
              <td className={style.th}>{post.title}</td>
              <td className={style.th} dangerouslySetInnerHTML={{ __html: post.desc.substring(0, 22) }}></td>
              <td className={style.willhide}>{post.metaTitle}</td>
              <td className={style.willhide}>{post.metaKeywords}</td>
              <td className={style.willhide}>{post.metaAuthor}</td>
              <td className={style.willhide}>{post.metaRobots}</td>
              <td className={style.th}>
                {post.img ? (
                  <Image src={post.img} alt="Post Image" width={70} height={70} 
                    style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                  />
                ) : (
                  'No image'
                )}
              </td>
              <td className={style.willhide}>{post.views || 0}</td>
              <td className={style.willhide}>{post.createdAt || 0}</td>
              <td className={style.th}>
                <button
                  style={{ background: 'blue', color: 'white', borderRadius: '10px', margin: '5px', padding: '3px', cursor: 'pointer' }}
                  onClick={() => handleEdit(post)}> Edit</button>
                <button
                  style={{ background: 'red', color: 'white', padding: '3px', borderRadius: '10px', cursor: 'pointer', margin: '5px' }}
                  onClick={() => handleDelete(post.slug)}>  Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editPost && (
        <div className={style.modal}>
          <h2>Edit Post</h2>
          <input
            type="text"
            value={editData.title}
            className={style.editinputs}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            placeholder="Title"/>
          <ReactQuill
            className={style.reactQuill}
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="Description"/>
          <input
            type="text"
            value={editData.metaTitle}
            onChange={(e) => setEditData({ ...editData, metaTitle: e.target.value })}
            placeholder="Meta Title"
            className={style.editinputs}/>
          <input
            type="text"
            value={editData.metaKeywords}
            onChange={(e) => setEditData({ ...editData, metaKeywords: e.target.value })}
            placeholder="Meta Keywords"
            className={style.editinputs}/>
          <input
            type="text"
            value={editData.metaAuthor}
            onChange={(e) => setEditData({ ...editData, metaAuthor: e.target.value })}
            placeholder="Meta Author"
            className={style.editinputs}/>
          <select
            value={editData.metaRobots}
            onChange={(e) => setEditData({ ...editData, metaRobots: e.target.value })}
            className={style.editinputs}>
            <option value="index, follow">Index, Follow</option>
            <option value="noindex, nofollow">NoIndex, NoFollow</option>
            <option value="index, nofollow">Index, NoFollow</option>
            <option value="noindex, follow">NoIndex, Follow</option>

          </select>
          <input
            type="file"
            className={style.inputFile}
            onChange={handleImageChange}/>
          {selectedImage && (
            <Image 
              className={style.editDataImage}
              src={selectedImage}
              alt="Selected Image"
              width={100}
              height={60}/>
          )}
          <button
            className={style.greenbtn}
            onClick={handleUpdate}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Updating...' : 'Update'} {/* Show loading text */}
          </button>
          <button className={style.garybtn} onClick={() => setEditPost(null)}>Cancel</button>
        </div>
      )}

      {editPost && <div className={style.popUp} onClick={() => setEditPost(null)} />}
    </section>
  );
};

export default AdminPosts;
