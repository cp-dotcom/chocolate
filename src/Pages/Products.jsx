


  // import axios from "axios";
  // import { useEffect, useState, useCallback, useMemo } from "react";
  // import { useNavigate } from "react-router-dom";
  // import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
  // import { FiSearch } from "react-icons/fi";
  // import { BsFilterRight, BsArrowDownUp } from "react-icons/bs";
  // import { LucideList } from "lucide-react";
  // import ProductCard from "../Components/ProductCard";
  // import ProductDetails from "../Components/ProductDetails";

  // function Products() {
  //   const [products, setProducts] = useState([]);
  //   const [search, setSearch] = useState("");
  //   const [category, setCategory] = useState("All");
  //   const [sortOrder, setSortOrder] = useState("default");
  //   const [wishlist, setWishlist] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [selectedProduct, setSelectedProduct] = useState(null);

  //   const navigate = useNavigate();
  //   const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         setIsLoading(true);
  //         const res = await axios.get("http://localhost:3001/products");
  //         const data = Array.isArray(res.data) ? res.data : res.data.products || [];
  //         setProducts(data);
  //       } catch (error) {
  //         console.error("Error fetching products:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
      
  //     fetchProducts();
  //   }, []);

  //   useEffect(() => {
  //     if (user) {
  //       axios.get(`http://localhost:3001/wishlist?userId=${user.id}`)
  //         .then((res) => setWishlist(res.data))
  //         .catch(err => console.error("Wishlist error:", err));
  //     }
  //   }, [user]);

  //   const categories = useMemo(() => {
  //     const allCategories = products.reduce((acc, product) => {
  //       if (!acc.includes(product.category)) {
  //         acc.push(product.category);
  //       }
  //       return acc;
  //     }, ["All"]);
  //     return allCategories;
  //   }, [products]);

  //   const filteredProducts = useMemo(() => {
  //     let result = [...products];

  //     if (search.trim()) {
  //       result = result.filter((p) =>
  //         p.name.toLowerCase().includes(search.toLowerCase())
  //       );
  //     }

  //     if (category !== "All") {
  //       result = result.filter((p) => p.category === category);
  //     }

  //     if (sortOrder === "asc") {
  //       result.sort((a, b) => a.price - b.price);
  //     } else if (sortOrder === "desc") {
  //       result.sort((a, b) => b.price - a.price);
  //     }

  //     return result;
  //   }, [products, search, category, sortOrder]);

  //   const addToCart = useCallback(
  //     async (product) => {
  //       if (!user) {
  //         alert("Please login first!");
  //         navigate("/login");
  //         return;
  //       }

  //       try {
  //         const exists = await axios.get(
  //           `http://localhost:3001/carts?userId=${user.id}&productId=${product.id}`
  //         );

  //         if (exists.data.length > 0) {
  //           alert("Item already in cart!");
  //           return;
  //         }

  //         await axios.post("http://localhost:3001/carts", {
  //           userId: user.id,
  //           productId: product.id,
  //           name: product.name,
  //           image: product.image,
  //           price: product.price,
  //           qty: 1,
  //         });

  //         alert("Added to cart!");
  //       } catch (err) {
  //         console.error("Cart Error:", err);
  //         alert("Something went wrong while adding to cart.");
  //       }
  //     },
  //     [navigate, user]
  //   );

  //   const toggleWishlist = useCallback(
  //     async (product) => {
  //       if (!user) {
  //         alert("Please login to use wishlist!");
  //         navigate("/login");
  //         return;
  //       }

  //       try {
  //         const res = await axios.get(
  //           `http://localhost:3001/wishlist?userId=${user.id}&productId=${product.id}`
  //         );
  //         const existing = res.data[0];

  //         if (existing) {
  //           await axios.delete(`http://localhost:3001/wishlist/${existing.id}`);
  //         } else {
  //           await axios.post("http://localhost:3001/wishlist", {
  //             userId: user.id,
  //             productId: product.id,
  //             name: product.name,
  //             image: product.image,
  //             price: product.price,
  //           });
  //         }

  //         const updated = await axios.get(
  //           `http://localhost:3001/wishlist?userId=${user.id}`
  //         );
  //         setWishlist(updated.data);
  //       } catch (err) {
  //         console.error("Wishlist Error:", err);
  //       }
  //     },
  //     [navigate, user]
  //   );

  //   const wishlistIds = new Set(wishlist.map((item) => item.productId));

  //   const openProductDetails = (product) => {
  //     setSelectedProduct(product);
  //     document.body.style.overflow = 'hidden'; 
  //   };

  //   const closeProductDetails = () => {
  //     setSelectedProduct(null);
  //     document.body.style.overflow = 'auto';
  //   };

  //   if (isLoading) {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center bg-[#fef6f3]">
  //         <div className="animate-pulse flex flex-col items-center">
  //           <div className="h-16 w-16 bg-[#6f4e37] rounded-full mb-4"></div>
  //           <p className="text-xl text-[#6f4e37] font-serif">Loading chocolates...</p>
  //         </div>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="p-6 max-w-7xl mx-auto bg-[#fef6f3] min-h-screen">
  //       <div className="text-center mb-12">
  //         <h2 className="text-4xl font-bold text-[#6f4e37] mb-2 font-serif">
  //           Our Chocolate Collection
  //         </h2>
  //         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
  //           Handcrafted with premium ingredients for the ultimate chocolate experience
  //         </p>
  //       </div>

       
  //       <div className="flex flex-wrap justify-center gap-4 mb-12 bg-white p-4 rounded-lg shadow-sm">
  //         <div className="relative w-full sm:w-64">
  //           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  //           <input
  //             type="text"
  //             placeholder="Search chocolates..."
  //             value={search}
  //             onChange={(e) => setSearch(e.target.value)}
  //             className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] w-full"
  //           />
  //         </div>

  //         <div className="relative">
  //           <LucideList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  //           <select
  //             onChange={(e) => setCategory(e.target.value)}
  //             className="pl-10 pr-8 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] appearance-none bg-white"
  //           >
  //             {categories.map((cat) => (
  //               <option key={cat} value={cat}>{cat}</option>
  //             ))}
  //           </select>
  //         </div>

  //         <div className="relative">
  //           <BsArrowDownUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  //           <select
  //             onChange={(e) => setSortOrder(e.target.value)}
  //             className="pl-10 pr-8 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] appearance-none bg-white"
  //           >
  //             <option value="default">Sort By</option>
  //             <option value="asc">Price: Low to High</option>
  //             <option value="desc">Price: High to Low</option>
  //           </select>
  //         </div>
  //       </div>

        

  //       {filteredProducts.length === 0 ? (
  //         <div className="text-center py-12">
  //           <h3 className="text-2xl text-[#6f4e37] mb-2">No chocolates found</h3>
  //           <p className="text-gray-600">Try adjusting your search or filters</p>
  //         </div>
  //          ) : (
  //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  //              {filteredProducts.map(product => (
  //                     <ProductCard
  //                       key={product.id}
  //                       product={product}
  //                       openProductDetails={openProductDetails}
  //                       toggleWishlist={toggleWishlist}
  //                       wishlistIds={wishlistIds}
  //                       addToCart={addToCart}
  //                     />
  //                   ))}
  //           </div>
  //               )}  

       

  //       <div>

  //         {selectedProduct && (
  //              <ProductDetails
  //                 product={selectedProduct}
  //                 closeProductDetails={closeProductDetails}
  //                 toggleWishlist={toggleWishlist}
  //                 wishlistIds={wishlistIds}
  //                 addToCart={addToCart}
  //                  />
  //          )}

  //       </div>
  //     </div>
  //   );
  // }

  // export default Products;







  import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsArrowDownUp } from "react-icons/bs";
