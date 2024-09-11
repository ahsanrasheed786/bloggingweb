import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const getData = async () => {
  const res = await fetch(`${process.env.WEBSIT_URL}/api/categories`, {
    // cache: "no-store",
    next: { revalidate: 60 },  
    cache: "stale-while-revalidate",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const MenuCategories = async () => {
  const data = await getData();
   
  return (
    <div>
      <div className={styles.categoryList}>
        {data?.map((item, index) => (
          <Link
            key={index}
            aria-label={`View posts in ${item?.title} category`}
            href={`/blog?cat=${item?.slug}`}
            className={`${styles.categoryItem}`}
            style={{ backgroundColor: item?.color }}>
            {item?.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuCategories;
