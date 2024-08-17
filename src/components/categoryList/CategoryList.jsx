import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CategoryList = async (data1) => {
  const data = await getData();
  console.log(data1)
  return (

    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={styles.category}
            key={item._id}
            style={{
              backgroundColor: `${item.img}`,  }}>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
