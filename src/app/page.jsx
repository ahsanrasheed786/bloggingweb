
import Link from "next/link";
import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

export default function Home({ searchParams }) {
  
  let data = null;

  fetch("http://localhost:3000/api/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      data = result; // Store the fetched data
    })
    .catch((error) => {
      console.error("Failed to fetch categories:", error);
    });
// console.log(data)

  

  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList   />
      <div className={styles.content}>
        <CardList page={page} />
        {/* <Menu /> */}
      </div>
    </div>
  );
}
