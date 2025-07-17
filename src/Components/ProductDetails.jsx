// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const ProductDetailsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3001/products/${id}`);
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (!product) return <div>Product not found</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <button 
//         onClick={() => navigate(-1)} 
//         className="mb-4 p-2 hover:bg-gray-100 rounded-full"
//       >
//         ← Back to Products
//       </button>
      
//       {/* Your product details UI from the image */}
//       <div className="bg-white rounded-xl p-8 shadow-lg">
//         <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//         <div className="flex items-center mb-4">
//           <span className="bg-[#f3e8e3] text-[#6f4e37] text-sm px-3 py-1 rounded-full mr-2">
//             {product.category}
//           </span>
//           <div className="flex text-yellow-400">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} filled={i < (product.rating || 4)} />
//             ))}
//           </div>
//         </div>
        
//         <p className="text-gray-700 mb-6">{product.description}</p>
        
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Details</h2>
//           <ul className="space-y-2">
//             <li>• Weight: {product.weight || '100g'}</li>
//             <li>• Ingredients: {product.ingredients || 'Cocoa, Sugar, Milk'}</li>
//             <li>• Allergens: {product.allergens || 'Contains milk'}</li>
//           </ul>
//         </div>
        
//         <div className="flex justify-between items-center">
//           <span className="text-2xl font-bold">₹{product.price}</span>
//           <button className="bg-[#6f4e37] text-white px-6 py-2 rounded hover:bg-[#5a3f2d]">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Star = ({ filled }) => (
//   <svg
//     className="w-5 h-5"
//     fill={filled ? "currentColor" : "none"}
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//   </svg>
// );

// export default ProductDetailsPage;



import React from "react";
import { AiOutlineClose, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function ProductDetails({ product, closeProductDetails, toggleWishlist, wishlistIds, addToCart }) {
  if (!product) return null;

  return (
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
                src={product.image}
                alt={product.name}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </div>

            <div className="p-6">
              <h2 className="text-3xl font-bold text-[#6f4e37] mb-2">
                {product.name}
              </h2>

              <div className="flex items-center mb-4">
                <span className="bg-[#f3e8e3] text-[#6f4e37] text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex ml-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < (product.rating || 4) ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#6f4e37] mb-2">Details</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Weight: {product.weight || "100g"}</li>
                  <li>• Ingredients: {product.ingredients || "Cocoa, Sugar, Milk"}</li>
                  <li>• Allergens: {product.allergens || "Contains milk"}</li>
                </ul>
              </div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold text-[#6f4e37]">₹{product.price}</span>
                <button
                  onClick={() => {
                    addToCart(product);
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
                onClick={() => toggleWishlist(product)}
                className="flex items-center gap-2 text-[#6f4e37] hover:text-[#5a3f2d]"
              >
                {wishlistIds.has(product.id) ? (
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
  );
}

export default ProductDetails;
