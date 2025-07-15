import axios from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  useEffect(() => {
    axios.get("http://localhost:3001/products").then((res) => {
      const data = Array.isArray(res.data) ? res.data : res.data.products || [];
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/wishlist?userId=${user.id}`).then((res) => {
        setWishlist(res.data);
      });
    }
  }, [user]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (sortOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, sortOrder]);

  const addToCart = useCallback(
    async (product) => {
      if (!user) {
        alert("Please login first!");
        navigate("/login");
        return;
      }

      try {
        const exists = await axios.get(
          `http://localhost:3001/carts?userId=${user.id}&productId=${product.id}`
        );

        if (exists.data.length > 0) {
          alert("Item already in cart!");
          return;
        }

        await axios.post("http://localhost:3001/carts", {
          userId: user.id,
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          qty: 1,
        });

        alert("Added to cart!");
      } catch (err) {
        console.error("Cart Error:", err);
        alert("Something went wrong while adding to cart.");
      }
    },
    [navigate, user]
  );

  const toggleWishlist = useCallback(
    async (product) => {
      if (!user) {
        alert("Please login to use wishlist!");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3001/wishlist?userId=${user.id}&productId=${product.id}`
        );
        const existing = res.data[0];

        if (existing) {
          await axios.delete(`http://localhost:3001/wishlist/${existing.id}`);
        } else {
          await axios.post("http://localhost:3001/wishlist", {
            userId: user.id,
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
          });
        }

        const updated = await axios.get(
          `http://localhost:3001/wishlist?userId=${user.id}`
        );
        setWishlist(updated.data);
      } catch (err) {
        console.error("Wishlist Error:", err);
      }
    },
    [navigate, user]
  );

  const wishlistIds = useMemo(
    () => new Set(wishlist.map((item) => item.productId)),
    [wishlist]
  );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-center text-[#6f4e37] mb-6">
        Our Chocolates
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 w-64"
        />

        <select
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option>All</option>
          <option>Milk Chocolate</option>
          <option>Dark Chocolate</option>
          <option>Wafer</option>
          <option>Premium</option>
          <option>Caramel</option>
          <option>Gift Pack</option>
        </select>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="default">Sort</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col relative"
          >
            <button
              type="button"
              onClick={() => toggleWishlist(p)}
              className="absolute top-2 right-2 text-2xl"
            >
              {wishlistIds.has(p.id) ? (
                <AiFillHeart className="text-red-500 hover:scale-110 transition-transform" />
              ) : (
                <AiOutlineHeart className="text-gray-400 hover:text-red-500 hover:scale-110 transition-transform" />
              )}
            </button>

            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{p.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{p.category}</p>
            <p className="text-gray-600 mb-2">{p.description}</p>
            <p className="text-lg font-bold text-green-600 mb-4">₹{p.price}</p>
            <button
              type="button"
              onClick={() => addToCart(p)}
              className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