import { ArrowLeftCircle, ArrowRightCircle, LucideList } from "lucide-react";
import ProductCard from "../Components/ProductCard";
import ProductDetails from "../Components/ProductDetails";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch products once
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

  // Fetch wishlist when user changes or on load
  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/wishlist?userId=${user.id}`)
        .then(res => setWishlist(res.data))
        .catch(err => console.error("Wishlist error:", err));
    }
  }, [user]);

  // Get categories from products dynamically
  const categories = ["All"];
  products.forEach(product => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  // Apply filters, search, sort - no memo
  let filteredProducts = products;

  if (search.trim() !== "") {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category !== "All") {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (sortOrder === "asc") {
    filteredProducts = filteredProducts.slice().sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts = filteredProducts.slice().sort((a, b) => b.price - a.price);
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset page if filters/search/sort changes (optional but better UX)
  // This effect will reset page to 1 anytime these change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, sortOrder]);

  const addToCart = async (product) => {
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
  };

  const toggleWishlist = async (product) => {
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
  };

  const wishlistIds = new Set(wishlist.map(item => item.productId));

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
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
            value={category}
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
            value={sortOrder}
            className="pl-10 pr-8 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#6f4e37] focus:border-[#6f4e37] appearance-none bg-white"
          >
            <option value="default">Sort By</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {paginatedProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-2xl text-[#6f4e37] mb-2">No chocolates found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {paginatedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              openProductDetails={openProductDetails}
              toggleWishlist={toggleWishlist}
              wishlistIds={wishlistIds}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-[#6f4e37] text-white disabled:opacity-50"
          >
            <ArrowLeftCircle/>
          </button>
          <span className="text-[#6f4e37] font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-[#6f4e37] text-white disabled:opacity-50"
          >
            <ArrowRightCircle/>
          </button>
        </div>
      )}

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          closeProductDetails={closeProductDetails}
          toggleWishlist={toggleWishlist}
          wishlistIds={wishlistIds}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}

export default Products;
