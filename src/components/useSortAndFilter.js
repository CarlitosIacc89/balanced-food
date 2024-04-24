import { useState } from "react";

const useSortAndFilter = (items) => {
  const [sortBy, setSortBy] = useState("");
  const [filter, setFilter] = useState("");

  const sortProducts = () => {
    switch (sortBy) {
      case "Alphabetical":
        return [...items].sort((a, b) => a.title.localeCompare(b.title));
      case "Price":
        return [...items].sort((a, b) => b.publicPrice - a.publicPrice);
      case "Stock":
        return [...items].sort((a, b) => b.quantity - a.quantity);
      case "Discount":
        return [...items].sort((a, b) => b.discount - a.discount);
      default:
        return items;
    }
  };

  const filterItems = (products) => {
    switch (filter) {
      case "super premium":
      case "premium":
      case "intermediate":
      case "economic":
        return products.filter((item) => item.quality === filter);
      default:
        return products;
    }
  };

  const sortedItems = sortProducts();
  const filteredItems = filterItems(sortedItems);

  return { sortBy, setSortBy, filter, setFilter, sortedItems, filteredItems };
};

export default useSortAndFilter;
