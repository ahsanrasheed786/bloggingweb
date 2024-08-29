import React from "react";
import styles from "./menu.module.css";
// import Link from "next/link";
// import Image from "next/image";
import MenuPosts from "../menuPosts/MenuPosts";
import MenuCategories from "../menuCategories/MenuCategories";

const fetchpopular = async () => {
  const res = await fetch(`${process.env.WEBSIT_URL}/api/mostpopular`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();}


const Menu = async() => {
const popular=await fetchpopular();
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{"What's hot "}🔥</h2>
      <h2 className={styles.title}>Most Popular</h2>
      <MenuPosts withImage={false} post={popular} />
      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
      {/* <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editors Pick</h1>
      <MenuPosts withImage={false} /> */}
    </div>
  );
};

export default Menu;
