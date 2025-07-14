import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    axios.get("http://localhost:3001/products")
      .then(res => setProducts(res.data));
  }, []);

  const filterProducts = () => {
    let filtered = [...products];

    if (search.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(p => p.category === category);
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  return (
    <div>
      <h2>Products</h2>

     
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setCategory(e.target.value)}>
        <option>All</option>
        <option>Sports</option>
        <option>Formal</option>
        <option>Casual</option>
      </select>

      <select onChange={(e) => setSortOrder(e.target.value)}>
        <option value="default">Sort</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

    
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginTop: "20px" }}>
        {filterProducts().map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default Products;
