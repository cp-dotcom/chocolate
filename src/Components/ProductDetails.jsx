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