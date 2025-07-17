


  import axios from "axios";
  import { useEffect, useState, useCallback, useMemo } from "react";
  import { useNavigate } from "react-router-dom";
  import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
  import { FiSearch } from "react-icons/fi";
  import { BsFilterRight, BsArrowDownUp } from "react-icons/bs";
  import { LucideList } from "lucide-react";

  function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("default");
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const navigate = useNavigate();
    const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setIsLoading(true);
          const res = await axios.get("http://localhost:3001/products");
          const data = Array.isArray(res.data) ? res.data : res.data.products || [];
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchProducts();
    }, []);

    useEffect(() => {
      if (user) {
        axios.get(`http://localhost:3001/wishlist?userId=${user.id}`)
          .then((res) => setWishlist(res.data))
          .catch(err => console.error("Wishlist error:", err));
      }
    }, [user]);

    const categories = useMemo(() => {
      const allCategories = products.reduce((acc, product) => {
        if (!acc.includes(product.category)) {
          acc.push(product.category);
        }
        return acc;
      }, ["All"]);
      return allCategories;
    }, [products]);

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

    const wishlistIds = new Set(wishlist.map((item) => item.productId));

    const openProductDetails = (product) => {
      setSelectedProduct(product);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    const closeProductDetails = () => {
      setSelectedProduct(null);
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#fef6f3]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-16 w-16 bg-[#6f4e37] rounded-full mb-4"></div>
            <p className="text-xl text-[#6f4e37] font-serif">Loading chocolates...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 max-w-7xl mx-auto bg-[#fef6f3] min-h-screen">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#6f4e37] mb-2 font-serif">
            Our Chocolate Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handcrafted with premium ingredients for the ultimate chocolate experience
          </p>
        </div>

        {/* Enhanced Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search chocolates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] w-full"
            />
          </div>

          <div className="relative">
            <LucideList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] appearance-none bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <BsArrowDownUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] appearance-none bg-white"
            >
              <option value="default">Sort By</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl text-[#6f4e37] mb-2">No chocolates found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                <div className="relative">
                  <div 
                    className="w-full h-60 object-cover cursor-pointer"
                    onClick={() => openProductDetails(p)}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(p);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition"
                    aria-label={wishlistIds.has(p.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {wishlistIds.has(p.id) ? (
                      <AiFillHeart className="text-red-500 text-xl hover:scale-110 transition-transform" />
                    ) : (
                      <AiOutlineHeart className="text-gray-600 text-xl hover:text-red-500 hover:scale-110 transition-transform" />
                    )}
                  </button>
                  {p.isNew && (
                    <span className="absolute top-3 left-3 bg-[#6f4e37] text-white text-xs font-bold px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{p.name}</h3>
                    <span className="bg-[#f3e8e3] text-[#6f4e37] text-xs px-2 py-1 rounded">
                      {p.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{p.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-[#6f4e37]">₹{p.price}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < (p.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}
                      className="w-full bg-[#6f4e37] hover:bg-[#5a3f2d] text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Details Overlay */}
        {selectedProduct && (
          <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div 
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeProductDetails}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg z-10"
                >
                  <AiOutlineClose className="text-gray-700 text-xl" />
                </button>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="md:sticky md:top-0">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-auto max-h-[60vh] object-contain"
                    />
                  </div>
                  
                   <div className="p-6">
                    <h2 className="text-3xl font-bold text-[#6f4e37] mb-2">
                      {selectedProduct.name}
                    </h2>
                    
                    <div className="flex items-center mb-4">
                      <span className="bg-[#f3e8e3] text-[#6f4e37] text-sm px-3 py-1 rounded-full">
                        {selectedProduct.category}
                      </span>
                      <div className="flex ml-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < (selectedProduct.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6">
                      {selectedProduct.description}
                    </p>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-[#6f4e37] mb-2">Details</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Weight: {selectedProduct.weight || '100g'}</li>
                        <li>• Ingredients: {selectedProduct.ingredients || 'Cocoa, Sugar, Milk'}</li>
                        <li>• Allergens: {selectedProduct.allergens || 'Contains milk'}</li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-bold text-[#6f4e37]">
                        ₹{selectedProduct.price}
                      </span>
                      
                      <button
                        onClick={() => {
                          addToCart(selectedProduct);
                          closeProductDetails();
                        }}
                        className="bg-[#6f4e37] hover:bg-[#5a3f2d] text-white py-2 px-6 rounded-full transition-colors duration-300 flex items-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                    
                    <button
                      onClick={() => toggleWishlist(selectedProduct)}
                      className="flex items-center gap-2 text-[#6f4e37] hover:text-[#5a3f2d]"
                    >
                      {wishlistIds.has(selectedProduct.id) ? (
                        <>
                          <AiFillHeart className="text-red-500" />
                          <span>Remove from Wishlist</span>
                        </>
                      ) : (
                        <>
                          <AiOutlineHeart />
                          <span>Add to Wishlist</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default Products;