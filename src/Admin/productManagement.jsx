import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ProductForm from "../Components/Admin/ProductForm";
import ProductDetails from "../Components/ProductDetails";


const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("All");

const fetchProducts = async () => {
  try {
    const res = await axios.get("http://localhost:3001/products");
    console.log("Fetched products:", res.data);  // 👈 Add this
    setProducts(res.data.reverse());
  } catch (err) {
    toast.error("Failed to fetch products");
    console.error("Fetch error:", err);  // 👈 Add this
  }
};


  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddClick = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editProduct) {
        await axios.put(`http://localhost:3001/products/${editProduct.id}`, formData);
        toast.success("Product updated");
      } else {
        await axios.post("http://localhost:3001/products", formData);
        toast.success("Product added");
      }
      setShowForm(false);
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error("Error saving product");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  // Filtered products
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Extract unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div className="min-h-screen  bg-white rounded-2xl p-6 shadow-xl/20 border border-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#5c2c06] tracking-wide ml-70">
            🍫 Product Management
          </h2>
          <button
            onClick={handleAddClick}
            className="bg-[#5c2c06] hover:bg-[#3f1b04] transition px-5 py-2 text-white rounded-full font-semibold shadow-md"
          >
            + Add Product
          </button>
        </div>

        {/* Filter Dropdown */}
        <div className="mb-6">
          <label className="block text-[#5c2c06] font-semibold mb-2 ">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1); // reset to page 1 when filter changes
            }}
            className="px-4 py-2 border border-black rounded-md shadow-sm bg-white text-[#4b2e2e]"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
     <div className="space-y-4 ">
  {currentProducts.map((p) => (
    <div
      key={p.id}
      // className="bg-gradient-to-br from-[#f9f2ee] to-[#ecd6c5] border border-[#c8a07e] rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-4 ">
      className="bg-white border border-[#5c2c06] rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-4 ">
      <div className="flex items-center justify-between h-20">
        {/* Product Info */}
        <div className="flex items-center gap-4">
          <img
            src={`/${p.image}`}
            alt={p.name}
            className="w-25 h-16 object-cover rounded border h-30  "
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/productsimg/default.jpg";
            }}
          />
          <div>
            <h3 className="text-base font-semibold text-gray-800">{p.name}</h3>
            <p className="text-sm text-gray-600">₹{p.price} | {p.category}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleEditClick(p)}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-[#4b2e2e] font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => deleteProduct(p.id)}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>





        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  currentPage === number
                    ? "bg-[#5c2c06] text-white"
                    : "bg-[#e8d0b4] text-[#5c2c06] hover:bg-[#dec1a1]"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <ProductForm
          initialData={editProduct}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductManagement;
