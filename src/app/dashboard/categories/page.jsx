"use client";

import { useEffect, useState } from "react";
import styles from "./categoriesPage.module.css";
import Image from "next/image";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ title: "", slug: "", img: "", categoryDesc: "" });
  const [editCategory, setEditCategory] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all categories from the API
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

  // Fetch the most popular posts by category
  const fetchPopularPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      if (Array.isArray(data)) {
        setPopularPosts(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Failed to fetch popular posts:", error);
    }
  };

  // Fetch categories and popular posts when the component mounts
  useEffect(() => {
    fetchCategories();
    fetchPopularPosts();
  }, []);

  // Handle adding a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (res.status === 201) {
        fetchCategories();
        setNewCategory({ title: "", slug: "", img: "", categoryDesc: "" });
      } else {
        console.error("Failed to add category");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle editing an existing category
  const handleEditCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/categories`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editCategory),
      });

      if (res.status === 200) {
        fetchCategories();
        setEditCategory(null);
        setIsModalOpen(false);
      } else {
        console.error("Failed to edit category");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/categories`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.status === 200) {
        fetchCategories();
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open the modal with the category to edit
  const openEditModal = (category) => {
    setEditCategory(category);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditCategory(null);
  };

  return (
    <div>
      <h1>Categories</h1>

      {/* New Category Form */}
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          className={styles.input}
          placeholder="Category Title"
          value={newCategory.title}
          onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
          required />
        <input
          className={styles.input}
          type="text"
          placeholder="Category Slug"
          value={newCategory.slug}
          onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
          required />
        <input
          // className={styles.input}
          type="color"
          // placeholder="Image URL"
          value={newCategory.img}
          onChange={(e) => setNewCategory({ ...newCategory, img: e.target.value })} />
          ....{newCategory.img}
        <input
          className={styles.input}
          type="text"
          placeholder="Category Description"
          value={newCategory.categoryDesc}
          onChange={(e) => setNewCategory({ ...newCategory, categoryDesc: e.target.value })} />
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>

      {/* Categories List */}
      {categories.length > 0 && <h1>Categories List</h1>}
      <ul className={styles.ul}>
        {categories.map((category) => (
          <li key={category.id} className={styles.cate}>
            <div>
              <h3>{category.title}</h3>
              <p>{category.slug}</p>
              <p>{category.categoryDesc}</p>
              <p>Color:<div style={{ backgroundColor: `${category.img}` ,height: "20px", width: "20px" }}></div></p>
            </div>
            <div>
              <button className={styles.button} onClick={() => openEditModal(category)}>Edit</button>
              <button className={styles.delbutton} onClick={() => handleDeleteCategory(category.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Category Modal */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>X</button>
            <form onSubmit={handleEditCategory}>
              <input
                type="text"
                className={styles.modalInput}
                placeholder="Category Title"
                value={editCategory.title}
                onChange={(e) => setEditCategory({ ...editCategory, title: e.target.value })}
                required />
              <input
                type="text"
                className={styles.modalInput}
                placeholder="Category Slug"
                value={editCategory.slug}
                onChange={(e) => setEditCategory({ ...editCategory, slug: e.target.value })}
                required />
              <input
          type="color"
          // className={styles.modalInput}
                placeholder="Image URL"
                value={editCategory.img}
                onChange={(e) => setEditCategory({ ...editCategory, img: e.target.value })} />
              .....{editCategory.img}
              <input
                type="text"
                className={styles.modalInput}
                placeholder="Category Description"
                value={editCategory.categoryDesc}
                onChange={(e) => setEditCategory({ ...editCategory, categoryDesc: e.target.value })} />
              <button className={styles.modalButton} type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Category"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Popular Posts by Category */}
      {popularPosts.length > 0 && <h2>Most Popular Posts by Category</h2>}
      <ul className={styles.mostpopular}>
        {popularPosts.map((category) => (
          <li className={styles.mostpopularitem} key={category.id}>
            <h3>{category.title}</h3>
            {category.post ? (
              <div className={styles.mostpopularcontent}>
                <Image className={styles.image} src={category.post.img} alt="" width={100} height={100} />
                <h4>{category.post.title}</h4>
                <p dangerouslySetInnerHTML={{ __html: category.post.desc.substring(0, 100) }}></p>
                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Views: {category.post.views}</p>
              </div>
            ) : (
              <p>No posts available.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
