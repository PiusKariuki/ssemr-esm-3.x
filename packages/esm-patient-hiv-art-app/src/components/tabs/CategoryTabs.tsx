import React, { useContext } from "react";
import styles from "./index.scss";
import { DashboardContext } from "../../context/DashboardContext";

const CategoryTabs = () => {
  const { setCategoryFilter, categoryFilter } = useContext(DashboardContext);

  const categories = [
    {
      name: "All clients",
      value: "",
    },
    {
      name: "Pregnant and Breastfeeding",
      value: "PREGNANT_BREASTFEEDING",
    },
    {
      name: "Children and adolescents",
      value: "CHILDREN_ADOLESCENTS",
    },
  ];
  return (
    <div className={styles.tabs}>
      {categories.map((cat) => (
        <button
          onClick={() => setCategoryFilter(cat.value)}
          className={
            categoryFilter === cat.value ? styles.activeTab : styles.tab
          }
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
