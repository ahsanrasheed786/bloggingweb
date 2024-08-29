import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
// import Image from "next/image";


const getData = async () => {
  const res = await fetch(`${process.env.WEBSIT_URL}/api/categories` , {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const CategoryList = async () => {
  const data = await getData();
   return (

    <div className={styles.container}>
      <h2 className={styles.title}>Popular Categories</h2>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={styles.category}
            key={item._id}
            style={{
              backgroundColor: `${item.color}`,  }}>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
